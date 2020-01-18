export class Author {
  registrationDate: Date;

  constructor(public id: number, public name: string, registrationDate: string, public avatarUrl: string) {
    this.registrationDate = this.prepareDate(registrationDate);
  }

  private prepareDate(dateStr: string): Date {
    const date = new Date(dateStr);
    return date.toString() !== 'Invalid Date' ? date : new Date();
  }
}
