import { Result } from './result';

export abstract class SuccessResult<T = unknown> extends Result {
  private readonly data: T;

  public constructor(data: T) {
    super(true);
    this.data = data;
  }

  public getData(): T {
    return this.data;
  }

  public override isSuccess(): this is SuccessResult<T> {
    return this.success === true;
  }
}
