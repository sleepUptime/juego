import { TestBed } from '@angular/core/testing';

import { ForjandoHeroeService } from './forjando-heroe.service';

describe('ForjandoHeroeService', () => {
  let service: ForjandoHeroeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForjandoHeroeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
