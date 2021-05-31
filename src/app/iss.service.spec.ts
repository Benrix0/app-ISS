import { TestBed } from '@angular/core/testing';

import { IssService } from './iss.service';

describe('IssService', () => {
  let service: IssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
