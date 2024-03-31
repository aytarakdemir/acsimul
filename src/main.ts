import './style.css'
import typescriptLogo from './assets/typescript.svg'
import { IToken, tokenize } from './parser/lexer';
import { PetriNet } from './petri/petri-net';
import { Analyser } from './tree/analyser';
import { hashmapifyState, stringifyState } from './util/state';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main>
<!--    
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
-->
    <svg class="logo vanilla" aria-label="ACSimul logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="#a594f9"><path d="M22 14.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0M11.5 13a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m4.5 6.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0"/><path d="m4 15l.008-.03A13.242 13.242 0 0 1 4 14.5C4 7.596 9.373 2 16 2s12 5.596 12 12.5c0 .16-.003.318-.009.476L28 15v3c0 5.799-4 12-12 12S4 23.799 4 18c0 0 .022-3.08 0-3m23 1c0-5.523-5.189-10-11-10S5 10.477 5 16s5.189 10 11 10s11-4.477 11-10"/></g></svg>
    <h1>ACSimul</h1>

    <div class="ac-petri-console">
      <div class="ac-petri-input">
        <label for="textarea-petri-config">Enter the Petri net configuration</label>
        <textarea class="input-textarea" id="textarea-petri-config">
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
        <input name="target-config" id="target-config" value="p1,0--p2,0--p3,0--p4,2"/>
        <button id="btn-console">Generate</button>
      </div>
      <div class="ac-output-wrapper" id="ac-out">
        <label for="textarea-petri-out">Result</label>
        <textarea class="output-textarea" disabled id="textarea-petri-out"></textarea>
      </div>
    </div>
    <p class="read-the-docs">Check the browser console for detailed logs</p>
  </div>
  <div class="footer">
    <a class="github-link" href="https://github.com/aytarakdemir/acsimul" target="_blank">
      <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100" class="github-logo" alt="GitHub logo" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#fff"/></svg>
      ACSimul repository on GitHub
    </a> 

  </main>
`

const btn: HTMLButtonElement = document.getElementById("btn-console") as HTMLButtonElement;
const textAreaPetriConfig: HTMLTextAreaElement = document.getElementById("textarea-petri-config") as HTMLTextAreaElement;
const inputTargetConfig: HTMLInputElement = document.getElementById("target-config") as HTMLInputElement;
const out: HTMLTextAreaElement = document.getElementById("textarea-petri-out") as HTMLTextAreaElement;

btn.addEventListener("click", () => {
  let tokens: IToken[] = [];
  out.innerText = "";
  out.style.color = "#bbbbbb"
  try {
    tokens = tokenize(textAreaPetriConfig.value);
    
  } catch(error: unknown) {
    console.log(error);
    out.appendChild(document.createTextNode(`${error}`));
    out.style.color = "#ff4444"

  }

  const petriNet = new PetriNet(tokens);

  const analyser = new Analyser(petriNet, hashmapifyState(inputTargetConfig.value));

  if (analyser.foundPaths.length > 0)
    console.log(`Searching for the state ${inputTargetConfig.value}`)
  console.log(`All found paths`, analyser.foundPaths);

  const foundAsString = analyser.foundPaths.map((foundPath: Map<string, number>[]) => {
    const foundPathString = foundPath.map((stepState: Map<string, number>, index: number) => {
      return `${index} - ${stringifyState(stepState)}`;
    }).join("\n");
    return foundPathString + "\n\n";
  })

  const content = document.createTextNode(`Searching for the state ${inputTargetConfig.value}\n`);
  out.appendChild(content);



  foundAsString.forEach((path: string) => {
    out.appendChild(document.createTextNode("Path found:\n"));
    const content = document.createTextNode(path);
    out.appendChild(content);
  })

  

})