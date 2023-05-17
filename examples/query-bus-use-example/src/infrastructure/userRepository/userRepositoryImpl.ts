import { UserRepository } from '../../application/repositories/userRepository/userRepository';
import { User } from '../../domain/user';

export class UserRepositoryImpl implements UserRepository {
  public constructor(private readonly users: User[] = []) {}

  public getByEmail({ email }: { email: string }): User | null {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
