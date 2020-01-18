import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessagesService } from '../../shared/services/messages/messages.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NewMessageComponent } from '../../components/new-message/new-message.component';
import { Message } from '../../shared/models/message';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Author } from '../../shared/models/author';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss']
})
export class MessagesPageComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  bsModalRef: BsModalRef;
  currUser: Author;

  constructor(private messagesService: MessagesService,
              private modalService: BsModalService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.currUser = this.authService.currUser;

    this.messagesService.messages$.pipe(
      untilDestroyed(this)
    ).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );

    this.messagesService.savedNewMessage$.pipe(
      untilDestroyed(this)
    ).subscribe(
      (message: Message) => {
        if (this.bsModalRef) {
          this.bsModalRef.hide();
        }
        this.getMessages();
      }
    );

    this.getMessages();
  }

  // this is needed for Observables unsubscribe via untilDestroyed hook
  ngOnDestroy(): void {
  }

  getMessages(): void {
    // this.messagesService.getMessages();
    this.messagesService.getMessagesMOCK();
  }

  openNewMessageModal(): void {
    this.bsModalRef = this.modalService.show(NewMessageComponent);
  }

  trackByFn(index, item) {
    return item.id;
  }
}
