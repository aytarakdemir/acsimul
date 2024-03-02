import './style.css'
import typescriptLogo from './assets/typescript.svg'
import { tokenize } from './parser/lexer';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>ACSimul</h1>
    <div class="ac-petri-input">
    <label>Enter the Petri net configuration</label>
    <textarea id="textarea-petri-config"></textarea>
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
  console.log(textAreaPetriConfig.value);       

  console.log(tokenize(textAreaPetriConfig.value));
})