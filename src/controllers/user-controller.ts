import { User } from '../entities/User';
import { CreateUserService } from '../services/create-user-service';

export class UserController {
  async create(req: any, res: any) {
    try {
      const { username, email, password } = req.body;

      const createUserService = new CreateUserService();
      const user: User = await createUserService.execute({
        username,
        email,
        password,
      });

      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}