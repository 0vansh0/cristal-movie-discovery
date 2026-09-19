import crypto from "node:crypto";
import path from "node:path";
import multer from "multer";

const storage = multer.diskStorage({

	destination: "uploads/",

	filename: (req, file, callback) => {
		const extension = path.extname(file.originalname).toLowerCase();
		callback(null, `${crypto.randomUUID()}${extension}`);
	},
});

const imageOnly = (req, file, callback) => {
	if (!file.mimetype.startsWith("image/")) {
		return callback(new Error("Only image files are allowed"));
	}

	callback(null, true);
};

export const uploadAvatar = multer({
	storage,
	fileFilter: imageOnly,
	limits: { fileSize: 5 * 1024 * 1024 },
});
