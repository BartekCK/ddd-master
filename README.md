# @ddd-master/* root repository
[![codecov](https://codecov.io/github/BartekCK/ddd-master/branch/master/graph/badge.svg?token=O1NDI5H17P)](https://codecov.io/github/BartekCK/ddd-master)

[![npm](https://img.shields.io/npm/v/@ddd-master/result?color=blue&label=%40ddd-master%2Fresult)](https://www.npmjs.com/package/@ddd-master/result)
[![npm](https://img.shields.io/npm/v/@ddd-master/command-bus?color=blue&label=%40ddd-master%2Fcommand-bus)](https://www.npmjs.com/package/@ddd-master/command-bus)
[![npm](https://img.shields.io/npm/v/@ddd-master/query-bus?color=blue&label=%40ddd-master%2Fquery-bus)](https://www.npmjs.com/package/@ddd-master/query-bus)


The `ddd-master` monorepo is a collection of TypeScript packages designed to support Domain-Driven Design (DDD) architecture in your applications. It includes the following packages:

1. [`@ddd-master/result`](https://github.com/BartekCK/ddd-master/tree/master/libs/result): A package for handling success and failure results in DDD applications. 
2. [`@ddd-master/command-bus`](https://github.com/BartekCK/ddd-master/tree/master/libs/command-bus): A package for implementing the command bus pattern in DDD applications. 
3. [`@ddd-master/query-bus`](https://github.com/BartekCK/ddd-master/tree/master/libs/query-bus): A package for implementing the query bus pattern in DDD applications. 

## Installation

To use any of the packages in the `ddd-master` monorepo, you can install them individually using npm. For example, to install the `@ddd-master/result` package, you can run:

```bash
npm install @ddd-master/result
```

Similarly, you can install the `@ddd-master/command-bus` and `@ddd-master/query-bus` packages by replacing `@ddd-master/result` with the respective package names.

## Packages

### 1. @ddd-master/result

The `@ddd-master/result` package provides classes and types for handling success and failure results in DDD applications. It allows you to encapsulate the outcome of operations in a structured and type-safe manner. You can find more details about this package in the [`@ddd-master/result` README](https://github.com/BartekCK/ddd-master/tree/master/libs/result).

### 2. @ddd-master/command-bus

The `@ddd-master/command-bus` package implements the command bus pattern in DDD applications. It provides a mechanism for decoupling command senders from command handlers, allowing you to handle commands in a centralized and scalable way. You can find more details about this package in the [`@ddd-master/command-bus` README](https://github.com/BartekCK/ddd-master/tree/master/libs/command-bus).

### 3. @ddd-master/query-bus

The `@ddd-master/query-bus` package implements the query bus pattern in DDD applications. It provides a mechanism for executing queries and retrieving query results in a centralized and efficient manner. You can find more details about this package in the [`@ddd-master/query-bus` README](https://github.com/BartekCK/ddd-master/tree/master/libs/query-bus).

## How to release new lib version


1. Create new branch from `master` with name `release/vX.X.X`
2. Update version in `package.json` and `package-lock.json` files by command
```bash
  npm run bump:patch:all
```
3. Commit changes with message `chore: bump version to vX.X.X`
4. Create PR from `release/vX.X.X` to `master` branch
5. Merge PR to `master` branch
6. Checkout into `master` branch and pull changes
7. Create new tag with name `vX.X.X` and push it to remote
```bash
  git tag vX.X.X
  git push origin vX.X.X
```
8. Create new release from tag `vX.X.X` in GitHub

## Contributing

Contributions to the `ddd-master` monorepo are welcome! Feel free to open issues or submit pull requests on the [GitHub repository](https://github.com/BartekCK/ddd-master). Please follow the [code of conduct](https://github.com/BartekCK/ddd-master/blob/master/CODE_OF_CONDUCT.md) when contributing.

## License

The `ddd-master` monorepo and its packages are open-source software licensed under the [MIT License](https://github.com/BartekCK/ddd-master/blob/master/LICENSE).
