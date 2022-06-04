import { Router } from 'express';
import controller from './controller.js';
import pwdValidator from './solutions/problem3.js';

const router = new Router();

router.get('/', controller.index);
router.get('/1', controller.problem1);
router.get('/2', controller.problem2);
router.post('/3', pwdValidator, controller.problem3);
router.get('/4', controller.problem4);
router.get('/5', controller.problem5);


export default router;
