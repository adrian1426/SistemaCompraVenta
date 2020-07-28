import routerx from 'express-promise-router';
import ingresoController from '../controllers/ingresoController';
import auth from '../middleware/auth';

const router = routerx();

router.post('/add', auth.verificarAlmacenero, ingresoController.add);
router.get('/query', auth.verificarAlmacenero, ingresoController.query);
router.get('/list', auth.verificarAlmacenero, ingresoController.list);
router.put('/activate', auth.verificarAlmacenero, ingresoController.activate);
router.put('/deactivate', auth.verificarAlmacenero, ingresoController.deactivate);

export default router;