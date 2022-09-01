import { TestBed } from '@angular/core/testing';

import { InMemoryUserService } from './in-memory-user.service';

describe('InMemoryUserService', () => {
  let service: InMemoryUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
