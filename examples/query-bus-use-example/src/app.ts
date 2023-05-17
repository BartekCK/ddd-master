import { QueryBus } from '@ddd-master/query-bus';

import { FindUserQuery, IFindUserQuery } from './application/queryHandlers/findUserQueryHandler/findUserQuery';
import {
  FindUserQueryHandler,
  FindUserQueryHandlerResult,
} from './application/queryHandlers/findUserQueryHandler/findUserQueryHandler';
import { UserRepository } from './application/repositories/userRepository/userRepository';
import { UserRepositoryImpl } from './infrastructure/userRepository/userRepositoryImpl';

class App {
  public static main(): void {
    /**
     * Build dependencies
     */
    const queryBus = new QueryBus();
    const userRepository: UserRepository = new UserRepositoryImpl([{ email: 'test@gmail.com', password: '123456' }]);

    /**
     * Register query handlers
     */
    const createUserQueryHandler = new FindUserQueryHandler({ userRepository });
    queryBus.register(FindUserQuery, createUserQueryHandler);

    /**
     * Execute query
     */
    const result = queryBus.execute<IFindUserQuery, FindUserQueryHandlerResult>(
      new FindUserQuery({ email: 'test@gmail.com' }),
    );

    /**
     * Check result
     */
    const { user } = result;
    console.log(user);
  }
}

App.main();
