import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesFilterComponent } from './messages-filter.component';

describe('MessagesFilterComponent', () => {
  let component: MessagesFilterComponent;
  let fixture: ComponentFixture<MessagesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
