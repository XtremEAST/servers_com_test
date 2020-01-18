import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { AuthorPageComponent } from './pages/author-page/author-page.component';
import { MessageComponent } from './components/message/message.component';
import { AuthorMessageComponent } from './components/author-message/author-message.component';
import { NewMessageComponent } from './components/new-message/new-message.component';
import { MessagesFilterComponent } from './components/messages-filter/messages-filter.component';
import { ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MessagesPageComponent,
    AuthorPageComponent,
    MessageComponent,
    AuthorMessageComponent,
    NewMessageComponent,
    MessagesFilterComponent
  ],
  entryComponents: [
    NewMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
