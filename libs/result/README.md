# @ddd-master/result package

[![codecov](https://codecov.io/github/BartekCK/ddd-master/branch/master/graph/badge.svg?token=O1NDI5H17P)](https://codecov.io/github/BartekCK/ddd-master)
[![npm](https://img.shields.io/npm/v/@ddd-master/result?color=blue&label=%40ddd-master%2Fresult)](https://www.npmjs.com/package/@ddd-master/result)

The `@ddd-master/result` library is a TypeScript package that provides a set of classes and types for handling success and failure results in Domain-Driven Design (DDD) applications. It enables you to encapsulate and communicate the outcome of operations in a structured and type-safe manner.

## Installation

You can install the `@ddd-master/result` package using npm:

```bash
npm install @ddd-master/result
```

## Usage

To use the `@ddd-master/result` package, you can import the necessary classes and types:

```typescript
import { FailureResult, SuccessResult } from '@ddd-master/result';
```

### Declaring Success and Failure Objects

The library allows you to declare custom success and failure objects by extending the `SuccessResult` and `FailureResult` classes, respectively.

Here's an example of declaring a success object:

```typescript
class UserSaveSuccess extends SuccessResult<{ id: string }> {}
```

And here's an example of declaring a failure object:

```typescript
class UserSaveFailure extends FailureResult<{ userId: string }> {
  private constructor({ userId, message }: { userId: string; message: string }) {
    super({
      errorMessage: message,
      errorCode: 'USER_ALREADY_EXIST',
      errorType: 'DOMAIN_ERROR',
      context: { userId },
    });
  }

  public static createUserExistFailure(dto: { userId: string }): UserSaveFailure {
    return new UserSaveFailure({ message: `User with id ${dto.userId} already exists`, userId: dto.userId });
  }
}
```

### Declaring Result Types

You can define a custom type that represents the possible results of an operation by combining the success and failure objects:

```typescript
type SaveResult = UserSaveSuccess | UserSaveFailure;
```

### Implementing a Repository

In the example below, an `IUserRepository` interface is defined, which includes a `save` method that returns a `Promise` of `SaveResult`.

```typescript
export interface IUserRepository {
  save(dto: { id: string }): Promise<SaveResult>;
}
```

An implementation of the `IUserRepository` interface is shown below:

```typescript
class UserRepositoryImpl implements IUserRepository {
  public async save(dto: { id: string }): Promise<SaveResult> {
    const { id } = dto;

    const rand = Math.floor(Math.random() * 100);

    try {
      if (rand % 2) {
        throw new Error('Database error');
      }

      return new UserSaveSuccess({ id });
    } catch (error) {
      return UserSaveFailure.createUserExistFailure({ userId: id });
    }
  }
}
```

### Executing the Operation

In the `App` class

below, the `main` method demonstrates how to use the repository to save a user and handle the result.

```typescript
class App {
  public static async main(): Promise<void> {
    const userRepository: IUserRepository = new UserRepositoryImpl();

    /**
     * Execute save method
     */
    const saveUserResult = await userRepository.save({ id: '1' });

    /**
     * Check if the result is a failure and, if it is, retrieve the error data
     */
    if (saveUserResult.isFailure()) {
      const { context, errorCode, errorType, errorMessage } = saveUserResult.getError();

      console.log({ context, errorCode, errorType, errorMessage });
      return;
    }

    /**
     * Result is success, so we can retrieve success data
     */
    const { id } = saveUserResult.getData();
    console.log({ id });
  }
}

App.main();
```

The code above executes the `save` method of the `userRepository`, handles the success or failure result, and logs the appropriate data.

### Additional Ready Error Results

In addition to the custom success and failure objects, the `@ddd-master/result` package provides the following additional ready-to-use error results for common scenarios:

- `ConcurrencyFailure`: Represents an error when there is a concurrency conflict during an operation, indicating that the data being modified has been changed by another process or user.

- `DatabaseFailure`: Represents an error when there is a failure or error in the database operation, such as a connection issue, query failure, or transaction error.

- `InvalidDomainEventFailure`: Represents an error when a domain event being processed is invalid or fails validation, indicating that the event does not conform to the expected structure or business rules.

- `InvalidPayloadFailure`: Represents an error when the payload of a message or request is invalid or fails validation, indicating that the data provided does not meet the required format or criteria.

These error results can be imported from the `@ddd-master/result` package and used in your application to handle specific error scenarios with appropriate error types and messages.

## Contributing

Contributions to the `@ddd-master/result` package are welcome! Feel free to open issues or submit pull requests on the [GitHub repository](https://github.com/BartekCK/ddd-master/tree/master/libs/result). Please follow the [code of conduct](https://github.com/BartekCK/ddd-master/blob/master/CODE_OF_CONDUCT.md) when contributing.

## License

The `@ddd-master/result` package is open-source software licensed under the [MIT License](https://github.com/BartekCK/ddd-master/blob/master/LICENSE).
