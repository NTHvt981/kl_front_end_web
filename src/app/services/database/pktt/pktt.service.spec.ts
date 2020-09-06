import { TestBed } from '@angular/core/testing';

import { PkttService } from './pktt.service';

describe('PkttService', () => {
  let service: PkttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PkttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
