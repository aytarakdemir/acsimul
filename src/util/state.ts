
export function stringifyState(state: Map<string, number>): string {
    return [...state].join('_');
}

export function hashmapifyState(state: string): Map<string, number> {
    return new Map<string, number>(state.split('_').map((placeState: string) => {
        const placeStateTuple = placeState.split(",")
        return [placeStateTuple[0], Number(placeStateTuple[1])];
    }));
}