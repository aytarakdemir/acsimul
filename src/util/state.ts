
export function stringifyState(state: Map<string, number>): string {
    return [...state].join('&');
}