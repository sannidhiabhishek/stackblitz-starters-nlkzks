// Force variables start
let switchToForce = false;
//var calculatorBehavoiour = "force";
var count = 0;
let numbers = ['0','1','2','3','4','5','6','7','8','9'];
let operator = ['+', '-', '*', '/'];
let forceNumber = localStorage.getItem('CalBaseForceNumber');
let achieveNumber = 0;
let achieveNumber_array = [];
// Force variables end
const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');
let input = '';
let temp = '';
var equal_clicked = false;
//if(calculatorBehavoiour == "force"){
for (let key of keys) {
  const value = key.dataset.key;
  key.addEventListener('click', () => {
    if (value == 'clear') {
      input = '';
      temp ='';
      display_input.innerHTML = '';
      display_output.innerHTML = '';
    } else if (value == 'backspace') {
      input = input.slice(0, -1);
      display_input.innerHTML = CleanInput(input);
    } else if (value == '=') {
      if(input.charAt(input.length -1) == "("){
        showSnackbar('Invalid format used.')
      }
      let checkInputForbrackets = openBracketHandling(input);
      let result = eval(PerpareInput(checkInputForbrackets));
      //let result = evaluate(PerpareInput(input));
      // input and display_input.innerHTML are newly added. display_input.innerHTML is removed
      input = String(result);
      display_input.innerHTML = CleanOutput(input);
      temp = input;
      equal_clicked = true;
      if(switchToForce == false){
        switchToForce = true;
      }else{
        switchToForce = false;
      }
    } else if (value == 'brackets') {
      if (
        input.indexOf('(') == -1 ||
        (input.indexOf('(') != -1 &&
          input.indexOf(')') != -1 &&
          input.lastIndexOf('(') < input.lastIndexOf(')'))
      ) {
        input += '(';
      } else if (
        (input.indexOf('(') != -1 && input.indexOf(')') == -1) ||
        (input.indexOf('(') != -1 &&
          input.indexOf(')') != -1 &&
          input.lastIndexOf('(') > input.lastIndexOf(')'))
      ) {
        input += ')';
      }

      display_input.innerHTML = CleanInput(input);
    } else {
      if(input == "" && operator.includes(value)){
        showSnackbar('Invalid format used.');
      }else{
        if (ValidateInput(value)) {
          // Force code start
          if(switchToForce == true && numbers.includes(value) && typeof forceNumber !== 'undefined' && forceNumber !== null && forceNumber !== ''){
            let result = input;
            let secondvalue = parseInt(result);
            achieveNumber = parseInt(forceNumber)-secondvalue;
            achieveNumber_array = achieveNumber.toString().split("");
            if(count < achieveNumber_array.length){
              input += achieveNumber_array[count];
              display_input.innerHTML = CleanInput(input);
              count++;
            }
          }
          // Force code end
          else{
            input += value;
            display_input.innerHTML = CleanInput(input);
          }
        }
      }
    }
    //console.log("Inner value :"+ input)
  });
}
//}

/*if(calculatorBehavoiour == "normal"){
for (let key of keys) {
  const value = key.dataset.key;
  key.addEventListener('click', () => {
    if (value == 'clear') {
      input = '';
      temp ='';
      display_input.innerHTML = '';
      display_output.innerHTML = '';
    } else if (value == 'backspace') {
      input = input.slice(0, -1);
      display_input.innerHTML = CleanInput(input);
    } else if (value == '=') {
      let result = eval(PerpareInput(input));
      //let result = evaluate(PerpareInput(input));
      // input and display_input.innerHTML are newly added. display_input.innerHTML is removed
      input = String(result);
      display_input.innerHTML = CleanOutput(input);
      temp = input;
      equal_clicked = true;
    } else if (value == 'brackets') {
      if (
        input.indexOf('(') == -1 ||
        (input.indexOf('(') != -1 &&
          input.indexOf(')') != -1 &&
          input.lastIndexOf('(') < input.lastIndexOf(')'))
      ) {
        input += '(';
      } else if (
        (input.indexOf('(') != -1 && input.indexOf(')') == -1) ||
        (input.indexOf('(') != -1 &&
          input.indexOf(')') != -1 &&
          input.lastIndexOf('(') > input.lastIndexOf(')'))
      ) {
        input += ')';
      }

      display_input.innerHTML = CleanInput(input);
    } else {
      if (ValidateInput(value)) {
        input += value;
        display_input.innerHTML = CleanInput(input);     
      }
    }
    //console.log("Inner value :"+ input)
  });
}
}*/
 
