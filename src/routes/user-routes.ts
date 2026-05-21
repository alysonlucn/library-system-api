import express from 'express';
import { UserController } from '../controllers/user-controller';

const router = express.Router();
const userController = new UserController();

router.post('/register', async (req, res) => userController.create(req, res));

export default router;