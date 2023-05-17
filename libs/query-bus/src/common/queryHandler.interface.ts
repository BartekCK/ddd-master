import { IQuery } from './query.interface';

export interface IQueryHandler<Query extends IQuery, R> {
  handle: (query: Query) => R;
}
