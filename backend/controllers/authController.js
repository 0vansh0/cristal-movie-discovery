import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

function tokenFor(user) {
	return generateToken(user._id);
}

function publicUser(user) {
	const data = user.toObject();
	delete data.password;
	return data;
}

export async function register(req, res) {
	const { name, username, email, password, collegeName } = req.body;
	if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
	if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });

	const normalizedEmail = email.toLowerCase().trim();
	if (await User.findOne({ email: normalizedEmail })) return res.status(409).json({ message: "An account with this email already exists" });

	const user = await User.create({
		name,
		username,
		collegeName,
		email: normalizedEmail,
		password: await bcrypt.hash(password, 12),
		avatar: req.file ? `/uploads/${req.file.filename}` : "",
	});
	res.status(201).json({ token: tokenFor(user), user: publicUser(user) });
}

export async function login(req, res) {
	const { email, password } = req.body;
	const user = await User.findOne({ email: email?.toLowerCase().trim() });
	if (!user || !(await bcrypt.compare(password || "", user.password))) return res.status(401).json({ message: "Invalid email or password" });
	res.json({ token: tokenFor(user), user: publicUser(user) });
}

export function logout(req, res) {
	res.json({ success: true, message: "Logged out successfully" });
}

export async function forgotPassword(req, res) {
	const { email } = req.body;
	if (!email) return res.status(400).json({ message: "Email is required" });

	const user = await User.findOne({ email: email.toLowerCase().trim() });
	if (!user) {
		return res.json({ success: true, message: "If an account exists for that email, a reset link has been sent." });
	}

	const resetToken = jwt.sign({ userId: user._id.toString(), purpose: "password-reset" }, process.env.JWT_SECRET, { expiresIn: "1h" });
	return res.json({ success: true, message: "If an account exists for that email, a reset link has been sent.", resetToken });
}

export async function resetPassword(req, res) {
	const { token } = req.params;
	const { password } = req.body;

	if (!password || password.length < 8) {
		return res.status(400).json({ message: "Password must be at least 8 characters long" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (decoded?.purpose !== "password-reset") {
			return res.status(401).json({ message: "Invalid reset token" });
		}

		const user = await User.findById(decoded.userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		user.password = await bcrypt.hash(password, 12);
		await user.save();
		return res.json({ success: true, message: "Password reset successfully" });
	} catch {
		return res.status(401).json({ message: "Invalid or expired reset token" });
	}
}

