import { Router } from "express";
import { crearRutina, obtenerRutinas } from "../controllers/rutina";
import validateToken from "./validateToken";

const router = Router();

router.post('/', validateToken, crearRutina);
router.get('/', validateToken, obtenerRutinas);

export default router;
