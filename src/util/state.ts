
export function stringifyState(state: Map<string, number>): string {
    return [...state].join('--');
}

export function hashmapifyState(state: string): Map<string, number> {
    return new Map<string, number>(state.split('--').map((placeState: string) => {
        const placeStateTuple = placeState.split(",")
        return [placeStateTuple[0], Number(placeStateTuple[1])];
    }));
}