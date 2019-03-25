import CageUser from '@client/models/CageUser';

describe('CageUser', () => {
  it('should have empty string values on construction', () => {
    const user = new CageUser();

    expect(user.firstName).toBe('');
    expect(user.lastName).toBe('');
    expect(user.studentStaffNumber).toBeUndefined();
    expect(user.email).toBe('');
  });

  it('is only valid with all properties', () => {
    const user = new CageUser();

    expect(user.isValid()).toBeFalsy();
    user.firstName = 'first';

    expect(user.isValid()).toBeFalsy();
    user.lastName = 'last';

    expect(user.isValid()).toBeFalsy();
    user.email = 'email';

    expect(user.isValid()).toBeFalsy();
    user.studentStaffNumber = 123;

    expect(user.isValid()).toBeTruthy();
  });

  it('can create JSON', () => {
    const user = new CageUser();
    user.firstName = 'first';
    user.lastName = 'last';
    user.studentStaffNumber = 12;
    user.email = 'email';

    const json = user.toJson();

    expect(json).toBe('{"firstName":"first","lastName":"last","studentStaffNumber":12,"email":"email"}');
  });

  it('should validate on copy', () => {
    const user = new CageUser();
    user.firstName = 'first';
    user.lastName = 'last';
    user.email = 'email';

    const copyUser = () => user.copy();

    expect(copyUser).toThrowError('Missing data for user: {"firstName":"first","lastName":"last","email":"email"}');
  });

  it('it creates a new copy', () => {
    const user = new CageUser();
    user.firstName = 'first';
    user.lastName = 'last';
    user.studentStaffNumber = 12;
    user.email = 'email';

    const copy = user.copy();

    expect(copy).not.toBe(user);
    expect(copy.firstName).toEqual(user.firstName);
    expect(copy.lastName).toEqual(user.lastName);
    expect(copy.studentStaffNumber).toEqual(user.studentStaffNumber);
    expect(copy.email).toEqual(user.email);
  });
});
