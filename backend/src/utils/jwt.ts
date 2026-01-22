import jwt, { Secret, SignOptions } from "jsonwebtoken";

const accessSecret: Secret = process.env.JWT_ACCESS_SECRET as Secret;
const refreshSecret: Secret = process.env.JWT_REFRESH_SECRET as Secret;

const accessTokenOptions: SignOptions = {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
};

const refreshTokenOptions: SignOptions = {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
};

export const signAccessToken = (payload: object): string => {
    return jwt.sign(payload, accessSecret, accessTokenOptions);
};

export const signRefreshToken = (payload: object): string => {
    return jwt.sign(payload, refreshSecret, refreshTokenOptions);
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, accessSecret);
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, refreshSecret);
};
