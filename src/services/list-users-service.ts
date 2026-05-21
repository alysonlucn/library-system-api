import { UserRepository } from '../repositories/user-repository';



export class ListUsersService {
  async execute() {
    const users = await UserRepository.find();
    return users;
  }
}