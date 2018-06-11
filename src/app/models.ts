export class Appreciation {

    public id?: number;
    public averageScore: number;
    public numberOfVoters: number;
}

export class Bonus {
    public id?: number;
    public levelValue: number;
    public bonusValue: number;
}

export class BonusProgression {
    public id?: number;
    public progressionValue: Bonus[];
}

export class CharacterClass {

    public id?: number;
    public className: string;
    public race: Race;
    public startingAge: number;
    public startingAgeModifier: DicePool;
    public fortitudeSave: BonusProgression;
    public reflexSave: BonusProgression;
    public willSave: BonusProgression;
    public startingWealth: number;
    public enduranceDie: DicePool;
    public wealthModifier: DicePool;
    public rank: Rank;
}

export class DicePool {

    public id?: number;
    public numberOfDice: number;
    public numberOfSides: number;
}

export class GameCharacter {

    public id?: number;
    public user: User;
    public appreciation?: Appreciation;
    public characterName: string;
    public characterClass: CharacterClass;
    public level: number;
    public age: number;
    public sex: string;
    public height: number;
    public weight: number;
    public alliegeance: string;
    public strength: number;
    public dexterity: number;
    public constitution: number;
    public intelligence: number;
    public wisdom: number;
    public charisma: number;
    public endurance: number;
    public wealth: number;
}

export class Race {

    public id?: number;
    public raceName: string;
    public baseHeight: number;
    public heightSexModifier: number;
    public heightModifier: DicePool;
    public baseWeight: number;
    public weightSexModifier: number;
    public weightModifier: DicePool;
}

export class Rank {

    public id?: number;
    public level1: string;
    public level2: string;
    public level3: string;
    public level4: string;
    public level5: string;
    public level6: string;
    public level7: string;
    public level8: string;
    public level9: string;
    public level10: string;
    public level11: string;
    public level12: string;
    public level13: string;
    public level14: string;
    public level15: string;
    public level16: string;
    public level17: string;
    public level18: string;
    public level19: string;
    public level20: string;
}

export class TableRow {
    public characterName: string;
    public className: string;
    public characterLevel: number;
    public userName: string;
    public score: number;
    public numberOfVoters: number;
}

export class User {
    public id?: number;
    public name: string;
}
