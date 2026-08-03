import { TestBed } from '@angular/core/testing';

import { Avocat } from './avocat';

describe('Avocat', () => {
  let service: Avocat;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Avocat);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
