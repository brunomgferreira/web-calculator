let memValue = "";
let inputValue = "0";

const memory = document.getElementById('memory');
const input = document.getElementById('input');

function clearInput(){
    inputValue  = "0";
}

function clearMem(op){
    if (op) memValue = "";
    else if (memValue[memValue.length-1] == '=') {
        memValue = "";
    }
}

function clear(){
    clearInput();
    clearMem(true);
}

function deleteAll() {
    inputValue  = inputValue.slice(0, inputValue.length-1);
    if (inputValue.length == 0);
}

function updateScreen() {
    memory.textContent = memValue;
    input.textContent = inputValue;
}

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', readInput);
});


function divide(){
    if (memValue[memValue.length-1] == '='){
        memValue = inputValue + " ÷ ";
    }
    else {
        memValue += inputValue;
        memValue += " ÷ "
        op = true;
        clearMem(false);
    }
}

function multiply(){
    if (memValue[memValue.length-1] == '='){
        memValue = inputValue + " x ";
    }
    else {
        memValue += inputValue;
        memValue += " x "
        op = true;
        clearMem(false);
    }
}

function subtract(){
    if (memValue[memValue.length-1] == '='){
        memValue = inputValue + " - ";
    }
    else {
        memValue += inputValue;
        memValue += " - "
        op = true;
        clearMem(false);
    }
}

function add(){
    if (memValue[memValue.length-1] == '='){
        memValue = inputValue + " + ";
    }
    else {
        memValue += inputValue;
        memValue += " + "
        op = true;
        clearMem(false);
    }
}

function equal(){
    if (memValue[memValue.length-1] == '='){
        return;
    }
    else {
        memValue += inputValue;
        memValue += " ="
        op = false;
    }
}

function dot(){
    if (!inputValue.includes('.')) inputValue += '.';
    op = false;
}

let op = false;
function readInput(e) {
    let value = e.target.id;

    if (value == "divide") {
        divide();
    }
    else if (value == "multiply") {
        multiply();
    }
    else if (value == "subtract") {
        subtract();
    }
    else if (value == "add") {
        add();
    }
    else if (value == "equal") {
        equal();
    }
    else if (value == "dot") {
        dot();
    }
    else if (value == "delete") {
        deleteAll();
    }
    else if (value == "clear") {
        clear();
    }
    else {
        if (inputValue == "0" && value == "0") clearInput();
        else if (inputValue == "0" || op) inputValue = value;
        else inputValue += value;
        op = false;
    }
    updateScreen();
}

window.onload = () => {
    updateScreen();
}
