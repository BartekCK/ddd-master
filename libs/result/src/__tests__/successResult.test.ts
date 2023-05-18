import { assertResultSuccess } from '../common/asserations';
import { SuccessResult } from '../common/successResult';

class UserSaveSuccess extends SuccessResult<{ id: string }> {}

describe('SuccessResult', () => {
  it('should be success', () => {
    const object = new UserSaveSuccess({ id: '1' });

    expect(object.isSuccess()).toBe(true);
    expect(object.isSuccess()).toBe(true);

    assertResultSuccess(object);
  });

  it('should return body data', () => {
    const object = new UserSaveSuccess({ id: '1' });

    expect(object.getData()).toEqual({ id: '1' });
  });
});
