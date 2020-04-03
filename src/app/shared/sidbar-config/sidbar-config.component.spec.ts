import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidbarConfigComponent } from './sidbar-config.component';

describe('SidbarConfigComponent', () => {
  let component: SidbarConfigComponent;
  let fixture: ComponentFixture<SidbarConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidbarConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidbarConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
