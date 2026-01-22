import { Request, Response } from "express";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    toggleTaskStatus,
} from "../services/task.service";

/**
 * Extend Request to include authenticated user
 */
interface AuthRequest extends Request {
    user?: {
        userId: string;
    };
}

/**
 * CREATE TASK
 * POST /tasks
 */
export const create = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { title, description } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const task = await createTask(userId, title, description);

        return res.status(201).json({
            message: "Task created successfully",
            task,
        });
    } catch (error: any) {
        if (error.message === "TITLE_REQUIRED") {
            return res.status(400).json({ message: "Title is required" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * GET TASKS (List + Pagination + Filter + Search)
 * GET /tasks
 */
export const getAll = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const status = req.query.status as string | undefined;
        const search = req.query.search as string | undefined;

        const result = await getTasks(
            userId,
            page,
            limit,
            status,
            search
        );

        return res.status(200).json(result);
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * GET TASK BY ID
 * GET /tasks/:id
 */
export const getOne = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user?.userId;
        const taskId = String(req.params.id);

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const task = await getTaskById(userId, taskId);

        return res.status(200).json(task);
    } catch (error: any) {
        if (error.message === "TASK_NOT_FOUND") {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * UPDATE TASK
 * PATCH /tasks/:id
 */
export const update = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user?.userId;
        const taskId = String(req.params.id);
        const { title, description } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const task = await updateTask(
            userId,
            taskId,
            title,
            description
        );

        return res.status(200).json({
            message: "Task updated successfully",
            task,
        });
    } catch (error: any) {
        if (error.message === "TASK_NOT_FOUND") {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * DELETE TASK
 * DELETE /tasks/:id
 */
export const remove = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user?.userId;
        const taskId = String(req.params.id);

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await deleteTask(userId, taskId);

        return res.status(200).json({
            message: "Task deleted successfully",
        });
    } catch (error: any) {
        if (error.message === "TASK_NOT_FOUND") {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * TOGGLE TASK STATUS
 * PATCH /tasks/:id/toggle
 */
export const toggle = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user?.userId;
        const taskId = String(req.params.id);

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const task = await toggleTaskStatus(userId, taskId);

        return res.status(200).json({
            message: "Task status toggled",
            task,
        });
    } catch (error: any) {
        if (error.message === "TASK_NOT_FOUND") {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};
