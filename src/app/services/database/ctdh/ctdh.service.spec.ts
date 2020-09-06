import { TestBed } from '@angular/core/testing';

import { CtdhService } from './ctdh.service';

describe('CtdhService', () => {
  let service: CtdhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtdhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
