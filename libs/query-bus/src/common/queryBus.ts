import { IQuery } from './query.interface';
import { IQueryBus } from './queryBus.interface';
import { IQueryHandler } from './queryHandler.interface';

export class QueryBus implements IQueryBus {
  private queryHandlers: Map<string, IQueryHandler<IQuery, unknown>> = new Map();

  public execute<Query extends IQuery, R>(query: Query): R {
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

  private findQueryHandler(query: IQuery): IQueryHandler<IQuery, unknown> | null {
    const className = query.constructor.name;

    const handler = this.queryHandlers.get(className);

    return handler || null;
  }

  public register(Query: { new (...args: never[]): IQuery }, queryHandler: IQueryHandler<IQuery, unknown>): void {
    this.queryHandlers.set(Query.name, queryHandler);
  }
}
