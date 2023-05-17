import { ICommand } from './command.interface';
import { ICommandHandler } from './commandHandler.interface';

export interface ICommandBus {
  execute: <Command extends ICommand, R>(command: Command) => R;
  register: (command: { new (...args: never[]): ICommand }, commandHandler: ICommandHandler<ICommand, unknown>) => void;
}
