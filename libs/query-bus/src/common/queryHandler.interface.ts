import { Result } from '@ddd-master/result';

import { IQuery } from './query.interface';

export interface IQueryHandler<Query extends IQuery, R extends Result | Promise<Result>> {
  handle: (query: Query) => R;
}
