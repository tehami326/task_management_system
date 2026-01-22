import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

interface AuthRequest extends Request {
    user?: {
        userId: string;
    };
}

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const token = authHeader.split(" ")[1];

        const payload = verifyAccessToken(token) as any;

        req.user = {
            userId: payload.userId,
        };

        next();
    } catch {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};
