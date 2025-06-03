import { Router } from "express";
import { crearRegistro, obtenerRegistros } from "../controllers/nutricion";
import validateToken from "./validateToken";

const router = Router();
router.use(validateToken);

router.post('/', crearRegistro);
router.get('/', obtenerRegistros);

export default router;

