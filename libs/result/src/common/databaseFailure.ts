import { FailureResult } from './failureResult';

export class DatabaseFailure extends FailureResult {
  public constructor(data: { errorMessage: string; context?: unknown }) {
    super({
      errorMessage: data.errorMessage,
      errorCode: 'DATABASE_FAILURE',
      errorType: 'INFRASTRUCTURE_ERROR',
      context: data.context,
    });
  }
}
