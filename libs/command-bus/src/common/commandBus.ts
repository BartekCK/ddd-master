import { ICommand } from './command.interface';
import { ICommandBus } from './commandBus.interface';
import { ICommandHandler } from './commandHandler.interface';

export class CommandBus implements ICommandBus {
  private commandHandlers: Map<string, ICommandHandler<ICommand, unknown>> = new Map();

  public execute<Command extends ICommand, R>(command: Command): R {
    const handler = this.findCommandHandler(command);

    if (!handler) {
      throw new Error(`Command for handler doesn't exist, commandName: ${command.constructor.name}`, {
        cause: {
          commandName: command.constructor.name,
        },
      });
    }

    return <R>handler.handle(command);
  }

  private findCommandHandler(command: ICommand): ICommandHandler<ICommand, unknown> | null {
    const className = command.constructor.name;

    const handler = this.commandHandlers.get(className);

    return handler || null;
  }

  public register(
    Command: { new (...args: never[]): ICommand },
    commandHandler: ICommandHandler<ICommand, unknown>,
  ): void {
    this.commandHandlers.set(Command.name, commandHandler);
  }
}
