import { TestBed } from '@angular/core/testing';

import { ModalContainerService } from './modal-container.service';

describe('ModalContainerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalContainerService = TestBed.get(ModalContainerService);
    expect(service).toBeTruthy();
  });
});
