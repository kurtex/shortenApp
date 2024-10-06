import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
	originalUrl: {
		type: String,
		required: true,
	},
	shortUrl: {
		type: String,
		required: true,
	},
	urlCode: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		required: true,
	},
	isAuthenticated: {
		type: Boolean,
		required: true,
		default: false,
	},
});

export const Url = mongoose.models.Url || mongoose.model("Url", UrlSchema);
