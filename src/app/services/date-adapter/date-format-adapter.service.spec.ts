import { TestBed } from '@angular/core/testing';

import { DateFormatAdapterService } from './date-format-adapter.service';

describe('DateFormatAdapterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateFormatAdapterService = TestBed.get(DateFormatAdapterService);
    expect(service).toBeTruthy();
  });
});
