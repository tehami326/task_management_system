import { Router } from "express";
import {
    create,
    getAll,
    getOne,
    update,
    remove,
    toggle,
} from "../controllers/task.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate, create);
router.get("/", authenticate, getAll);
router.get("/:id", authenticate, getOne);
router.patch("/:id", authenticate, update);
router.delete("/:id", authenticate, remove);
router.patch("/:id/toggle", authenticate, toggle);

export default router;
