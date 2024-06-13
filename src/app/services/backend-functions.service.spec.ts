import { TestBed } from '@angular/core/testing';

import { BackendFunctionsService } from './backend-functions.service';

describe('BackendFunctionsService', () => {
  let service: BackendFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
