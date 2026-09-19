import bcrypt from "bcryptjs";
import { unlink } from "node:fs/promises";
import path from "node:path";

function publicUser(user) {
	const data = user.toObject();
	delete data.password;
	return data;
}

function cleanMovie(data) {
	return {
		movieId: Number(data.movieId), title: data.title || "Untitled", poster: data.poster || "",
		releaseDate: data.releaseDate || "", type: data.type || "movie", status: data.status,
		priority: data.priority, addedAt: data.addedAt || new Date(),
	};
}

export function profile(req, res) { res.json(publicUser(req.user)); }

export async function updateProfile(req, res) {
	const { name, email, bio, username, collegeName } = req.body;
	if (email && email.toLowerCase() !== req.user.email) {
		const exists = await req.user.constructor.findOne({ email: email.toLowerCase(), _id: { $ne: req.user._id } });
		if (exists) return res.status(409).json({ message: "That email is already in use" });
	}
	req.user.name = name ?? req.user.name;
	req.user.username = username ?? req.user.username;
	req.user.collegeName = collegeName ?? req.user.collegeName;
	req.user.email = email?.toLowerCase() ?? req.user.email;
	req.user.bio = bio ?? req.user.bio;
	await req.user.save();
	res.json(publicUser(req.user));
}

export async function uploadAvatar(req, res) {
	if (!req.file) return res.status(400).json({ message: "An image file is required" });

	const previousAvatar = req.user.avatar;
	req.user.avatar = `/uploads/${req.file.filename}`;
	await req.user.save();

	if (previousAvatar?.startsWith("/uploads/")) {
		await unlink(path.resolve(previousAvatar.slice(1))).catch(() => {});
	}

	res.json({ avatar: req.user.avatar, user: publicUser(req.user) });
}

export async function changePassword(req, res) {
	const { currentPassword, newPassword } = req.body;
	if (!currentPassword || !newPassword) {
		return res.status(400).json({ message: "Current and new passwords are required" });
	}
	if (newPassword.length < 8) {
		return res.status(400).json({ message: "New password must be at least 8 characters" });
	}
	if (!(await bcrypt.compare(currentPassword, req.user.password))) {
		return res.status(401).json({ message: "Current password is incorrect" });
	}

	req.user.password = await bcrypt.hash(newPassword, 12);
	await req.user.save();
	res.json({ success: true, message: "Password changed successfully" });
}

export async function deleteAccount(req, res) {
	await req.user.deleteOne();
	res.json({ success: true, message: "Account deleted successfully" });
}

export async function updatePreferences(req, res) {
	const incoming = req.body || {};
	const next = {
		...(req.user.preferences || {}),
		...incoming,
	};
	req.user.preferences = next;
	await req.user.save();
	res.json({ preferences: req.user.preferences });
}

export async function userStats(req, res) {
	const stats = {
		favorites: req.user.favorites?.length ?? 0,
		watchlist: req.user.watchlist?.length ?? 0,
		ratings: req.user.ratings?.length ?? 0,
		reviews: req.user.reviews?.length ?? 0,
		history: req.user.history?.length ?? 0,
	};
	res.json(stats);
}

export function list(field) { return (req, res) => res.json(req.user[field]); }

export async function addMovie(field, req, res) {
	const movie = cleanMovie(req.body);
	if (!movie.movieId || req.user[field].some(item => item.movieId === movie.movieId)) return res.status(400).json({ message: "A valid, unique movie is required" });
	req.user[field].push(movie);
	await req.user.save();
	res.status(201).json(movie);
}

export async function removeMovie(field, req, res) {
	const before = req.user[field].length;
	req.user[field] = req.user[field].filter(item => item.movieId !== Number(req.params.movieId));
	if (req.user[field].length === before) return res.status(404).json({ message: "Movie was not found" });
	await req.user.save();
	res.json({ success: true });
}

export async function rate(req, res) {
	const movieId = Number(req.body.movieId); const rating = Number(req.body.rating);
	if (!movieId || rating < 0 || rating > 10) return res.status(400).json({ message: "Movie ID and rating from 0 to 10 are required" });
	req.user.ratings = req.user.ratings.filter(item => item.movieId !== movieId);
	if (rating > 0) req.user.ratings.push({ movieId, rating, title: req.body.title, poster: req.body.poster });
	await req.user.save(); res.json(req.user.ratings);
}

export async function addReview(req, res) { req.user.reviews.push({ ...req.body, movieId: Number(req.body.movieId) }); await req.user.save(); res.status(201).json(req.user.reviews.at(-1)); }
export async function updateReview(req, res) { const review = req.user.reviews.id(req.params.reviewId); if (!review) return res.status(404).json({ message: "Review was not found" }); Object.assign(review, req.body); await req.user.save(); res.json(review); }
export async function deleteReview(req, res) { const review = req.user.reviews.id(req.params.reviewId); if (!review) return res.status(404).json({ message: "Review was not found" }); review.deleteOne(); await req.user.save(); res.json({ success: true }); }
export function movieReviews(req, res) { res.json(req.user.reviews.filter(item => item.movieId === Number(req.params.movieId))); }
export async function addHistory(req, res) { req.user.history = req.user.history.filter(item => item.movieId !== Number(req.body.movieId)); req.user.history.unshift({ ...req.body, movieId: Number(req.body.movieId), watchedAt: new Date() }); await req.user.save(); res.status(201).json(req.user.history[0]); }
export function history(req, res) { res.json(req.user.history); }
export async function clearHistory(req, res) { req.user.history = []; await req.user.save(); res.json({ success: true }); }
