import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LienToListWidgetComponent } from './lien-to-list-widget.component';

describe('LienToListWidgetComponent', () => {
  let component: LienToListWidgetComponent;
  let fixture: ComponentFixture<LienToListWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LienToListWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LienToListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
