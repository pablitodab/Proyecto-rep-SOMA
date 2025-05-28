import { Router } from "express";
import { crearObjetivo, obtenerObjetivos, actualizarObjetivo, eliminarObjetivo } from "../controllers/objetivo";
import validateToken from "./validateToken";

const router = Router();

router.post('/', validateToken, crearObjetivo);
router.get('/', validateToken, obtenerObjetivos);
router.put('/:id', validateToken, actualizarObjetivo);
router.delete('/:id', validateToken, eliminarObjetivo);

export default router;
