let output = "0";
let start = true;

updateViewport();

function updateViewport() {
  document.querySelector('.calc-viewport')
    .innerHTML = output;
}

function handleNumber(key) {
  if (key == "AC") {
    output = "0";
    start = true;
  } else if (start) {
    output = key;
    start = false;
  } else {
    output += key;
  }
  updateViewport();
}

function handleOperation(key) {
  start = false;
  output += ` ${key} `;
  updateViewport();
}

function validOutput() {
  let pos = 0;
  while (pos < output.length) {
    let currNum = "";
    let countDot = 0;
    while (pos < output.length && output.charAt(pos) != ' ') {
      currNum += output.charAt(pos);
      if (output.charAt(pos) == '.') {
        countDot++;
      }
      pos++;
    }

    if (countDot > 1 || currNum == "") {
      return false;
    }

    if (pos == output.length) {
      break;
    }

    pos += 3;
  }
  return true;
}

function handleEnter() {
  console.log(output);

  if (!validOutput()) {
    output = "Error";
    start = true;
  } else {
    let answer = 0;
    let pos = 0;
    let currOp = "";
    while (pos < output.length) {
      let currNum = "";
      while (pos < output.length && output.charAt(pos) != ' ') {
        currNum += output.charAt(pos);
        pos++;
      }

      if (currOp !== "") {
        if (currOp === "+") {
          answer += Number(currNum);
        } else if (currOp === "-") {
          answer -= Number(currNum);
        } else if (currOp === "&times;") {
          answer *= Number(currNum);
        } else {
          answer /= Number(currNum);
        }
      } else {
        answer = Number(currNum);
      }

      if (pos == output.length) {
        break;
      }

      currOp = output.substr(pos + 1, 1);
      pos += 3;
    }
    
    if (!Number.isInteger(answer)) {
      answer = answer.toFixed(3);
    }

    output = answer;
    start = true;
  }
  updateViewport();
}

function handleKeydown(event) {
  const key = event.key;

  if (key === "Enter") {
    console.log("hi");
    handleEnter();
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    if (key === "*") {
      handleOperation("×");
    } else if (key === "/") {
      handleOperation("÷");
    } else {
      handleOperation(key);
    }
  } else if (/^[0-9]$/.test(key)) {
    handleNumber(key);
  } else if (key === "Backspace") {
    output = output.substr(0, output.length - 1);
    updateViewport();
  }
}

document.querySelectorAll('.calc-key')
  .forEach((element) => {
    if (element.classList.contains('calc-enter')) {
      element.addEventListener("click", () => handleEnter());
    } else if (element.classList.contains('calc-op')) {
      element.addEventListener("click", () => handleOperation(element.innerHTML));
    } else {
      element.addEventListener("click", () => handleNumber(element.innerHTML));
    }
  });

document.body.addEventListener("keydown", (event) => handleKeydown(event));