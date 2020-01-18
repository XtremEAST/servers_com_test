import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { AuthorPageComponent } from './pages/author-page/author-page.component';
import { AuthorResolverService } from './shared/services/resolvers/author-resolver/author-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: MessagesPageComponent
  },
  {
    path: 'author/:authorId',
    component: AuthorPageComponent,
    resolve: {
      author: AuthorResolverService
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
