import { FailureResult } from '../common/failureResult';
import { SuccessResult } from '../common/successResult';

export function assertResultSuccess<T = unknown>(
  result: FailureResult | SuccessResult<T>,
): asserts result is SuccessResult<T> {
  if (result.isFailure()) {
    const { errorMessage, errorCode, errorType } = result.getError();

    throw new Error(`${errorType}\n${errorCode}: ${errorMessage}`);
  }
}

export function assertResultFailure(
  result: FailureResult | SuccessResult<unknown>,
): asserts result is FailureResult<unknown> {
  if (result.isSuccess()) {
    throw new Error('Result should be failure');
  }
}
