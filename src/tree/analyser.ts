import { PetriNet } from "../petri/petri-net";
import { TreeNode } from "./tree-node";
import { stringifyState } from "../util/state";

export class Analyser {

    private _treeRoot: TreeNode;

    private _foundPaths: Map<string, number>[][];

    constructor(private petriNet: PetriNet, private targetPlaceState: Map<string, number>) {
        this._treeRoot = new TreeNode(petriNet.getPlaceState(), this.calculateFireablesList([...this.petriNet.transitions.keys()]));


        console.log("The tree with all the possible paths taken",this._treeRoot);

        this._foundPaths = [];
        this.generateChildrenWithStates(this._treeRoot, targetPlaceState, petriNet);

    }

    get foundPaths(): Map<string, number>[][] {
        return structuredClone(this._foundPaths);
    }

    private generateChildrenWithStates(parent: TreeNode, target: Map<string, number>, petriNet: PetriNet) {
        
        [...parent.getTransitionStates().keys()].forEach((transitionKey: string) => {
            petriNet.setPlaceState(parent.state);
            petriNet.fireTransition(transitionKey);


            if (!parent.statesFromRootUntilThisNode.has(stringifyState(petriNet.getPlaceState()))) {

                
                const child = new TreeNode(petriNet.getPlaceState(), this.calculateFireablesList([...this.petriNet.transitions.keys()]));
                parent.addChild(child);

                if (stringifyState(target) === stringifyState(petriNet.getPlaceState())) {
                    this._foundPaths.push(getStateRecursive(child));
                }
                this.generateChildrenWithStates(child, target, petriNet);
                
            }
        })
    }

    private calculateFireablesList(transitionList: string[]): string[] {
        const fireablesList = transitionList.map((key: string) => {
            return this.petriNet.isTransitionFireable(key) ? key : "-";
        });

        return fireablesList.filter((key: string) => {
            return key !== "-";
        });
    };
}


function getStateRecursive(node: TreeNode): Map<string, number>[] {
    let statesFromTop = [node.state];
    if (node.parent)
        statesFromTop = [...getStateRecursive(node.parent), ...statesFromTop];
    return statesFromTop;
}