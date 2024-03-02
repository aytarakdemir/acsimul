import { Iarrow } from "./arrow";

export class Transition {
    private _arrows: Iarrow[];

    constructor(arrows: Iarrow[]) {
        this._arrows = arrows;
    }

    public isFireable(): boolean {
        let isFireable: boolean = true;
        this._arrows.forEach((arrow: Iarrow) => {
            if (!arrow.areTokensMovable())
                isFireable = false;
        })
        return isFireable;
    }

    public fire(): void {
        if (this.isFireable()) {
            this._arrows.forEach((arrow: Iarrow) => {
                arrow.moveTokens();
            })    
        }
    }
}