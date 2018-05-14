export class Appreciation {

    public id?: number;
    public averageScore: number;
    public numberOfVoters: number;
}

export class CharacterClass {

    public id?: number;
    public className: string;
    public race: Race;
}

export class DicePool {

    public id?: number;
    public numberOfDices: number;
    public numberOfFaces: number;
}

export class GameCharacter {

    public id?: number;
    public user: User;
    public appreciation?: Appreciation;
    public characterName: string;
    public characterClass: CharacterClass;
    public level: number;
    public sex: string;
    public alliegeance: string;
}

export class Race {

    public id?: number;
    public raceName: string;
    public maleBaseHeight: number;
    public femaleBaseheight: number;
    public heightModifier: DicePool;
}

export class User {
    public id?: number;
    public name: string;
}
