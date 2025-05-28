import { Router } from "express";
import { getUserRoutines, createRoutine, updateRoutine, deleteRoutine } from "../controllers/routine";
import validateToken from "./validateToken";

const router = Router();

// Rutas protegidas con token
router.get("/api/routines/:userId", validateToken, getUserRoutines);
router.post("/api/routines", validateToken, createRoutine);
router.put("/api/routines/:id", validateToken, updateRoutine);
router.delete("/api/routines/:id", validateToken, deleteRoutine);

export default router;
