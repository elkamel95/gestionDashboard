import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicateurListeComponent } from './indicateur-liste.component';

describe('IndicateurListeComponent', () => {
  let component: IndicateurListeComponent;
  let fixture: ComponentFixture<IndicateurListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicateurListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicateurListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
