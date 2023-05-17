import { UserRepository } from '../../application/repositories/userRepository/userRepository';
import { User } from '../../domain/user';

export class UserRepositoryImpl implements UserRepository {
  private readonly users: User[] = [];
  public save({ user }: { user: User }): void {
    this.users.push(user);
  }
}