function CleanInput(input) {
  let input_array = input.split('');
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == '*') {
      input_array[i] = ` <span class="operator">&#215</span> `;
    } else if (input_array[i] == '/') {
      input_array[i] = ` <span class="operator">&#247;</span> `;
    } else if (input_array[i] == '+') {
      input_array[i] = ` <span class="operator">+</span> `;
    } else if (input_array[i] == '-') {
      input_array[i] = ` <span class="operator">-</span> `;
    } else if (input_array[i] == '(') {
      input_array[i] = `<span class="brackets">(</span>`;
    } else if (input_array[i] == ')') {
      input_array[i] = `<span class="brackets">)</span>`;
    } else if (input_array[i] == '%') {
      input_array[i] = `<span class="percent">%</span>`;
    }
  }

  return input_array.join('');
}

function CleanOutput(output) {
  let output_string = output.toString();
  let decimal = output_string.split('.')[1];
  output_string = output_string.split('.')[0];

  let output_array = output_string.split('');

  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ',');
    }
  }

  if (decimal) {
    output_array.push('.');
    output_array.push(decimal);
  }

  return output_array.join('');
}

function ValidateInput(value) {
  let last_input = input.slice(-1);
  let operators = ['+', '-', '*', '/'];

  if (value == '.' && last_input == '.') {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

function PerpareInput(input) {
  let input_array = input.split('');

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == '%') {
      input_array[i] = '/100';
    }
  }
  //Added below and commented is removed
  let prepareBrackate = BracketHandling(input_array.join(''));
  //console.log(prepareBrackate)
  return prepareBrackate;
  //return input_array.join('');
}

// Required for android
function ValidateTempInput(value) {
  let last_input = input.slice(-1);
  let operators = ['+', '-', '*', '/'];

  if (value == '.' && last_input == '.') {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return true;
    } else {
      return false;
    }
  }

  return true;
}
for (let key of keys) {
  const value = key.dataset.key;
  key.addEventListener('click', () => {
    if(ValidateTempInput(value))
    {
      if(value != 'clear' && value != '=' && value !='backspace' && value != 'brackets'){
        temp+= value;
        //console.log("Output Inside if value :"+ temp)
      }
    }
    if (value == 'backspace') {
      temp = temp.slice(0, -1);
      display_output.innerHTML = CleanInput(temp);
    }
  if(temp.slice(-1)=='+' || temp.slice(-1)=='-' || temp.slice(-1)=='*' || temp.slice(-1)=='/'){
    display_output.innerHTML = "";
  }else{
    let tempResult = '';
    let checkInputForbrackets = openBracketHandling(input);
    tempResult = eval(PerpareInput(checkInputForbrackets));
    //let tempResult = evaluate(PerpareInput(input));
    display_output.innerHTML = CleanOutput(tempResult);
  }
  if(equal_clicked == true){
    display_output.innerHTML = ""
    equal_clicked = false;
  }
  });
}

// Brackets function
function BracketHandling(value){
  //Open Bracket Handling
  let input = value;
  let input_array = input.split('');
  let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let operators = ['+', '-', '*', '/'];
  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == '(' && numbers.includes(input_array[i-1])) {
      input_array = [...input_array.slice(0,i), '*', ...input_array.slice(i)];
    }
  }
  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == ')' && numbers.includes(input_array[i-1]) && !operators.includes(input_array[i+1]) && i != input_array.length-1) {
       input_array = [...input_array.slice(0,i+1), '*', ...input_array.slice(i+1)];
    }
  }
  //console.log(input_array);
  return input_array.join('');
}
function openBracketHandling(value){
  let value_array = value.split('');
  if(value_array.lastIndexOf('(') > value_array.lastIndexOf(')') && numbers.includes(value_array[value_array.length-1])){ // )(
    value_array.push(')')
  }
  return value_array.join('');
}

//brackets long press
$(function(){
  $( "#brackets" ).bind( "taphold", tapholdHandler );
 
  function tapholdHandler( event ){
    $("Div.HiddenScreen").css("z-index","1000");
    //showSnackbar("Brackets Long Press");
  }
});

//dot long press
$(function(){
  $( "#dot" ).bind( "taphold", tapholdHandler );
 
  function tapholdHandler( event ){
    window.location.replace("normal_and.html")
    //showSnackbar("dot Long Press");
  }
});

//snackbar
function showSnackbar(message) {
    var x = document.getElementById("snackbar");
    x.innerHTML = message;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
