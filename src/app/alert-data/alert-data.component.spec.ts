import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDataComponent } from './alert-data.component';

describe('AlertDataComponent', () => {
  let component: AlertDataComponent;
  let fixture: ComponentFixture<AlertDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
