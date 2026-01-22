import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import testRoutes from "./routes/test.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:3000",
        ],
        credentials: true,
    })
);

app.use(express.json());

app.use("/test", testRoutes);
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("Task Management API is running");
});

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});


export default app;
