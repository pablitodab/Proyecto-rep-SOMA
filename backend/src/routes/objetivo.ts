import { Router } from "express";
import { 
    crearObjetivo, 
    obtenerObjetivos,
    obtenerObjetivosUsuario,
    actualizarObjetivo,
    eliminarObjetivo,
    toggleCumplido
} from "../controllers/objetivo";
import validateToken from "./validateToken";

const router = Router();

router.use(validateToken);

router.get('/user/:userId', obtenerObjetivosUsuario);
router.get('/', obtenerObjetivos);
router.post('/', crearObjetivo);
router.patch('/:id', actualizarObjetivo);
router.patch('/:id/toggle', toggleCumplido);
router.delete('/:id', eliminarObjetivo);

export default router;
