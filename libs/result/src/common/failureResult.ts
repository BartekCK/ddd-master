// eslint-disable-next-line @typescript-eslint/naming-convention
import { Result } from './result';

export type ERROR_TYPE = 'DOMAIN_ERROR' | 'INFRASTRUCTURE_ERROR';

export abstract class FailureResult<T = unknown> extends Result {
  protected readonly errorMessage: string;
  protected readonly errorCode: string;
  protected readonly errorType: ERROR_TYPE;
  protected readonly context: T | null;

  public constructor(data: {
    errorMessage: string;
    errorCode: string;
    errorType: 'DOMAIN_ERROR' | 'INFRASTRUCTURE_ERROR';
    context?: T;
  }) {
    const { errorCode, errorType, errorMessage, context } = data;
    super(false);

    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.context = context || null;
  }

  public getError(): {
    errorMessage: string;
    errorCode: string;
    errorType: ERROR_TYPE;
    context: T | null;
  } {
    return {
      errorMessage: this.errorMessage,
      errorCode: this.errorCode,
      errorType: this.errorType,
      context: this.context || null,
    };
  }

  public override isFailure(): this is FailureResult {
    return this.success === false;
  }
}
