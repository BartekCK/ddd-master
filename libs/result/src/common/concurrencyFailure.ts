import { FailureResult } from './failureResult';

export class ConcurrencyFailure extends FailureResult {
  public constructor(data: { errorMessage: string; context: { expected?: unknown; current: unknown } }) {
    super({
      errorMessage: data.errorMessage,
      errorCode: 'CONCURRENCY_FAILURE',
      errorType: 'INFRASTRUCTURE_ERROR',
      context: data.context,
    });
  }
}
