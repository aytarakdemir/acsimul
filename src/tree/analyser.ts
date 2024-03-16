import { PetriNet } from "../petri/petri-net";
import { TreeNode } from "./tree-node";

export class Analyser {

    private treeRoot: TreeNode;

    constructor(private petriNet: PetriNet) {
        this.treeRoot = new TreeNode(petriNet.getPlaceState(), this.calculateFireablesList([...this.petriNet.transitions.keys()]));

        console.log("Analyser: Transitions", [...this.petriNet.transitions.keys()]);
        console.log("Analyser: Fireable transitions", this.calculateFireablesList([...this.petriNet.transitions.keys()]));

        console.log(this.treeRoot);
        console.log("transition states", this.treeRoot.getTransitionStates());

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