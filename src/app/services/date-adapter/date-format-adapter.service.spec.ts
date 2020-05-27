import { TestBed } from '@angular/core/testing';

import { PickDateAdapter } from './date-format-adapter.service';

describe('PickDateAdapter', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PickDateAdapter = TestBed.get(PickDateAdapter);
    expect(service).toBeTruthy();
  });
});
