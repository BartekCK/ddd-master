import { FailureResult } from './failureResult';

export class InvalidPayloadFailure extends FailureResult {
  public constructor(data: { errorMessage: string; context?: unknown }) {
    super({
      errorMessage: data.errorMessage,
      errorCode: 'INVALID_PAYLOAD',
      errorType: 'DOMAIN_ERROR',
      context: data.context,
    });
  }
}
