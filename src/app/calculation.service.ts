import { Injectable } from '@angular/core';
import { Bonus, BonusProgression, CharacterClass } from './models';

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
    if (typeof characterClass !== 'undefined' && characterClass.ranks.length > 0) {
      return characterClass.ranks[level - 1].rankValue;
    }
    return null;
  }

  public setSave(bonusProgression: BonusProgression, level: number, bonusAbility: number): number {
    let save = 0;
    if (typeof bonusAbility === 'undefined') {
      save = this.setLevelBonusValue(bonusProgression, level);
    } else {
      save = this.setLevelBonusValue(bonusProgression, level) + bonusAbility;
    }
    return save;
  }

  public setLevelBonusValue(bonusProgression: BonusProgression, level: number): number {
    return bonusProgression.progressionValue[level - 1].bonusValue;
  }
}
