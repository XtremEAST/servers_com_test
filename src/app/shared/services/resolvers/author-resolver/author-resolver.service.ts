import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { HttpService } from '../../http/http.service';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, first, mergeMap } from 'rxjs/operators';
import { IAuthorModel } from '../../../models/interfaces/i-author-model';
import { AuthorService } from '../../author/author.service';
import { Author } from '../../../models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorResolverService {

  constructor(private router: Router,
              private httpService: HttpService,
              private authorService: AuthorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Author> | Observable<never> {
    const authorId = +route.paramMap.get('authorId');

    if (!authorId) {
      this.router.navigate(['/']);
      return EMPTY;
    }

    // return this.httpService.apiRequest('get', `author/${authorId}/`).pipe(
    //   first(),
    //   mergeMap((response: IAuthorModel) => {
    //     if (response) {
    //       return of(this.authorService.createAuthorClass(response));
    //     }
    //     return EMPTY;
    //   }),
    //   catchError(err => {
    //     this.router.navigate(['/']);
    //     return EMPTY;
    //   })
    // );


    // GET MOCK USER
    return this.httpService.apiRequest('get', `assets/mock-data/authors.json`).pipe(
      first(),
      mergeMap((response: IAuthorModel[]) => {
        if (response) {
          return of(this.authorService.createAuthorClass(response.find(author => author.id === authorId)));
        }
        return EMPTY;
      }),
      catchError(err => {
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }
}
