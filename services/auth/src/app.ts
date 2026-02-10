import express from "express";
import authRoutes from "./routes/auth.js";
import { connectKafka } from "./producer.js";
import cors from "cors";

const app = express();
app.use(cors({
    origin: function (origin, callback) {
        return callback(null, true);
    },
    credentials: true
}));
app.use(express.json());

connectKafka();

app.use("/api/auth", authRoutes);

export default app;
