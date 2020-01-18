import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../../shared/services/messages/messages.service';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {
  newMessageForm: FormGroup;

  constructor(private messagesService: MessagesService,
              public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.newMessageForm = new FormGroup({
      text: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(256)
      ])
    });
  }

  saveMessage(): void {
    if (this.newMessageForm.valid) {
      // this.messagesService.saveNewMessage(this.newMessageForm.value.text);
      this.messagesService.saveNewMessageMOCK(this.newMessageForm.value.text);
    }
  }
}
