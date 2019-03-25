export default class CageUser {
  public lastName = '';
  public firstName = '';
  public studentStaffNumber!: number | string;
  public email = '';

  public copy(): CageUser {
    if (!this.isValid()) {
      throw new Error(`Missing data for user: ${this.toJson()}`);
    }
    const copy = new CageUser();
    copy.lastName = this.lastName;
    copy.firstName = this.firstName;
    copy.studentStaffNumber = Number(this.studentStaffNumber);
    copy.email = this.email;
    return copy;
  }

  public isValid(): boolean {
    return !!this.lastName && !!this.firstName && !!this.studentStaffNumber && !!this.email;
  }

  public toJson(): string {
    return JSON.stringify({
      firstName: this.firstName,
      lastName: this.lastName,
      studentStaffNumber: this.studentStaffNumber,
      email: this.email
    });
  }
}
