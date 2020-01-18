import { Injectable } from '@angular/core';
import { IAuthorModel } from '../../models/interfaces/i-author-model';
import { Author } from '../../models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor() { }

  createAuthorClass(authorModel: IAuthorModel): Author {
    return new Author(authorModel.id, authorModel.name, authorModel.registrationDate, authorModel.avatarUrl);
  }
}
