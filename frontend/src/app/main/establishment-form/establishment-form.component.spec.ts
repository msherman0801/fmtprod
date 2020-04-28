import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentFormComponent } from './establishment-form.component';

describe('EstablishmentFormComponent', () => {
  let component: EstablishmentFormComponent;
  let fixture: ComponentFixture<EstablishmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablishmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
