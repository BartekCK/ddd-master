import { Result } from '@ddd-master/result';

import { ICommand } from './command.interface';

export interface ICommandHandler<Command extends ICommand, R extends Result | Promise<Result>> {
  handle: (command: Command) => R;
}
