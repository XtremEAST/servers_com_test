import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../shared/models/message';

@Component({
  selector: 'app-author-message',
  templateUrl: './author-message.component.html',
  styleUrls: ['./author-message.component.scss']
})
export class AuthorMessageComponent implements OnInit {

  @Input() message: Message;

  constructor() {
  }

  ngOnInit() {
  }

}
