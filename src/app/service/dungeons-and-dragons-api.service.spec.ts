import { TestBed } from '@angular/core/testing';

import { DungeonsAndDragonsAPIService } from './dungeons-and-dragons-api.service';

describe('DungeonsAndDragonsAPIService', () => {
  let service: DungeonsAndDragonsAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DungeonsAndDragonsAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
