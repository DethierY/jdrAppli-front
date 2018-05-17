export class Appreciation {

    public id?: number;
    public averageScore: number;
    public numberOfVoters: number;
}

export class CharacterClass {

    public id?: number;
    public className: string;
    public race: Race;
    public startingAge: number;
    public startingAgeModifier: DicePool;
}

export class DicePool {

    public id?: number;
    public numberOfDices: number;
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
    public alliegeance: string;
    public strength: number;
    public dexterity: number;
    public constitution: number;
    public intelligence: number;
    public wisdom: number;
    public charism: number;
}

export class Race {

    public id?: number;
    public raceName: string;
    public baseHeight: number;
    public minHeight: number;
    public maxHeight: number;
    public heightSexModifier: number;
    public heightModifier: DicePool;
}

export class User {
    public id?: number;
    public name: string;
}
