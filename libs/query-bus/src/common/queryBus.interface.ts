import { IQuery } from './query.interface';
import { IQueryHandler } from './queryHandler.interface';

export interface IQueryBus {
  execute: <Query extends IQuery, R>(query: Query) => R;
  register: (query: { new (...args: never[]): IQuery }, queryHandler: IQueryHandler<IQuery, unknown>) => void;
}
