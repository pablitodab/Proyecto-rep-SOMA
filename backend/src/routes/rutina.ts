import { Router } from "express";
import { crearRutina, obtenerRutinas, obtenerRutinasUsuario } from "../controllers/rutina";
import validateToken from "./validateToken";

const router = Router();

router.use(validateToken);

router.get('/user/:userId', obtenerRutinasUsuario);
router.get('/', obtenerRutinas);
router.post('/', crearRutina);

export default router;
