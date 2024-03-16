import { IArrow, InArrow, OutArrow } from "../petri/arrow";
import { Place } from "../petri/place";
import { Transition } from "../petri/transition";

const regexPlace = /--place\("([a-zA-Z0-9_\-]+)",\s*([+\-]?\d+)\)/ig;
const regexIn = /--in\("([a-zA-Z0-9_\-]+)",\s*"([a-zA-Z0-9_\-]+)",\s*([+\-]?\d+)\)/ig;
const regexOut = /--out\("([a-zA-Z0-9_\-]+)",\s*"([a-zA-Z0-9_\-]+)",\s*([+\-]?\d+)\)/ig;
const regexTransition = /--transition\("([a-zA-Z0-9_\-]+)",\s*\[((\("[a-zA-Z0-9_\-]*"\)\s*)*)\]\s*,\s*\[((\("[a-zA-Z0-9_\-]*"\)\s*)*)\]\s*\)/ig;


export function tokenize(input: string): IToken[] {
    const tokens: IToken[] = [];
    input = input.replace(/(\r\n|\n|\r)/gm, "").replace(/ /g,'');

    while (input.length > 0) {
        const currentInstructionText = input.indexOf(`--`, 1) !== -1 ? input.substring(0, input.indexOf(`--`, 1)): input;
        if (currentInstructionText.match(regexPlace)) {
            tokens.push(new PlaceToken(input.match(regexPlace)![0]));
            input = input.slice(input.match(regexPlace)![0].length);
        } else if (currentInstructionText.match(regexIn)) {
            tokens.push(new InToken(input.match(regexIn)![0]));
            input = input.slice(input.match(regexIn)![0].length);
        } else if (currentInstructionText.match(regexOut)) {
            tokens.push(new OutToken(input.match(regexOut)![0]));
            input = input.slice(input.match(regexOut)![0].length);
        } else if (currentInstructionText.match(regexTransition)) {
            tokens.push(new TransitionToken(input.match(regexTransition)![0]));
            input = input.slice(input.match(regexTransition)![0].length);
        } else {
            throw new Error(`Syntax error: ${input.substring(0, input.indexOf("--",1))}`);
        }
    }
    tokens.sort((a: IToken, b: IToken) => {
        function prioritize(constructorName: string): number {
            switch (constructorName) {
                case "PlaceToken":
                    return 1;
                case "InToken":
                    return 2;
                case "OutToken":
                    return 3;
                case "TransitionToken":
                    return 4;
            }
            return -1;
        }

        const aPriority = prioritize(a.constructor.name);
        const bPriority = prioritize(b.constructor.name);

        return aPriority - bPriority;
    });
    return tokens;
}

export interface IToken {
    generateInstance(placeMap: Map<string, Place>,
                     arrowMap: Map<string, IArrow>, 
                     transitionMap: Map<string, Transition>
                    ): void;
}

class PlaceToken {
    constructor(private tokenText: string) {}

    private parseToken(): {name: string, tokenCount: number} {        
        const doubleQuotedTextMatch = this.tokenText.match(/"([^"]*)"/);
        const name = (doubleQuotedTextMatch && doubleQuotedTextMatch[1]) ? doubleQuotedTextMatch[1] : ""
        const tokenCount = this.tokenText.slice(11 + name.length, -1);
        return {name: name, tokenCount: parseInt(tokenCount)};
    }

    public generateInstance(placeMap: Map<string, Place>): void {
        // console.log(this.parseToken());
        const placeParameters = this.parseToken();

        placeMap.set(placeParameters.name, new Place(placeParameters.tokenCount));
    }
}

class InToken {
    constructor(private tokenText: string) {}

    private parseToken(): {inName: string, placeName: string, tokenThroughput: number} {        
        const doubleQuotedTextMatch = this.tokenText.match(/"([^"]*)"/g);
        let inName = "";
        let placeName = "";
        if (doubleQuotedTextMatch && doubleQuotedTextMatch.length >= 2) {
            inName = doubleQuotedTextMatch[0].slice(1,-1);
            placeName = doubleQuotedTextMatch[1].slice(1,-1);
        }

