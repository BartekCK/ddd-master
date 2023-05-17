import { ICommand } from './command.interface';

export interface ICommandHandler<Command extends ICommand, R> {
  handle: (command: Command) => R;
}
