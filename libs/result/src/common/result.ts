export abstract class Result {
  public readonly success: boolean;

  protected constructor(success: boolean) {
    this.success = success;
  }

  public isSuccess(): boolean {
    return this.success;
  }

  public isFailure(): boolean {
    return !this.success;
  }
}
