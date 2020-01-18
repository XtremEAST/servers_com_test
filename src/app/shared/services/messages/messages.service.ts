import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Message } from '../../models/message';
import { HttpService } from '../http/http.service';
import { IMessageModel } from '../../models/interfaces/i-message-model';
import { first, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private _messages = new BehaviorSubject<Message[]>([]);
  private _authorMessages = new BehaviorSubject<Message[]>([]);
  private _savedNewMessage = new Subject<Message>();

  constructor(private httpService: HttpService,
              private authService: AuthService) {
  }

  get messages$(): BehaviorSubject<Message[]> {
    return this._messages;
  }

  get messages(): Message[] {
    return this._messages.getValue();
  }

  set messages(value: Message[]) {
    this._messages.next(value);
  }


  get authorMessages$(): BehaviorSubject<Message[]> {
    return this._authorMessages;
  }

  get authorMessages(): Message[] {
    return this._authorMessages.getValue();
  }

  set authorMessages(value: Message[]) {
    this._authorMessages.next(value);
  }


  get savedNewMessage$(): Subject<Message> {
    return this._savedNewMessage;
  }

  set savedNewMessage(value: Message) {
    this._savedNewMessage.next(value);
  }


  createMessageClass(messageModel: IMessageModel): Message {
    return new Message(
      messageModel.id,
      messageModel.text,
      messageModel.publishDate,
      messageModel.author.id,
      messageModel.author.name
    );
  }

  getMessages(): void {
    this.httpService.apiRequest('get', 'messages/').pipe(
      first(),
      map((results: IMessageModel[]) => results.map(result => this.createMessageClass(result)))
    ).subscribe(
      messages => this.messages = messages,
      err => console.log(err)
    );
  }

  getAuthorMessages(id: number): void {
    this.httpService.apiRequest('get', `author/${id}/messages/`).pipe(
      first(),
      map((results: IMessageModel[]) => results.map(result => this.createMessageClass(result)))
    ).subscribe(
      messages => this.messages = messages,
      err => console.log(err)
    );
  }

  saveNewMessage(text: string): void {
    const newMessage = {
      text,
      publishDate: new Date().toISOString(),
      authorId: this.authService.currUser.id
    };

    this.httpService.apiRequest('post', 'messages/', {}, newMessage).pipe(
      first(),
      map((result: IMessageModel) => this.createMessageClass(result))
    ).subscribe(
      message => this.savedNewMessage = message,
      err => console.log(err)
    );
  }


  // MOCK FUNCTIONS START
  getMessagesMOCK(): void {
    this.httpService.apiRequest('get', 'assets/mock-data/messages.json').pipe(
      first(),
      map((results: IMessageModel[]) => results.map(result => this.createMessageClass(result)))
    ).subscribe(
      messages => {
        let currUserMessages = localStorage.getItem('currUserMockMessages')
          ? JSON.parse(localStorage.getItem('currUserMockMessages')).map(result => this.createMessageClass(result))
          : [];
        messages = messages.concat(currUserMessages).sort((a, b) => {
          return a.publishDate.getTime() - b.publishDate.getTime();
        });
        this.messages = messages;
      },
      err => console.log(err)
    );
  }

  getAuthorMessagesMOCK(id: number): void {
    if (id === this.authService.currUser.id) {
      this.authorMessages = localStorage.getItem('currUserMockMessages')
        ? JSON.parse(localStorage.getItem('currUserMockMessages')).map(result => this.createMessageClass(result))
        : [];
    } else {
      this.httpService.apiRequest('get', 'assets/mock-data/messages.json').pipe(
        first(),
        map(
          (results: IMessageModel[]) =>
            results
              .filter(result => result.author.id === id)
              .map(result => this.createMessageClass(result))
        )
      ).subscribe(
        messages => this.authorMessages = messages,
        err => console.log(err)
      );
    }
  }

  saveNewMessageMOCK(text: string): void {
    const newMessage: IMessageModel = {
      id: Date.now(),
      text,
      publishDate: new Date().toISOString(),
      author: {
        id: this.authService.currUser.id,
        name: this.authService.currUser.name
      }
    };

    let currUserMessages = localStorage.getItem('currUserMockMessages')
      ? JSON.parse(localStorage.getItem('currUserMockMessages'))
      : [];
    currUserMessages.push(newMessage);
    localStorage.setItem('currUserMockMessages', JSON.stringify(currUserMessages));

    this.savedNewMessage = this.createMessageClass(newMessage);
  }
  // MOCK FUNCTIONS END
}
