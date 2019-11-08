import { TestBed } from '@angular/core/testing';

import { PymeHttpService } from './pyme-http.service';

describe('PymeHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PymeHttpService = TestBed.get(PymeHttpService);
    expect(service).toBeTruthy();
  });
});
