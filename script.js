let memValue = "";
let inputValue = "0";

const memory = document.getElementById('memory');
const input = document.getElementById('input');

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {button.addEventListener('click', readInput);});

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(e){
    const keys = ['0','1','2','3','4','5','6','7','8','9','/','*','+','-','=','.'];
    var value = "";
    if(e.key === '0') value = '0';
    else if(e.key === '1') digits('1');
    else if(e.key === '2') digits('2');
    else if(e.key === '3') digits('3');
    else if(e.key === '4') digits('4');
    else if(e.key === '5') digits('5');
    else if(e.key === '6') digits('6');
    else if(e.key === '7') digits('7');
    else if(e.key === '8') digits('8');
    else if(e.key === '9') digits('9');
    else if(e.key === '/') equation('÷');
    else if(e.key === '*') equation('x');
    else if(e.key === '+') equation('+');
    else if(e.key === '-') equation('-');
    else if(e.key === '=' || e.key === 'Enter') equal();
    else if(e.key === '.') dot();
    else if(e.key === 'Backspace') dlt();
}

function clearInput(){
    inputValue  = "0";
    updateScreen();
}

function clearMem(op){
    // lastInputIsOperator used to force clear the memory
    if (op) memValue = ""; 
    else if (memValue[memValue.length-1] == '=') {
        memValue = "";
    }
    updateScreen();
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
    updateScreen();
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
        digits(value);
    }
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
    updateScreen();
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
    updateScreen();
}

function dot(){
    if (!inputValue.includes('.')) inputValue += '.';
    lastInputIsOperator = false;
    updateScreen();
}

function calc(){
    var expression = memValue.slice(0, memValue.length - 1);
    expression = expression.replace(/x/g,'*');
    expression = expression.replace(/÷/g,'/');
    inputValue = eval(expression);
    updateScreen();
}

function digits(value){
    if (inputValue == "0" && value == "0") clearInput();
    else if (inputValue == "0" || lastInputIsOperator) inputValue = value;
    else inputValue += value;
    lastInputIsOperator = false;
    updateScreen();
}

window.onload = () => {
    updateScreen();
}
