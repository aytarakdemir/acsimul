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

    public getPlaceState(): number[] {
        return [...this._places.values()].map((place: Place) => place.tokenCount);
    }


}