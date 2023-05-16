import { Result } from '@ddd-master/result';

import { IQuery } from './query.interface';
import { IQueryBus } from './queryBus.interface';
import { IQueryHandler } from './queryHandler.interface';

export class QueryBus implements IQueryBus {
  private queryHandlers: Map<string, IQueryHandler<IQuery, Result | Promise<Result>>> = new Map();

  public execute<Query extends IQuery, R extends Result | Promise<Result>>(query: Query): R {
    const handler = this.findQueryHandler(query);

    if (!handler) {
      throw new Error(`Query for handler doesn't exist, queryName: ${query.constructor.name}`, {
        cause: {
          queryName: query.constructor.name,
        },
      });
    }

    return <R>handler.handle(query);
  }

  private findQueryHandler(query: IQuery): IQueryHandler<IQuery, Result | Promise<Result>> | null {
    const className = query.constructor.name;

    const handler = this.queryHandlers.get(className);

    return handler || null;
  }

  public register(
    Query: { new (...args: never[]): IQuery },
    queryHandler: IQueryHandler<IQuery, Promise<Result>>,
  ): void {
    this.queryHandlers.set(Query.name, queryHandler);
  }
}
