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

      if (currOp != "") {
        if (currOp == "+") {
          answer += Number(currNum);
        } else if (currOp == "-") {
          answer -= Number(currNum);
        } else if (currOp == "&times;") {
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
    output = answer;
    start = true;
  }
  updateViewport();
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