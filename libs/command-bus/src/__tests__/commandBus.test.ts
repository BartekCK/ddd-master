import { ICommand } from '../common/command.interface';
import { CommandBus } from '../common/commandBus';
import { ICommandHandler } from '../common/commandHandler.interface';

describe('CommandBus', () => {
  const email = 'test@gmail.com';

  describe('Given command bus', () => {
    const commandBus = new CommandBus();

    describe('When command was registered', () => {
      class CreateUserCommand implements ICommand {
        public readonly email: string;

        public constructor({ email }: CreateUserCommand) {
          this.email = email;
        }
      }

      class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, { email: string }> {
        public handle(command: ICommand): { email: string } {
          const { email } = command as CreateUserCommand;

          return { email };
        }
      }

      beforeAll(() => {
        commandBus.register(CreateUserCommand, new CreateUserCommandHandler());
      });

      it('Then should return email in result', () => {
        const result = commandBus.execute(new CreateUserCommand({ email }));

        expect(result).toEqual({ email });
      });
    });

    describe('When command was not registered', () => {
      class NotRegisterCommand implements ICommand {
        public readonly email: string;

        public constructor({ email }: NotRegisterCommand) {
          this.email = email;
        }
      }

      it('Then should throw error', () => {
        expect(() => commandBus.execute(new NotRegisterCommand({ email }))).toThrowError();
      });
    });
  });
});
