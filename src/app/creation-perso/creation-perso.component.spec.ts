import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationPersoComponent } from './creation-perso.component';

describe('CreationPersoComponent', () => {
  let component: CreationPersoComponent;
  let fixture: ComponentFixture<CreationPersoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationPersoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
