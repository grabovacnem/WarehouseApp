import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhItemComponent } from './wh-item.component';

describe('WhItemComponent', () => {
  let component: WhItemComponent;
  let fixture: ComponentFixture<WhItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
