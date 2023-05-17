import { CommandBus } from '@ddd-master/command-bus';

import {
  CreateUserCommand,
  ICreateUserCommand,
} from './application/commandHandlers/createUserCommandHandler/createUserCommand';
import {
  CreateUserCommandHandler,
  CreateUserCommandHandlerResult,
} from './application/commandHandlers/createUserCommandHandler/createUserCommandHandler';
import { UserRepository } from './application/repositories/userRepository/userRepository';
import { UserRepositoryImpl } from './infrastructure/userRepository/userRepositoryImpl';

class App {
  public static main(): void {
    /**
     * Build dependencies
     */
    const commandBus = new CommandBus();
    const userRepository: UserRepository = new UserRepositoryImpl();

    /**
     * Register command handlers
     */
    const createUserCommandHandler = new CreateUserCommandHandler({ userRepository });
    commandBus.register(CreateUserCommand, createUserCommandHandler);

    /**
     * Execute command
     */
    const result = commandBus.execute<ICreateUserCommand, CreateUserCommandHandlerResult>(
      new CreateUserCommand({ email: 'test@gmail.com', password: '123456' }),
    );

    /**
     * Check result
     */
    const { email, password } = result;
    console.log(email, password);
  }
}

App.main();
