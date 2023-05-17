# @ddd-master/query-bus package

[![npm](https://img.shields.io/npm/v/@ddd-master/query-bus?color=blue&label=%40ddd-master%2Fquery-bus)](https://www.npmjs.com/package/@ddd-master/query-bus)

The `@ddd-master/query-bus` package is a TypeScript library that provides an implementation of the query bus pattern for Domain-Driven Design (DDD) applications. It enables you to execute queries and retrieve query results in a centralized and efficient manner.

## Installation

You can install the `@ddd-master/query-bus` package using npm:

```bash
npm install @ddd-master/query-bus
```

## Usage

To use the `@ddd-master/query-bus` package, you need to define your queries and query handlers.

### Defining Queries

Queries represent requests for information or data retrieval. You can define a query by implementing the `IQuery` interface. For example:

```typescript
export interface IFindUserQuery extends IQuery {
  email: string;
}

export class FindUserQuery implements IFindUserQuery {
  public readonly email: string;

  public constructor({ email }: IFindUserQuery) {
    this.email = email;
  }
}
```

### Defining Query Handlers

Query handlers are responsible for executing queries and returning the query results. You can implement the `IQueryHandler` interface to define your query handlers. For example:

```typescript
export class FindUserQueryHandler implements IQueryHandler<IFindUserQuery, FindUserQueryHandlerResult> {
  private readonly userRepository: UserRepository;
  public constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  public handle(query: IQuery): FindUserQueryHandlerResult {
    const { email } = query as IFindUserQuery;

    const user = this.userRepository.getByEmail({ email });

    if (!user) {
      throw new Error('User not found');
    }

    return { user };
  }
}
```

### Registering Query Handlers

Once you have your query handlers, you need to register them with the query bus. For example:

```typescript
const queryBus = new QueryBus();
const findUserQueryHandler = new FindUserQueryHandler();
queryBus.register(FindUserQuery, findUserQueryHandler);
```

### Executing Queries

To execute a query, you can use the `execute` method of the query bus. For example:

```typescript
const result = queryBus.execute<IFindUserQuery, FindUserQueryHandlerResult>(
  new FindUserQuery({ email: 'test@gmail.com' }),
);

const { user } = result;
console.log(user);
```

The `execute` method returns the query result. You can access the result and process it accordingly.

## Contributing

Contributions to the `@ddd-master/query-bus` package are welcome! Feel free to open issues or submit pull requests on the [GitHub repository](https://github.com/BartekCK/ddd-master/tree/master/libs/query-bus). Please follow the [code of conduct](https://github.com/BartekCK/ddd-master/blob/master/CODE_OF_CONDUCT.md) when contributing.

## License

The `@ddd-master/query-bus` package is open-source software licensed under the [MIT License](https://github.com/BartekCK/ddd-master/blob/master/LICENSE).
