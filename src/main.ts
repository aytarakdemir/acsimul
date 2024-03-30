import './style.css'
import typescriptLogo from './assets/typescript.svg'
import { tokenize } from './parser/lexer';
import { PetriNet } from './petri/petri-net';
import { Analyser } from './tree/analyser';
import { hashmapifyState } from './util/state';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
<!--    
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
-->
    <h1>ACSimul</h1>
    <div class="ac-petri-input">
    <label for="textarea-petri-config">Enter the Petri net configuration</label>
    <textarea id="textarea-petri-config">
--place("p1", 2)
--place("p2", 0)
--place("p3", 0)
--place("p4", 0)
--in("i1","p1", 1)
--out("o1","p2", 1)
--transition("t1",[("i1")],[("o1")])
--in("i2","p2", 1)
--out("o2","p1", 1)
--transition("t2",[("i2")],[("o2")])
--in("i3","p2", 2)
--out("o3","p3", 2)
--transition("t3",[("i3")],[("o3")])
--in("i4","p2", 1)
--out("o4","p4", 1)
--transition("t4",[("i4")],[("o4")])
    </textarea>
    <label for="target-config">Enter the target state</label>
    <input name="target-config" id="target-config" value="p1,0_p2,0_p3,2_p4,0"/>
    <button id="btn-console">Generate</button>
    </div>
    <p class="read-the-docs">
    Check the browser console
    </p>
  </div>
`

const btn: HTMLButtonElement = document.getElementById("btn-console") as HTMLButtonElement;
const textAreaPetriConfig: HTMLTextAreaElement = document.getElementById("textarea-petri-config") as HTMLTextAreaElement;
const inputTargetConfig: HTMLInputElement = document.getElementById("target-config") as HTMLInputElement;

btn.addEventListener("click", () => {
  const tokens = tokenize(textAreaPetriConfig.value);

  const petriNet = new PetriNet(tokens);

  new Analyser(petriNet, hashmapifyState(inputTargetConfig.value));



  

})