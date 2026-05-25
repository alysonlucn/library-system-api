import { CreateSessionService } from '../services/create-session-service';

export class SessionController {
  async create(req: any, res: any, next: any) {
    try {
      const { email, password } = req.body;

      const createSessionService = new CreateSessionService();
      const token = await createSessionService.execute({ email, password });

      res.status(200).json({ token });
    } catch (error: any) {
      next(error);
    }
  }
}
