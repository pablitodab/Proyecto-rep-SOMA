import { Router } from "express";
import { crearEntrada, obtenerEntradas } from "../controllers/diario";
import validateToken from "./validateToken";

const router = Router();

router.post('/', validateToken, crearEntrada);
router.get('/', validateToken, obtenerEntradas);

export default router;
