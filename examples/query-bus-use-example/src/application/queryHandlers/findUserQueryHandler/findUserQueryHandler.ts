import { IQuery, IQueryHandler } from '@ddd-master/query-bus';

import { IFindUserQuery } from './findUserQuery';
import { User } from '../../../domain/user';
import { UserRepository } from '../../repositories/userRepository/userRepository';

export type FindUserQueryHandlerResult = { user: User };

type Dependencies = {
  userRepository: UserRepository;
};

export class FindUserQueryHandler implements IQueryHandler<IFindUserQuery, FindUserQueryHandlerResult> {
  private readonly userRepository: UserRepository;
  public constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  public handle(query: IQuery): FindUserQueryHandlerResult {
    const { email } = query as IFindUserQuery;

    const user = this.userRepository.getByEmail({ email });

    if (!user) {
      throw new Error('User not found');
    }

    return { user };
  }
}
