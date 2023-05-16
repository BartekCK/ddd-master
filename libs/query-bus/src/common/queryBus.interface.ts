import { Result } from '@ddd-master/result';

import { IQuery } from './query.interface';
import { IQueryHandler } from './queryHandler.interface';

export interface IQueryBus {
  execute: <Query extends IQuery, R extends Result | Promise<Result>>(query: Query) => R;
  register: (query: { new (...args: never[]): IQuery }, queryHandler: IQueryHandler<IQuery, Promise<Result>>) => void;
}
