import { IToken } from "../parser/lexer";
import { IArrow } from "./arrow";
import { Place } from "./place";
import { Transition } from "./transition";

export class PetriNet {
    private _places = new Map<string, Place>;
    private _arrows = new Map<string, IArrow>;
    private _transitions = new Map<string, Transition>;

    constructor(tokens: IToken[]) {
        tokens.forEach((token: IToken) => {
            token.generateInstance(this._places, this._arrows, this._transitions);
        })
    }

    get transitions(): Map<string, Transition> {
        return this._transitions;
    }

    public isTransitionFireable(transitionName: string): boolean {
        if (this._transitions.has(transitionName)) {
            return this._transitions.get(transitionName)!.isFireable();
        }
        return false;
    }

    public fireTransition(transitionName: string): void {
        if (this._transitions.has(transitionName)) {
            return this._transitions.get(transitionName)!.fire();
        }
    }

    public getPlaceState(): Map<string, number> {
        const placeState = new Map<string, number>();
        this._places.forEach((place, key) => {
            placeState.set(key, place.tokenCount);
        });
        return placeState;
    }

    public setPlaceState(placeState: Map<string, number>): void {
        placeState.forEach((tokenCount, key) => {
            if (this._places.has(key)) {
                this._places.get(key)!.tokenCount = tokenCount;
            } 
        })
        this._places
    }

}