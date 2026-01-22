import prisma from "../utils/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import {
    signAccessToken,
    signRefreshToken,
} from "../utils/jwt";

/**
 * REGISTER USER
 */
export const registerUser = async (
    email: string,
    password: string
) => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error("USER_ALREADY_EXISTS");
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    return {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
    };
};

/**
 * LOGIN USER
 */
export const loginUser = async (
    email: string,
    password: string
) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const isPasswordValid = await comparePassword(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const payload = {
        userId: user.id,
    };

    return {
        accessToken: signAccessToken(payload),
        refreshToken: signRefreshToken(payload),
    };
};
