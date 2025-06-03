import { Router } from "express";
import { crearObjetivo, obtenerObjetivos } from "../controllers/objetivo";
import validateToken from "./validateToken";

const router = Router();
router.use(validateToken);

router.post('/', crearObjetivo);
router.get('/', obtenerObjetivos);

export default router;
