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
--place("p1", 2)
--place("p2", 0)
--place("p3", 0)
--in("i1","p1", 1)
--out("o1","p2", 1)
--transition("t1",[("i1")],[("o1")])
--in("i2","p2", 1)
--out("o2","p1", 1)
--transition("t2",[("i2")],[("o2")])
--in("i3","p2", 2)
--out("o3","p3", 2)
--transition("t3",[("i3")],[("o3")])
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

  const analyser = new Analyser(petriNet, new Map<string, number>([["p1", 5],["p2", 5],["p3", 5]]));



  

})