import { assertResultFailure } from '../common/asserations';
import { FailureResult } from '../common/failureResult';

class UserCreatedFailure extends FailureResult<{ email: string }> {
  public constructor({ email }: { email: string }) {
    super({
      errorType: 'DOMAIN_ERROR',
      errorCode: 'USER_CREATED_FAILURE',
      errorMessage: 'Error occurred during user creation',
      context: { email },
    });
  }
}

describe('SuccessResult', () => {
  const email = 'test@gmail.com';

  it('should be success', () => {
    const object = new UserCreatedFailure({ email });

    expect(object.isSuccess()).toBe(false);
    expect(object.isFailure()).toBe(true);

    assertResultFailure(object);
  });

  it('should return body data', () => {
    const object = new UserCreatedFailure({ email });

    expect(object.getError()).toEqual({
      errorType: 'DOMAIN_ERROR',
      errorCode: 'USER_CREATED_FAILURE',
      errorMessage: 'Error occurred during user creation',
      context: { email },
    });
  });
});
