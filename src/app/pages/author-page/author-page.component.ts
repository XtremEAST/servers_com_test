import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Message } from '../../shared/models/message';
import { MessagesService } from '../../shared/services/messages/messages.service';
import { Author } from '../../shared/models/author';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss']
})
export class AuthorPageComponent implements OnInit, OnDestroy {
  author: Author;
  avatarUrl: string;
  defaultAvatarUrl = '/assets/images/avatar-placeholder-300x300.png';
  messages: Message[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private messagesService: MessagesService) {
  }

  ngOnInit() {
    this.messagesService.authorMessages$.pipe(
      untilDestroyed(this)
    ).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );

    this.route.data.pipe(
      first()
    ).subscribe(
      (data: { author: Author }) => {
        if (data.author) {
          this.author = data.author;
          this.avatarUrl = this.author.avatarUrl ? this.author.avatarUrl : this.defaultAvatarUrl;
          this.getMessages();
        }
      }
    );
  }

  // this is needed for Observables unsubscribe via untilDestroyed hook
  ngOnDestroy(): void {
  }

  getMessages(): void {
    // this.messagesService.getAuthorMessages(this.author.id);
    this.messagesService.getAuthorMessagesMOCK(this.author.id);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
