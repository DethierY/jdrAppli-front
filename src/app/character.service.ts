import { Injectable } from '@angular/core';
import { ICharacter } from './objects/ICharacter';

@Injectable()
export class CharacterService {

  characterList: ICharacter [];

  characList: ICharacter [] = [
    {id: 1, nameCharacter: 'Zozo', characterClass: 'guerrier', level: 3, score: 16, numberOfVoters: 56},
    {id: 2, nameCharacter: 'Toto', characterClass: 'mage', level: 13, score: 6, numberOfVoters: 156},
    {id: 3, nameCharacter: 'Spiderman', characterClass: 'voleur', level: 2, score: 2, numberOfVoters: 2},
    {id: 4, nameCharacter: 'Loly', characterClass: 'clerc', level: 1, score: 20, numberOfVoters: 176},
    {id: 5, nameCharacter: 'Azogh', characterClass: 'barde', level: 10, score: 3, numberOfVoters: 34},
    {id: 6, nameCharacter: 'Grrrr', characterClass: 'paladin', level: 11, score: 1, numberOfVoters: 78},
    {id: 7, nameCharacter: 'Terfur', characterClass: 'sorcier', level: 18, score: 10, numberOfVoters: 102},
    {id: 8, nameCharacter: 'Bozo', characterClass: 'rodeur', level: 20, score: 15, numberOfVoters: 17},
    {id: 9, nameCharacter: 'Nimp', characterClass: 'guerrier', level: 15, score: 19, numberOfVoters: 89},
    {id: 10, nameCharacter: 'Lola', characterClass: 'rodeur', level: 4, score: 4, numberOfVoters: 14},
    {id: 11, nameCharacter: 'Blabla', characterClass: 'barde', level: 5, score: 9, numberOfVoters: 90},
    {id: 12, nameCharacter: 'Mortadelle', characterClass: 'mage', level: 9, score: 11, numberOfVoters: 45},
    {id: 13, nameCharacter: 'Albator', characterClass: 'sorcier', level: 12, score: 12, numberOfVoters: 74},
    {id: 14, nameCharacter: 'Gnnnh', characterClass: 'paladin', level: 6, score: 13, numberOfVoters: 147},
    {id: 15, nameCharacter: 'Jfk', characterClass: 'voleur', level: 18, score: 17, numberOfVoters: 198},
    {id: 16, nameCharacter: 'Jolicoeur', characterClass: 'clerc', level: 19, score: 7, numberOfVoters: 123},
    {id: 17, nameCharacter: 'Zorro', characterClass: 'druide', level: 7, score: 5, numberOfVoters: 64},
    {id: 18, nameCharacter: 'Fichtre', characterClass: 'druide', level: 5, score: 8, numberOfVoters: 75},
    {id: 19, nameCharacter: 'Baroudeur', characterClass: 'rodeur', level: 14, score: 14, numberOfVoters: 12},
    {id: 20, nameCharacter: 'Kolm', characterClass: 'guerrier', level: 17, score: 16, numberOfVoters: 120},
    {id: 21, nameCharacter: 'Zertyop', characterClass: 'druide', level: 10, score: 20, numberOfVoters: 30},
    {id: 22, nameCharacter: 'Azerty', characterClass: 'voleur', level: 9, score: 5, numberOfVoters: 96},
    {id: 23, nameCharacter: 'Faveur', characterClass: 'barde', level: 8, score: 8, numberOfVoters: 78},
    {id: 24, nameCharacter: 'Pouyah', characterClass: 'clerc', level: 1, score: 9, numberOfVoters: 49},
    {id: 25, nameCharacter: 'Ork', characterClass: 'sorcier', level: 1, score: 10, numberOfVoters: 184},
    {id: 26, nameCharacter: 'Gribouille', characterClass: 'paladin', level: 20, score: 11, numberOfVoters: 143},
    {id: 27, nameCharacter: 'Defman', characterClass: 'barbare', level: 17, score: 17, numberOfVoters: 63},
    {id: 28, nameCharacter: 'Tripes', characterClass: 'barbare', level: 13, score: 3, numberOfVoters: 77},
    {id: 29, nameCharacter: 'Boyaux', characterClass: 'mage', level: 3, score: 1, numberOfVoters: 28},
    {id: 30, nameCharacter: 'Pourvoyeur', characterClass: 'barbare', level: 9, score: 13, numberOfVoters: 58},
  ];

  constructor() { }

  getCharacters(): ICharacter[] {
    this.characterList = this.characList;
    return this.characterList;
  }

}
