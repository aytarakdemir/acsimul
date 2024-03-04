import { Place } from "./place";


export interface IArrow {
    moveTokens(): void;
    areTokensMovable(): boolean;
}

export class InArrow implements IArrow {
    private tokenThroughput: number;
    private associatedPlace: Place;

    constructor(tokenThroughput: number, associatedPlace: Place) {
        this.tokenThroughput = tokenThroughput;
        this.associatedPlace = associatedPlace;
    }

    public areTokensMovable(): boolean {
        return this.associatedPlace.isTokenSubtractable(this.tokenThroughput);
    }

    public moveTokens(): void {
        this.associatedPlace.subtractTokens(this.tokenThroughput);
    }
}

export class OutArrow implements IArrow {
    private tokenThroughput: number;
    private associatedPlace: Place;

    constructor(tokenThroughput: number, associatedPlace: Place) {
        this.tokenThroughput = tokenThroughput;
        this.associatedPlace = associatedPlace;
    }

    public areTokensMovable(): boolean {
        return true;
    }

    public moveTokens(): void {
        this.associatedPlace.addTokens(this.tokenThroughput);
    }
}