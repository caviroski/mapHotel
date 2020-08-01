import { TestBed } from '@angular/core/testing';

import { PopUpDataService } from './pop-up-data.service';

describe('PopUpDataService', () => {
  let service: PopUpDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
