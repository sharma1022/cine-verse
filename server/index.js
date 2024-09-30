import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

const app = express();

// Middleware Setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API Routes
app.use("/api/v1", routes);
app.get("/",(req,res)=> {
    res.send("Welcome to API");
})
// Set the port
const port = process.env.PORT || 5000;

// MongoDB Connection Function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Database connection failed"); // Propagate error
    }
};

// Start the server and connect to MongoDB
const startServer = async () => {
    try {
        await connectDB(); // Ensure the database is connected before starting the server
        const server = http.createServer(app);
        server.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1); // Exit the process on failure
    }
};

// Start the application
startServer();