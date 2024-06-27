import express from "express";
import dotenv from "dotenv";
import authRoutes from "../backend/routes/auth.routes.js";
import messageRoutes from "../backend/routes/message.routes.js";
import userRoutes from "../backend/routes/user.routes.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
import path from "path";
const connectToMongoDb = require("./db/connectToMongoDb.js");

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// app.get("/", (req, res) => {
//   res.send("Hello checking");
//   // res.status(200).json({ message: "working" });
// });

server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server is running on Port ${PORT}`);
});
