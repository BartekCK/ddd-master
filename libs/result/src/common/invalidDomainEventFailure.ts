import { FailureResult } from './failureResult';

interface IContext {
  message?: string;
  eventName: string;
  eventId?: string;
  aggregateName?: string;
}

export const InvalidEventFailureErrorCode = 'INVALID_EVENT' as const;

export class InvalidDomainEventFailure extends FailureResult<IContext> {
  public constructor(context: IContext) {
    super({
      errorType: 'DOMAIN_ERROR',
      errorMessage: 'Error occurred during created message',
      context: context,
      errorCode: InvalidEventFailureErrorCode,
    });
  }
}
