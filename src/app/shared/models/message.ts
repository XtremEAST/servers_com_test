export class Message {
  publishDate: Date;
  author: {
    id: number;
    name: string;
  };

  constructor(public id: number, public text: string, publishDate: string, authorId: number, authorName: string) {
    this.publishDate = this.prepareDate(publishDate);
    this.author = {
      id: authorId,
      name: authorName
    }
  }

  private prepareDate(dateStr: string): Date {
    const date = new Date(dateStr);
    return date.toString() !== 'Invalid Date' ? date : new Date();
  }
}
