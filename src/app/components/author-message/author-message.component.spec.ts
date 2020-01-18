import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorMessageComponent } from './author-message.component';

describe('AuthorMessageComponent', () => {
  let component: AuthorMessageComponent;
  let fixture: ComponentFixture<AuthorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
