import routerx from 'express-promise-router';
import categoriaController from '../controllers/categoriaController';
import auth from '../middleware/auth';

const router = routerx();

router.post('/add', auth.verificarAlmacenero, categoriaController.add);
router.get('/query', auth.verificarAlmacenero, categoriaController.query);
router.get('/list', auth.verificarAlmacenero, categoriaController.list);
router.put('/update', auth.verificarAlmacenero, categoriaController.update);
router.delete('/remove', auth.verificarAlmacenero, categoriaController.remove);
router.put('/activate', auth.verificarAlmacenero, categoriaController.activate);
router.put('/deactivate', auth.verificarAlmacenero, categoriaController.deactivate);

export default router;