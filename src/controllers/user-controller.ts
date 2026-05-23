import { User } from '../entities/User';
import { CreateUserService } from '../services/create-user-service';
import { ListUsersService } from '../services/list-users-service';

export class UserController {
  async create(req: any, res: any, next: any) {
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
      next(error);
    }
  }

  async list(req: any, res: any, next: any) {
    try {
      const listUsersService = new ListUsersService();
      const users = await listUsersService.execute();

      res.status(200).json(users);
    } catch (error: any) {
      next(error);
    }
  }
}