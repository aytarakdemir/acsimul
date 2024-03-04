import { IArrow } from "./arrow";

export class Transition {
    private _arrows: IArrow[];

    constructor(arrows: IArrow[]) {
        this._arrows = arrows;
    }

    public isFireable(): boolean {
        let isFireable: boolean = true;
        this._arrows.forEach((arrow: IArrow) => {
            if (!arrow.areTokensMovable())
                isFireable = false;
        })
        return isFireable;
    }

    public fire(): void {
        if (this.isFireable()) {
            console.log("Firing...")
            this._arrows.forEach((arrow: IArrow) => {
                arrow.moveTokens();
            })    
        } else {
            console.log("Transition is not fireable.");
        }
    }
}