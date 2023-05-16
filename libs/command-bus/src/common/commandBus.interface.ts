import { Result } from '@ddd-master/result';

import { ICommand } from './command.interface';
import { ICommandHandler } from './commandHandler.interface';

export interface ICommandBus {
  execute: <Command extends ICommand, R extends Result | Promise<Result>>(command: Command) => R;
  register: (
    command: { new (...args: never[]): ICommand },
    commandHandler: ICommandHandler<ICommand, Promise<Result>>,
  ) => void;
}
