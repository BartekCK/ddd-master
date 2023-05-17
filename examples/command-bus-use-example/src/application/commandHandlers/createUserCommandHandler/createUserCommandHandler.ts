import { ICommand, ICommandHandler } from '@ddd-master/command-bus';

import { ICreateUserCommand } from './createUserCommand';
import { User } from '../../../domain/user';
import { UserRepository } from '../../repositories/userRepository/userRepository';

export type CreateUserCommandHandlerResult = { email: string; password: string };

type Dependencies = {
  userRepository: UserRepository;
};

export class CreateUserCommandHandler implements ICommandHandler<ICreateUserCommand, CreateUserCommandHandlerResult> {
  private readonly userRepository: UserRepository;
  public constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  public handle(command: ICommand): CreateUserCommandHandlerResult {
    const { email, password } = command as ICreateUserCommand;

    const createdUser: User = { email, password };

    this.userRepository.save({ user: createdUser });

    return { email, password };
  }
}
