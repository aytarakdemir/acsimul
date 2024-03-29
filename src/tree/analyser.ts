import { PetriNet } from "../petri/petri-net";
import { TreeNode } from "./tree-node";
import { stringifyState } from "../util/state";

export class Analyser {

    private treeRoot: TreeNode;

    constructor(private petriNet: PetriNet, private targetPlaceState: Map<string, number>) {
        this.treeRoot = new TreeNode(petriNet.getPlaceState(), this.calculateFireablesList([...this.petriNet.transitions.keys()]));
        console.log("The tree",this.treeRoot);

        console.log([...this.petriNet.transitions.keys()]);

        console.log([...this.treeRoot.getTransitionStates().keys()]);

        console.log(this.treeRoot.state);

        // [...this.treeRoot.getTransitionStates().keys()].forEach((transitionKey: string) => {
        //     petriNet.fireTransition(transitionKey);
        //     const child = new TreeNode(petriNet.getPlaceState(), [...this.petriNet.transitions.keys()]);
        //     this.treeRoot.addChild(child);
        // })

        this.generateChildrenWithStates(this.treeRoot, petriNet);

        console.log("The tree",this.treeRoot);
        console.log(stringifyState(this.petriNet.getPlaceState()));

        


    }

    private generateChildrenWithStates(parent: TreeNode, petriNet: PetriNet) {
        
        [...parent.getTransitionStates().keys()].forEach((transitionKey: string) => {
            petriNet.setPlaceState(parent.state);
            petriNet.fireTransition(transitionKey);

            console.log("parent.statesFromRootUntilThisNode", parent.statesFromRootUntilThisNode);
            console.log(this.treeRoot);

            if (!parent.statesFromRootUntilThisNode.has(stringifyState(petriNet.getPlaceState()))) {

                const child = new TreeNode(petriNet.getPlaceState(), this.calculateFireablesList([...this.petriNet.transitions.keys()]));
                parent.addChild(child);
    
                this.generateChildrenWithStates(child, petriNet);
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