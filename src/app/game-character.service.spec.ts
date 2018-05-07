import { TestBed, inject } from '@angular/core/testing';

import { GameCharacterService } from './game-character.service';

describe('GameCharacterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameCharacterService]
    });
  });

  it('should be created', inject([GameCharacterService], (service: GameCharacterService) => {
    expect(service).toBeTruthy();
  }));
});
