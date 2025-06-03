import { Router } from "express";
import { 
  crearEntrada,
  obtenerEntradasUsuario,
  actualizarEntrada,
  eliminarEntrada
} from "../controllers/diario";
import validateToken from "./validateToken";

const router = Router();

router.use(validateToken);

router.get('/user/:userId', obtenerEntradasUsuario);
router.post('/', crearEntrada);
router.patch('/:id', actualizarEntrada);
router.delete('/:id', eliminarEntrada);

export default router;
