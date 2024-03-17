import './style.css'
import typescriptLogo from './assets/typescript.svg'
import { tokenize } from './parser/lexer';
import { PetriNet } from './petri/petri-net';
import { Analyser } from './tree/analyser';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
<!--    
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
-->
    <h1>ACSimul</h1>
    <div class="ac-petri-input">
    <label>Enter the Petri net configuration</label>
    <textarea id="textarea-petri-config">
--out("o1","p3", 1)
--place("p1", 4)
--place("p2", 2)
--place("p3", 0)
--in("i1","p1", 2)
--in("i2","p2", 1)
--transition("t1",[("i1")("i2")],[("o1")])
--in("i3","p3", 1)
--out("o2","p1", 2)
--transition("t2",[("i3")],[("o2")])
    </textarea>
    <button id="btn-console">Generate</button>
    </div>
    <p class="read-the-docs">
    Check the browser console
    </p>
  </div>
`

const btn: HTMLButtonElement = document.getElementById("btn-console") as HTMLButtonElement;
const textAreaPetriConfig: HTMLTextAreaElement = document.getElementById("textarea-petri-config") as HTMLTextAreaElement;

btn.addEventListener("click", () => {
  const tokens = tokenize(textAreaPetriConfig.value);

  const petriNet = new PetriNet(tokens);
  console.log("State", petriNet.getPlaceState());
  console.log("State", petriNet.getPlaceState());

  const analyser = new Analyser(petriNet, new Map<string, number>([["p1", 5],["p2", 5],["p3", 5]]));
  
  // petriNet.fireTransition("t1");
  // const root = new TreeNode(petriNet.getPlaceState());
  
  // petriNet.fireTransition("t1");
  // root.addChild(new TreeNode(petriNet.getPlaceState()));
  
  // petriNet.fireTransition("t1");
  
  // root.addChild(new TreeNode(petriNet.getPlaceState()));
  // root.children[0].addChild(new TreeNode(petriNet.getPlaceState()));
  
  // console.log("The tree", root);
  
  // petriNet.fireTransition("t2");
  // console.log(petriNet.getPlaceState());
  
  // petriNet.setPlaceState(new Map<string, number>([["p1", 5],["p2", 5],["p3", 0]]));
  // console.log(petriNet.getPlaceState());


  

})