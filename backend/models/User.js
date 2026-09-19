import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
	movieId: { type: Number, required: true },
	title: String,
	poster: String,
	releaseDate: String,
	type: String,
	status: String,
	priority: String,
	addedAt: Date,
}, { _id: false });

const ratingSchema = new mongoose.Schema({
	movieId: { type: Number, required: true },
	title: String,
	poster: String,
	rating: { type: Number, min: 0, max: 10 },
	createdAt: { type: Date, default: Date.now },
}, { _id: false });

const reviewSchema = new mongoose.Schema({
	movieId: { type: Number, required: true },
	title: String,
	poster: String,
	rating: { type: Number, min: 0, max: 10 },
	review: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
}, { _id: true });

const historySchema = new mongoose.Schema({
	movieId: { type: Number, required: true },
	title: String,
	poster: String,
	watchedAt: { type: Date, default: Date.now },
}, { _id: false });

const userSchema = new mongoose.Schema({
	name: { type: String, trim: true },
	username: { type: String, trim: true },
	collegeName: { type: String, trim: true, default: "" },
	email: { type: String, required: true, unique: true, lowercase: true, trim: true },
	password: { type: String, required: true },
	bio: { type: String, default: "" },
	avatar: { type: String, default: "" },
	preferences: {
		type: Object,
		default: {
			language: "English",
			notifications: true,
			autoplay: true,
			adultContent: false,
			homePage: "Home",
			themeStyle: "Dark",
		},
	},
	favorites: { type: [movieSchema], default: [] },
	watchlist: { type: [movieSchema], default: [] },
	ratings: { type: [ratingSchema], default: [] },
	reviews: { type: [reviewSchema], default: [] },
	history: { type: [historySchema], default: [] },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
