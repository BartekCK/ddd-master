import { User } from '../../../domain/user';

export interface UserRepository {
  getByEmail: (dto: { email: string }) => User | null;
}
