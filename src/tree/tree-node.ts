
export class TreeNode {
    private _children: TreeNode[] = [];
    public parent: TreeNode | null = null;

    constructor(private _state: Map<string, number>) {
    }

    get state(): Map<string, number> {
        return this._state;
    }

    get children(): TreeNode[] {
        return this._children;
    }

    public addChild(node: TreeNode): void {
        node.parent = this;
        this._children.push(node);
    }

    public isLeaf(): boolean {
        return this._children.length === 0;
    }
}