import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function authMiddleware(req, res, next) {
	try {
		const header = req.headers.authorization || "";
		const token = header.startsWith("Bearer ") ? header.slice(7) : null;

		if (!token) return res.status(401).json({ message: "Authentication required" });

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.userId);

		if (!user) return res.status(401).json({ message: "User session is no longer valid" });

		req.user = user;
		next();
	} catch {
		res.status(401).json({ message: "Invalid or expired authentication token" });
	}
}
