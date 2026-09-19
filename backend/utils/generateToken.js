import jwt from "jsonwebtoken";

export default function generateToken(userId) {
	return jwt.sign(
		{ userId: userId.toString() },
		process.env.JWT_SECRET,
		{ expiresIn: "7d" }
	);
}
