
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
            throw new Error(`Syntax error: ${input[0]}`);
        }
    }
    return tokens;
}

interface IToken {
    generateInstance(): void;
}

class PlaceToken {
    constructor(private tokenText: string) {}

    public generateInstance() {
        console.log(this.tokenText);
    }
}

class InToken {
    constructor(private tokenText: string) {}

    public generateInstance() {
        console.log(this.tokenText);
    }
}

class OutToken {
    constructor(private tokenText: string) {}

    public generateInstance() {
        console.log(this.tokenText);
    }
}

class TransitionToken {
    constructor(private tokenText: string) {}

    public generateInstance() {
        console.log(this.tokenText);
    }
}