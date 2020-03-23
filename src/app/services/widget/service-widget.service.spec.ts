import { TestBed } from '@angular/core/testing';

import { ServiceWidgetService } from './service-widget.service';

describe('ServiceWidgetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceWidgetService = TestBed.get(ServiceWidgetService);
    expect(service).toBeTruthy();
  });
});
