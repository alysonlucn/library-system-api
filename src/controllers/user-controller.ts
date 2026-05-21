import { User } from '../entities/User';
import { CreateUserService } from '../services/create-user-service';
import { ListUsersService } from '../services/list-users-service';

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

  async list(req: any, res: any) {
    try {
      const listUsersService = new ListUsersService();
      const users = await listUsersService.execute();

      res.status(200).json(users);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}