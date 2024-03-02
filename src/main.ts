import './style.css'
import typescriptLogo from './assets/typescript.svg'
import { Transition } from './petri/transition';
import { OutArrow, InArrow } from './petri/arrow';
import { Place } from './petri/place';

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


const p1 = new Place(4);
const p2 = new Place(2);
const p3 = new Place(0);
let places = {
  p1: p1.tokenCount,
  p2: p2.tokenCount,
  p3: p3.tokenCount,
};

console.table(places);


const arrowsOfT1 = [
  new InArrow(2, p1),
  new InArrow(1, p2),
  new OutArrow(1, p3),
];
const t1 = new Transition(arrowsOfT1);


const arrowsOfT2 = [
  new InArrow(2, p3)
];
const t2 = new Transition(arrowsOfT2)

if (t1.isFireable()) {
  console.log("Firing Transition 1...")
  t1.fire();
} else {
  console.log("Transition 1 is not fireable.");
}

if (t1.isFireable()) {
  console.log("Firing Transition 1...")
  t1.fire();
} else {
  console.log("Transition 1 is not fireable.");
}

if (t2.isFireable()) {
  console.log("Firing Transition 2...")
  t2.fire();
} else {
  console.log("Transition 2 is not fireable.");
}

places = {
  p1: p1.tokenCount,
  p2: p2.tokenCount,
  p3: p3.tokenCount,
};

console.table(places);