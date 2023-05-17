import { User } from '../../../domain/user';

export interface UserRepository {
  save: (dto: { user: User }) => void;
}
