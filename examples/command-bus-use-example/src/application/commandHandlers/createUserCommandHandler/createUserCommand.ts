import { ICommand } from '@ddd-master/command-bus';

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
