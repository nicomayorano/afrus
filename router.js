import { Router } from 'express';
import controller from './controller.js';
const router = new Router();

router.get('/', controller.index);
router.get('/1', controller.problem1);
router.get('/2', controller.problem2);
router.get('/3', controller.problem3);
router.get('/4', controller.problem4);

export default router;
