import { TestBed } from '@angular/core/testing';

import { CookieWidgetService } from './cookie-widget.service';

describe('CookieWidgetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CookieWidgetService = TestBed.get(CookieWidgetService);
    expect(service).toBeTruthy();
  });
});
