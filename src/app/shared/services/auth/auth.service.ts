import { Injectable } from '@angular/core';
import { AuthorService } from '../author/author.service';
import { Author } from '../../models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currUser: Author;

  constructor(private authorService: AuthorService) {
    this.currUser = this.authorService.createAuthorClass(
      {
        id: 999,
        name: 'Jolly Roger',
        registrationDate: '2020-01-18T14:12:45.379Z',
        avatarUrl: ''
      }
    )
  }
}
