import { Router } from "express";
import { crearRegistro, obtenerRegistros, actualizarRegistro, eliminarRegistro } from "../controllers/nutricion";
import validateToken from "./validateToken";

const router = Router();

router.post('/', validateToken, crearRegistro);
router.get('/', validateToken, obtenerRegistros);
router.put('/:id', validateToken, actualizarRegistro);
router.delete('/:id', validateToken, eliminarRegistro);

export default router;
