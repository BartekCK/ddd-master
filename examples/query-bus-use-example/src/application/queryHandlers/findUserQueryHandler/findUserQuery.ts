import { IQuery } from '@ddd-master/query-bus';

export interface IFindUserQuery extends IQuery {
  email: string;
}

export class FindUserQuery implements IFindUserQuery {
  public readonly email: string;

  public constructor({ email }: IFindUserQuery) {
    this.email = email;
  }
}
