import multer from "multer";

export default function errorMiddleware(error, req, res, next) {
	console.error("CRISTAL API error:", error);

	if (error instanceof multer.MulterError) {
		const message = error.code === "LIMIT_FILE_SIZE"
			? "Image must be 5MB or smaller"
			: "Avatar upload failed";
		return res.status(400).json({ message });
	}

	if (error.message === "Only image files are allowed") {
		return res.status(400).json({ message: error.message });
	}

	res.status(error.status || 500).json({ message: error.message || "Internal server error" });
}
