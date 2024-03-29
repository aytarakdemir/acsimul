import { PetriNet } from "../petri/petri-net";
import { TreeNode } from "./tree-node";

export class Analyser {

    private treeRoot: TreeNode;

    constructor(private petriNet: PetriNet, private targetPlaceState: Map<string, number>) {
        this.treeRoot = new TreeNode(petriNet.getPlaceState(), this.calculateFireablesList([...this.petriNet.transitions.keys()]));
        console.log("The tree",this.treeRoot);

        console.log([...this.treeRoot.getTransitionStates().keys()]);

        
        

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