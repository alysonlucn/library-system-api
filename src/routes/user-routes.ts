import express from 'express';
import { UserController } from '../controllers/user-controller';
import { SessionController } from '../controllers/session-controller';

const router = express.Router();
const userController = new UserController();
const sessionController = new SessionController();

router.post('/register', (req, res, next) => userController.create(req, res, next));
router.post('/sessions', (req, res, next) => sessionController.create(req, res, next));
router.get('/', (req, res, next) => userController.list(req, res, next));

export default router;