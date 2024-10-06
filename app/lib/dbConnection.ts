import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI environment variable");
}

// Conexión a MongoDB
export const connectDB = async () => {
	if (mongoose.connection.readyState) {
		return;
	}

	try {
		await mongoose.connect(MONGODB_URI);
		console.log("Conectado a MongoDB");
	} catch (error) {
		console.error("Error conectando a MongoDB:", error);
		throw error; // Re-launching the error to handle it properly
	}
};
