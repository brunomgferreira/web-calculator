let memValue = "";
let inputValue = "0";

const memory = document.getElementById('memory');
const input = document.getElementById('input');

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {button.addEventListener('click', readInput);});

function clearInput(){
    inputValue  = "0";
}

function clearMem(op){
    // lastInputIsOperator used to force clear the memory
    if (op) memValue = ""; 
    else if (memValue[memValue.length-1] == '=') {
        memValue = "";
    }
}

function clear(){
    // clear screen 
    clearInput();
    clearMem(true);
}

function dlt() {
    // deletes the last input value
    if (!lastInputIsOperator) inputValue = inputValue.substring(0, inputValue.length-1);
    if (inputValue.length == 0);
}

function updateScreen() {
    memory.textContent = memValue;
    input.textContent = inputValue;
}

let lastInputIsOperator = false;

function readInput(e) {
    let value = e.target.id;

    if (value == "divide") {
        equation('÷');
    }
    else if (value == "multiply") {
        equation('x');
    }
    else if (value == "subtract") {
        equation('-');
    }
    else if (value == "add") {
        equation('+');
    }
    else if (value == "equal") {
        equal();
    }
    else if (value == "dot") {
        dot();
    }
    else if (value == "delete") {
        dlt();
    }
    else if (value == "clear") {
        clear();
    }
    else {
        if (inputValue == "0" && value == "0") clearInput();
        else if (inputValue == "0" || lastInputIsOperator) inputValue = value;
        else inputValue += value;
        lastInputIsOperator = false;
    }
    updateScreen();
}

function equation(operator){
    if (memValue[memValue.length-1] == '='){
        memValue = inputValue + " " + operator + " ";
    }
    else if (inputValue) {
        memValue = memValue + inputValue + " " + operator + " ";
        clearMem(false);
    }
    lastInputIsOperator = true;
}

function equal(){
    if (memValue[memValue.length-1] == '='){
        return;
    }
    else if (inputValue) {
        memValue += inputValue;
        memValue += " ="
        lastInputIsOperator = true;
        calc();
    }
}

function dot(){
    if (!inputValue.includes('.')) inputValue += '.';
    lastInputIsOperator = false;
}

function calc(){
    var expression = memValue.slice(0, memValue.length - 1);
    expression = expression.replace(/x/g,'*');
    expression = expression.replace(/÷/g,'/');
    inputValue = eval(expression);
}

window.onload = () => {
    updateScreen();
}
