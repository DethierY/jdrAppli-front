import { TestBed, inject } from '@angular/core/testing';

import { CharacterClassService } from './character-class.service';

describe('CharacterClassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharacterClassService]
    });
  });

  it('should be created', inject([CharacterClassService], (service: CharacterClassService) => {
    expect(service).toBeTruthy();
  }));
});
