import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultWidgetsComponent } from './consult-widgets.component';

describe('ConsultWidgetsComponent', () => {
  let component: ConsultWidgetsComponent;
  let fixture: ComponentFixture<ConsultWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
