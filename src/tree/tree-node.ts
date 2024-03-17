
export class TreeNode {
    private _children: TreeNode[] = [];
    public parent: TreeNode | null = null;
    private fireableTransitionStates: Map<string, boolean>; // Non fireables are not included in this hashmap as they are not necessary.

    public statesFromRootUntilThisNode: Set<Map<string, number>> = new Set<Map<string, number>>();

    constructor(private _state: Map<string, number>, transitionKeys: string[]) {
        this.fireableTransitionStates = new Map<string, boolean>(this.generateTransitionStates(transitionKeys));
        this.statesFromRootUntilThisNode.add(this._state);
    }

    get state(): Map<string, number> {
        return this._state;
    }

    get children(): TreeNode[] {
        return this._children;
    }

    private generateTransitionStates(transitionKeys: string[]) : [string, boolean][] {
        return transitionKeys.map((key: string) => {
            return [key, false];
        });
    };

    public markTransitionAsFired(transitionKey: string) {
        this.fireableTransitionStates.set(transitionKey, true);
    }

    public getTransitionStates(): ReadonlyMap<string, boolean> {
        return this.fireableTransitionStates
    };

    public addChild(node: TreeNode): void {
        node.parent = this;
        [...this.statesFromRootUntilThisNode.values()].forEach((keys: Map<string, number>) => {
            node.statesFromRootUntilThisNode.add(keys);
            
        });
        this._children.push(node);
    }

    public isLeaf(): boolean {
        return this._children.length === 0;
    }
}