import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingHoursSelectComponent } from './operating-hours-select.component';

describe('OperatingHoursSelectComponent', () => {
  let component: OperatingHoursSelectComponent;
  let fixture: ComponentFixture<OperatingHoursSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatingHoursSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingHoursSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
