import { PetriNet } from "../petri/petri-net";
import { TreeNode } from "./tree-node";

export class Analyser {

    private treeRoot: TreeNode;

    constructor(private petriNet: PetriNet, private targetPlaceState: Map<string, number>) {
        this.treeRoot = new TreeNode(petriNet.getPlaceState(), this.calculateFireablesList([...this.petriNet.transitions.keys()]));

        console.log("Analyser: Transitions", [...this.petriNet.transitions.keys()]);
        console.log("Analyser: Fireable transitions", this.calculateFireablesList([...this.petriNet.transitions.keys()]));

        console.log(this.treeRoot);
        this.treeRoot.addChild(new TreeNode(new Map<string, number>([["p1", 3], ["p2", 32], ["p3", 1],]), this.calculateFireablesList([...this.petriNet.transitions.keys()])))
        this.treeRoot.children[0].addChild(new TreeNode(new Map<string, number>([["p1", 5], ["p2", 55], ["p3", 555],]), this.calculateFireablesList([...this.petriNet.transitions.keys()])))
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