

export class Place {
    private _tokenCount: number;

    constructor(initialTokenCount: number = 0) {
        this._tokenCount = initialTokenCount;
    }

    get tokenCount() {
        return this._tokenCount;
    }

    public addTokens(numberOfTokens: number): void {
        this._tokenCount += numberOfTokens;
    }

    public subtractTokens(numberOfTokens: number): void {
        if (!(this._tokenCount < numberOfTokens)) {
            this._tokenCount -= numberOfTokens;
        }
    }

    public isTokenSubtractable(numberOfTokens: number): boolean {
        return this._tokenCount >= numberOfTokens;
    }
}