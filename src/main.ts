import './style.css'
import typescriptLogo from './assets/typescript.svg'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>ACSimul</h1>
    <p class="read-the-docs">
    Check the browser console
    </p>
    <button id="btn-console">Debug</button>
  </div>
`

const btn: HTMLButtonElement = document.getElementById('btn-console') as HTMLButtonElement;

btn.addEventListener("click", () => {
  console.log("debug");
})