import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/protected", authenticate, (req, res) => {
    res.json({
        message: "You have access to protected data",
    });
});

export default router;