        const tokenThroughput = this.tokenText.slice(11 + inName.length + placeName.length, -1);
        return {inName: inName, placeName: placeName, tokenThroughput: parseInt(tokenThroughput)};
    }

    public generateInstance(placeMap: Map<string, Place>, arrowMap: Map<string, IArrow>): void {
        // console.log(this.parseToken());
        const arrowParameters = this.parseToken();
        if (placeMap.has(arrowParameters.placeName))
            arrowMap.set(arrowParameters.inName, new InArrow(arrowParameters.tokenThroughput, placeMap.get(arrowParameters.placeName)!));
    }
}

class OutToken {
    constructor(private tokenText: string) {}

    private parseToken(): {outName: string, placeName: string, tokenThroughput: number} {        
        const doubleQuotedTextMatch = this.tokenText.match(/"([^"]*)"/g);
        let outName = "";
        let placeName = "";
        if (doubleQuotedTextMatch && doubleQuotedTextMatch.length >= 2) {
            outName = doubleQuotedTextMatch[0].slice(1,-1);
            placeName = doubleQuotedTextMatch[1].slice(1,-1);
        }

        const tokenThroughput = this.tokenText.slice(12 + outName.length + placeName.length, -1);
        return {outName: outName, placeName: placeName, tokenThroughput: parseInt(tokenThroughput)};
    }

    public generateInstance(placeMap: Map<string, Place>, arrowMap: Map<string, IArrow>): void {
        // console.log(this.parseToken());
        const arrowParameters = this.parseToken();
        if (placeMap.has(arrowParameters.placeName))
            arrowMap.set(arrowParameters.outName, new OutArrow(arrowParameters.tokenThroughput, placeMap.get(arrowParameters.placeName)!));

    }
}

class TransitionToken {
    constructor(private tokenText: string) {}

    private parseToken(): {transitionName: string, inNameList: string[], outNameList: string[]} {        
        const doubleQuotedTextMatch = this.tokenText.match(/"([^"]*)"/g);
        let transitionName = "";
        if (doubleQuotedTextMatch && doubleQuotedTextMatch.length >= 1) {
            transitionName = doubleQuotedTextMatch[0].slice(1,-1);
        }

        const listsMatch = this.tokenText.match(/\[([^\]]*)\]/g);
        let inListStr = "";
        let outListStr = "";
        if (listsMatch && listsMatch.length >= 1) {
            inListStr = listsMatch[0].slice(1,-1);
            outListStr = listsMatch[1].slice(1,-1);
        }
        return {transitionName: transitionName, inNameList: parseTransitionParentheses(inListStr), outNameList: parseTransitionParentheses(outListStr)};
    }

    public generateInstance(_placeMap: Map<string, Place>, arrowMap: Map<string, IArrow>, transitionMap: Map<string, Transition>): void {
        // console.log(this.parseToken());
        const transitionParameters = this.parseToken();
        const arrowValues: IArrow[] = [];
        transitionParameters.inNameList.forEach((name: string) => {
            if (arrowMap.has(name))
                arrowValues.push(arrowMap.get(name)!);
        });

        transitionParameters.outNameList.forEach((name: string) => {
            if (arrowMap.has(name))
                arrowValues.push(arrowMap.get(name)!);
        });
        
        transitionMap.set(transitionParameters.transitionName, new Transition(arrowValues));
    }
}

//#region LLM Generated
function parseTransitionParentheses(input: string): string[] {
    const regex = /\("([^"]*)"\)/g;
    const matches: string[] = [];
    let match;

    /** When exec is called repeatedly, it moves to 
     * the next occurence until it cannot find any more 
     * occurences. In which case it returns null.*/
    while ((match = regex.exec(input)) !== null) { 
        matches.push(match[1]);
    }

    return matches;
}
//#endregion