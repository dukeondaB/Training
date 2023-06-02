let startTotal = 0; // Biến lưu giá trị tổng ban đầu
let buffer = "0"; // Biến lưu giá trị hiện tại trên màn hình
let previousOperator; // Biến lưu toán tử trước đó

const screen = document.querySelector(".screen"); // Phần tử màn hình hiển thị

function buttonClick(val) {
  if (isNaN(val)) {
    // Nếu giá trị không phải là một số, gọi hàm handleSymbol
    handleSymbol(val);
  } else {
    // Nếu giá trị là một số, gọi hàm handleNumber
    handleNumber(val);
  }
  screen.innerText = buffer; // Cập nhật giá trị trên màn hình
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      // Xóa bộ đệm và reset startTotal về 0
      buffer = "0";
      startTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        // Nếu không có toán tử trước đó, không làm gì cả
        return;
      }
      // Thực hiện phép tính và lưu kết quả vào buffer
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = startTotal.toString();
      startTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        // Nếu buffer chỉ có một ký tự, reset buffer về 0
        buffer = "0";
      } else {
        // Loại bỏ ký tự cuối cùng khỏi buffer
        buffer = buffer.slice(0, -1);
      }
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      // Xử lý các toán tử +, -, ×, ÷
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    // Nếu buffer là "0", không làm gì cả
    return;
  }

  const intBuffer = parseInt(buffer);

  if (startTotal === 0) {
    // Nếu startTotal là 0, gán intBuffer cho startTotal
    startTotal = intBuffer;
  } else {
    // Thực hiện phép tính với toán tử trước đó
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    // Thực hiện phép cộng
    startTotal += intBuffer;
  } else if (previousOperator === "−") {
    // Thực hiện phép trừ
    startTotal -= intBuffer;
  } else if (previousOperator === "×") {
    // Thực hiện phép nhân
    startTotal *= intBuffer;
  } else if (previousOperator === "÷") {
    // Thực hiện phép chia
    startTotal /= intBuffer;
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    // Nếu buffer là "0", gán numberString vào buffer
    buffer = numberString;
  } else {
    // Nếu buffer khác "0", nối numberString vào buffer
    buffer += numberString;
  }
}

function init() {
  // Gắn sự kiện click cho các nút trong máy tính
  document.querySelector('.calculator-buttons').addEventListener('click', function(event) { 
    const clickedButton = event.target.innerText;
    buttonClick(clickedButton);
  });
}

init();