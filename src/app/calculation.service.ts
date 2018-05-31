import { Injectable } from '@angular/core';
import { LevelBonus, CharacterClass } from './models';

@Injectable()
export class CalculationService {

  constructor() { }

  public rollingDice(dice: number, sides: number): number {
    let result = 0;
    for (let i = 0; i < dice; i++) {
      result = result + +(Math.trunc((Math.random() * sides)) + 1).toFixed(0);
    }
    return result;
  }

  public setAbilityBonus(ability: number): number {
    let bonus: number;
    if (ability > 11) {
      bonus = +(Math.trunc((ability - 10) / 2)).toFixed(0);
    } else if (ability < 10 ) {
      bonus = +(Math.trunc((ability - 11) / 2)).toFixed(0);
    } else {
      bonus = 0;
    }
    return bonus;
  }

  public setRank(level: number, characterClass: CharacterClass): string {
    let rank: string;
    if (typeof characterClass !== 'undefined') {
      if (characterClass.rank !== null) {
        switch (level) {
          case 1:
            rank = characterClass.rank.level1;
            break;
          case 2:
            rank = characterClass.rank.level2;
            break;
          case 3:
            rank = characterClass.rank.level3;
            break;
          case 4:
            rank = characterClass.rank.level4;
            break;
          case 5:
            rank = characterClass.rank.level5;
            break;
          case 6:
            rank = characterClass.rank.level6;
            break;
          case 7:
            rank = characterClass.rank.level7;
            break;
          case 8:
            rank = characterClass.rank.level8;
            break;
          case 9:
            rank = characterClass.rank.level9;
            break;
          case 10:
            rank = characterClass.rank.level10;
            break;
          case 11:
            rank = characterClass.rank.level11;
            break;
          case 12:
            rank = characterClass.rank.level12;
            break;
          case 13:
            rank = characterClass.rank.level13;
            break;
          case 14:
            rank = characterClass.rank.level14;
            break;
          case 15:
            rank = characterClass.rank.level15;
            break;
          case 16:
            rank = characterClass.rank.level16;
            break;
          case 17:
            rank = characterClass.rank.level17;
            break;
          case 18:
            rank = characterClass.rank.level18;
            break;
          case 19:
            rank = characterClass.rank.level19;
            break;
          case 20:
            rank = characterClass.rank.level20;
            break;
        }
      }
    }
    return rank;
  }

  public setSave(levelBonus: LevelBonus, level: number, bonusAbility: number): number {
    let save = 0;
    if (typeof bonusAbility === 'undefined') {
      save = this.setLevelBonusValue(levelBonus, level);
    } else {
      save = this.setLevelBonusValue(levelBonus, level) + bonusAbility;
    }
    return save;
  }

  public setLevelBonusValue(levelBonus: LevelBonus, level: number): number {
    let levelBonusValue = 0;
    switch (level) {
      case 1:
        levelBonusValue = levelBonus.level1;
        break;
      case 2:
        levelBonusValue = levelBonus.level2;
        break;
      case 3:
        levelBonusValue = levelBonus.level3;
        break;
      case 4:
        levelBonusValue = levelBonus.level4;
        break;
      case 5:
        levelBonusValue = levelBonus.level5;
        break;
      case 6:
        levelBonusValue = levelBonus.level6;
        break;
      case 7:
        levelBonusValue = levelBonus.level7;
        break;
      case 8:
        levelBonusValue = levelBonus.level8;
        break;
      case 9:
        levelBonusValue = levelBonus.level9;
        break;
      case 10:
        levelBonusValue = levelBonus.level10;
        break;
      case 11:
        levelBonusValue = levelBonus.level11;
        break;
      case 12:
        levelBonusValue = levelBonus.level12;
        break;
      case 13:
        levelBonusValue = levelBonus.level13;
        break;
      case 14:
        levelBonusValue = levelBonus.level14;
        break;
      case 15:
        levelBonusValue = levelBonus.level15;
        break;
      case 16:
        levelBonusValue = levelBonus.level16;
        break;
      case 17:
        levelBonusValue = levelBonus.level17;
        break;
      case 18:
        levelBonusValue = levelBonus.level18;
        break;
      case 19:
        levelBonusValue = levelBonus.level19;
        break;
    }
    return levelBonusValue;
  }
}
