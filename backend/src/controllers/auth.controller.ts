import { Request, Response } from "express";
import {
    registerUser,
    loginUser,
} from "../services/auth.service";
import {
    verifyRefreshToken,
    signAccessToken,
} from "../utils/jwt";

/**
 * REGISTER
 * POST /auth/register
 */
export const register = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await registerUser(email, password);

        return res.status(201).json({
            message: "User registered successfully",
            user,
        });
    } catch (error: any) {
        if (error.message === "USER_ALREADY_EXISTS") {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

/**
 * LOGIN
 * POST /auth/login
 */
export const login = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const tokens = await loginUser(email, password);

        return res.status(200).json({
            message: "Login successful",
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    } catch (error: any) {
        if (error.message === "INVALID_CREDENTIALS") {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

/**
 * REFRESH ACCESS TOKEN
 * POST /auth/refresh
 */
export const refresh = async (
    req: Request,
    res: Response
) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token required",
            });
        }

        const payload = verifyRefreshToken(refreshToken) as any;

        const newAccessToken = signAccessToken({
            userId: payload.userId,
        });

        return res.status(200).json({
            accessToken: newAccessToken,
        });
    } catch {
        return res.status(401).json({
            message: "Invalid refresh token",
        });
    }
};

/**
 * LOGOUT
 * POST /auth/logout
 * (Stateless JWT – frontend deletes tokens)
 */
export const logout = async (
    _req: Request,
    res: Response
) => {
    return res.status(200).json({
        message: "Logged out successfully",
    });
};
