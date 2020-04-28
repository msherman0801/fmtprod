import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantsearchComponent } from './instantsearch.component';

describe('InstantsearchComponent', () => {
  let component: InstantsearchComponent;
  let fixture: ComponentFixture<InstantsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstantsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
