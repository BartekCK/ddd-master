import { FailureResult, SuccessResult } from '@ddd-master/result';

/**
 * Declare success object
 */
export class UserSaveSuccess extends SuccessResult<{ id: string }> {}

/**
 * Declare failure object
 */
export class UserSaveFailure extends FailureResult<{ userId: string }> {
  private constructor({ userId, message }: { userId: string; message: string }) {
    super({
      errorMessage: message,
      errorCode: 'USER_ALREADY_EXIST',
      errorType: 'DOMAIN_ERROR',
      context: { userId },
    });
  }

  public static createUserExistFailure(dto: { userId: string }): UserSaveFailure {
    return new UserSaveFailure({ message: `User with id ${dto.userId} already exist`, userId: dto.userId });
  }
}

/**
 * Declare result base on success and failure objects
 */
export type SaveResult = UserSaveSuccess | UserSaveFailure;

export interface IUserRepository {
  save(dto: { id: string }): Promise<SaveResult>;
}

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

class App {
  public static async main(): Promise<void> {
    const userRepository: IUserRepository = new UserRepositoryImpl();

    /**
     * Execute save method
     */
    const saveUserResult = await userRepository.save({ id: '1' });

    /**
     * Check if result is failure and if it is, retrieve error data
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
