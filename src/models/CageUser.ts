export default class CageUser {
  public lastName = '';
  public firstName = '';
  public studentStaffNumber!: number | string;
  public email = '';

  public copy(): CageUser {
    const copy = new CageUser();
    copy.lastName = this.lastName;
    copy.firstName = this.firstName;
    if (!this.isValid()) {
      throw new Error('studentStaffNumber should be defined');
    }
    copy.studentStaffNumber = Number(this.studentStaffNumber);
    copy.email = this.email;
    return copy;
  }

  public isValid(): boolean {
    return !!this.studentStaffNumber;
  }
}
