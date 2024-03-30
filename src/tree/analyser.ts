import { PetriNet } from "../petri/petri-net";
import { TreeNode } from "./tree-node";
import { stringifyState } from "../util/state";

export class Analyser {

    private treeRoot: TreeNode;

    constructor(private petriNet: PetriNet, private targetPlaceState: Map<string, number>) {
        this.treeRoot = new TreeNode(petriNet.getPlaceState(), this.calculateFireablesList([...this.petriNet.transitions.keys()]));
        // console.log("The tree",this.treeRoot);

        // console.log([...this.petriNet.transitions.keys()]);

        // console.log([...this.treeRoot.getTransitionStates().keys()]);

        // console.log(this.treeRoot.state);

        this.generateChildrenWithStates(this.treeRoot, targetPlaceState, petriNet);

        console.log("The tree",this.treeRoot);

        


    }

    private generateChildrenWithStates(parent: TreeNode, target: Map<string, number>, petriNet: PetriNet) {
        
        [...parent.getTransitionStates().keys()].forEach((transitionKey: string) => {
            petriNet.setPlaceState(parent.state);
            petriNet.fireTransition(transitionKey);


            if (!parent.statesFromRootUntilThisNode.has(stringifyState(petriNet.getPlaceState()))) {

                
                const child = new TreeNode(petriNet.getPlaceState(), this.calculateFireablesList([...this.petriNet.transitions.keys()]));
                parent.addChild(child);

                if (stringifyState(target) === stringifyState(petriNet.getPlaceState())) {
                    // console.log(child.state)
                    printStateRecursive(child);
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


function printStateRecursive(node: TreeNode) {
    console.log(stringifyState(node.state));
    if (node.parent)
        printStateRecursive(node.parent);
}