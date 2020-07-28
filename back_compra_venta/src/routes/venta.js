import routerx from 'express-promise-router';
import ventaController from '../controllers/ventaController';
import auth from '../middleware/auth';

const router = routerx();

router.post('/add', auth.verificarVendedor, ventaController.add);
router.get('/query', auth.verificarVendedor, ventaController.query);
router.get('/list', auth.verificarVendedor, ventaController.list);
router.put('/activate', auth.verificarVendedor, ventaController.activate);
router.put('/deactivate', auth.verificarVendedor, ventaController.deactivate);
router.get('/graficoEstadisticas', auth.verificarUsuario, ventaController.graficoEstadisticas);

export default router;