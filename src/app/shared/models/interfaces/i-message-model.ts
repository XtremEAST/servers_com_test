export interface IMessageModel {
  id: number;
  text: string;
  publishDate: string;
  author: {
    id: number;
    name: string;
  };
}
