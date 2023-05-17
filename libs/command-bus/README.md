# @ddd-master/command-bus package

[![npm](https://img.shields.io/npm/v/@ddd-master/command-bus?color=blue&label=%40ddd-master%2Fcommand-bus)](https://www.npmjs.com/package/@ddd-master/command-bus)

The `@ddd-master/command-bus` package is a TypeScript library that provides an implementation of the command bus pattern for Domain-Driven Design (DDD) applications. It allows you to execute commands and perform actions in a centralized and decoupled manner.

## Installation

You can install the `@ddd-master/command-bus` package using npm:

```bash
npm install @ddd-master/command-bus
```

## Usage

To use the `@ddd-master/command-bus` package, you need to define your commands and command handlers.

### Defining Commands

Commands represent actions or requests for changes in the system. You can define a command by implementing the `ICommand` interface. For example:

```typescript
export interface ICreateUserCommand extends ICommand {
  email: string;
  password: string;
}

export class CreateUserCommand implements ICreateUserCommand {
  public readonly email: string;
  public readonly password: string;

  public constructor({ email, password }: ICreateUserCommand) {
    this.email = email;
    this.password = password;
  }
}
```

### Defining Command Handlers

Command handlers are responsible for executing commands and performing the necessary actions. You can implement the `ICommandHandler` interface to define your command handlers. For example:

```typescript
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
```

### Registering Command Handlers

Once you have your command handlers, you need to register them with the command bus. For example:

```typescript
const commandBus = new CommandBus();
const createUserCommandHandler = new CreateUserCommandHandler();
commandBus.register(CreateUserCommand, createUserCommandHandler);
```

### Executing Commands

To execute a command, you can use the `execute` method of the command bus. For example:

```typescript
const result = commandBus.execute<ICreateUserCommand, CreateUserCommandHandlerResult>(
  new CreateUserCommand({ email: 'test@gmail.com', password: '123456' }),
);

const { email, password } = result;
console.log(email, password);
```
The `execute` method returns the result of the command handler. You can access the result and process it accordingly.

## Contributing

Contributions to the `@ddd-master/command-bus` package are welcome! Feel free to open issues or submit pull requests on the [GitHub repository](https://github.com/BartekCK/ddd-master/tree/master/libs/command-bus). Please follow the [code of conduct](https://github.com/BartekCK/ddd-master/blob/master/CODE_OF_CONDUCT.md) when contributing.

## License

The `@ddd-master/command-bus` package is open-source software licensed under the [MIT License](https://github.com/BartekCK/ddd-master/blob/master/LICENSE).
