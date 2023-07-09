import "./styles.css";
import {Calculator} from "./calculator.js";
import App from "./App.svelte";
import { appWindow } from '@tauri-apps/api/window'
const app = new App({
  target: document.getElementById("app"),
});
export default app;

const elResponse = document.getElementById('response');
const calc = new Calculator();

function numClick(num) {
  elResponse.value = calc.digitClick(Number(num));
  elResponse.style.fontSize = calc.autoResizeFontText(elResponse.value.length, elResponse.clientWidth) + 'px';
}

function eraseClick() {
  elResponse.value = calc.pointClick()
}

function signClick() {
  elResponse.value = calc.signClick()
}

function pointClick() {
  elResponse.value = calc.pointClick()
}

function actionClick(type) {
  document.getElementById('one_param').value = calc.actionClick(type)
}

function equalClick() {
  elResponse.value = calc.equalClick(); 
  document.getElementById('one_param').value = ""; 
  elResponse.style.fontSize = calc.autoResizeFontText(elResponse.value.length, elResponse.clientWidth) + 'px';
}

function funcMathClick(type) {
  elResponse.value = calc.funcMathClick(type); 
  elResponse.style.fontSize = calc.autoResizeFontText(elResponse.value.length, elResponse.clientWidth) + 'px';
}

function clearClick() {
  calc.clearClick(); 
  elResponse.value = "0";
}

function clearAllClick() {
  calc.clearAllClick(); 
  elResponse.value = ''; 
  document.getElementById('one_param').value = '';
}

for (let i = 0; i <= 9; i++) document.getElementById("num" + i).onclick = () => numClick(i)
document.getElementById('close').onclick = appWindow.close;
document.getElementById('drop_drag').ondblclick = appWindow.toggleMaximize;
document.getElementById('point').onclick = pointClick;
document.getElementById('addition').onclick = () => actionClick('addition');
document.getElementById('subtraction').onclick = () => actionClick('subtraction');
document.getElementById('division').onclick = () => actionClick('division');
document.getElementById('multiplication').onclick = () => actionClick('multiplication');
document.getElementById('mod').onclick = () => actionClick('mod');
document.getElementById('sign').onclick = signClick;
document.getElementById('equal').onclick = equalClick;
document.getElementById('sqrt').onclick = () => funcMathClick('sqrt');
document.getElementById('sqr').onclick = () => funcMathClick('sqr');
document.getElementById('onediv').onclick = () => funcMathClick('onediv');
document.getElementById('clear').onclick = clearClick;
document.getElementById('clearall').onclick = clearAllClick;
document.getElementById('erase').onclick = eraseClick;

document.onkeydown = function (event) {
  if (event.key >= '0' && event.key <= '9') {
    numClick(event.key)
  }
  else if (event.key == '.' || event.key == ',') {
    pointClick()
  }
  else if (event.key == '+') {
    actionClick('addition')
  }
  else if (event.key == '-') {
    actionClick('subtraction')
  }
  else if (event.key == '/') {
    actionClick('division')
  }
  else if (event.key == '*') {
    actionClick('multiplication')
  }
  else if (event.key == '%') {
    actionClick('mod')
  }
  else if (event.key == 'Backspace') {
    eraseClick()
  }
  else if (event.key == 'Enter') {
    equalClick()
  }
};

document.getElementById('settings').onclick = function () {
  if (document.getElementById("backdrop-menu").classList.contains("hide-backdrop") || document.getElementById("backdrop-menu").classList.contains("starthide")) {
    document.getElementById("backdrop-menu").classList.remove("starthide");
    document.getElementById("backdrop-menu").classList.remove("hide-backdrop");
    document.getElementById("backdrop-menu").classList.add("show-backdrop");

    document.getElementById("menu").classList.remove("starthide");
    document.getElementById("menu").classList.remove("hide-menu");
    document.getElementById("menu").classList.add("show-menu");
  }
  else {
    document.getElementById("backdrop-menu").classList.remove("show-backdrop");
    document.getElementById("backdrop-menu").classList.add("hide-backdrop");

    document.getElementById("menu").classList.remove("show-menu");
    document.getElementById("menu").classList.add("hide-menu");
  }
};