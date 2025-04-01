import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controller/socketManager.js";
import userRoutes from "./routes/user.routes.js"


const app = express();
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);


app.use("/api/v1/users" , userRoutes);

app.get("/", (req, res) => {
  res.send("hellow world");
});
const start = async () => {
  app.set("mongo_user");
  const connectionInstance = await mongoose
    .connect(process.env.MONGO_URI)
    .then((connection) =>
      console.log(connection.connection.host, "Database connection successfull")
    )
    .catch((error) => console.log(error, "DATABASE CONNECTION SUCCESSFULL"));
  server.listen(app.get("port"), () => {
    console.log(`App is listening on port 8000`);
  });
};

start();
