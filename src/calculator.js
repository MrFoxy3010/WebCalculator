const maxCountSymbols = 20;
const startFontSize = 30;
const minCountSymbols = 15;
const getPointLength = x => ((x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0));


export class Calculator {
  constructor() {
    this.action = "";
    this.one_param = "";
    this.two_param = "";
    this.text_response = "";
    this.response = 0;
    this.type = "ordinary";
    this.memory = [0];
    this.memory_index = 0;
  }
  memorySet(num) {
    this.memory_index++;
    this.memory[this.memory_index] = parseFloat(num);
  }
  memoryRead() {
    return this.memory[this.memory_index];
  }
  memoryClear() {
    this.memory = [0];
  }
  memorySub(num) {
    this.memory[this.memory_index] -= parseFloat(num);
  }
  memoryAdd(num) {
    this.memory[this.memory_index] += parseFloat(num);
  }
  digitClick(index) {
    if (this.text_response.length <= maxCountSymbols + 1 || this.text_response.includes('e')) {
      if (this.text_response == '0') {
        this.text_response = index.toString();
      }
      else if (this.action == '') {
        this.text_response += index;
        if (this.text_response.length > maxCountSymbols) {
          this.text_response = this.text_response.substring(0, this.text_response.length - 1);
        }
      }
      else if (this.two_param == '') {
        this.two_param = index.toString();
        this.text_response = index.toString();
      }
      else if (this.text_response.includes('e')) {
        this.two_param = index.toString();
        this.text_response = index.toString();
      }
      else {
        this.two_param += index;
        this.text_response += index;
        if (this.text_response.length > maxCountSymbols) {
          this.two_param = this.two_param.substring(0, this.two_param.length - 1);
          this.text_response = this.text_response.substring(0, this.text_response.length - 1);
        }
      }
    }
    return this.text_response;
  }
  pointClick() {
    let count_point = this.text_response.split('.').length - 1;
    if (this.one_param === '' && count_point == 0) {
      this.text_response += '.';
    }
    else if (this.two_param !== '') {
      let count_point = this.two_param.split('.').length - 1;
      if (count_point == 0) {
        this.text_response += '.';
        this.two_param += '.';
      }
    }
    return this.text_response;
  }
  actionClick(type) {
    if (this.two_param != "") {
      switch (this.action) {
        case 'addition':
          this.response = parseFloat(this.one_param) + parseFloat(this.two_param);
          break;
        case 'subtraction':
          this.response = parseFloat(this.one_param) - parseFloat(this.two_param);
          break;
        case 'division':
          this.response = parseFloat(this.one_param) / parseFloat(this.two_param);
          break;
        case 'multiplication':
          this.response = parseFloat(this.one_param) * parseFloat(this.two_param);
          break;
        case 'mod':
          this.response = parseFloat(this.one_param) % parseFloat(this.two_param);
          break;
      }
    }
    if (this.action != "" && this.two_param != "") {
      this.one_param = this.response.toString();
      this.text_response = this.one_param;
    }
    else {
      this.one_param = this.text_response;
    }
    this.two_param = "";
    if (this.action == "" && this.one_param != "") {
      switch (type) {
        case 'addition':
          this.text_response += "+";
          break;
        case 'subtraction':
          this.text_response += "-";
          break;
        case 'division':
          this.text_response += "÷";
          break;
        case 'multiplication':
          this.text_response += "×";
          break;
        case 'mod':
          this.text_response += "%";
          break;
      }
      this.action = type;
    }
    return this.text_response;
  }
  signClick() {
    if (this.text_response[0] != "-") {
      this.text_response = "-" + this.text_response;
    }
    else {
      this.text_response = this.text_response.slice(1);
    }
    return this.text_response;
  }
  equalClick() {
    if (this.two_param != "") {
      switch (this.action) {
        case 'addition':
          this.response = parseFloat(this.one_param) + parseFloat(this.two_param);
          break;
        case 'subtraction':
          this.response = parseFloat(this.one_param) - parseFloat(this.two_param);
          break;
        case 'division':
          this.response = parseFloat(this.one_param) / parseFloat(this.two_param);
          break;
        case 'multiplication':
          this.response = parseFloat(this.one_param) * parseFloat(this.two_param);
          break;
        case 'mod':
          this.response = parseFloat(this.one_param) % parseFloat(this.two_param);
          break;
      }
    }
    else if (this.one_param != "") {
      this.response = parseFloat(this.one_param);
    }
    else {
      this.response = parseFloat(this.text_response);
    }
    if (getPointLength(this.response) <= 18) {
      this.response = this.response.toFixed(getPointLength(this.response));
    }
    else {
      this.response = this.response.toFixed(18);
    }
    this.one_param = "";
    this.two_param = "";
    this.action = "";
    this.text_response = this.response.toString();
    return this.text_response;
  }
  autoResizeFontText(countSymbols, widthResponse) {
    let newFontSize = startFontSize;
    let widthText = newFontSize * countSymbols;

    if (countSymbols < minCountSymbols) {
      newFontSize = startFontSize;
    }
    else {
      while (widthText / 1.5 > widthResponse) {
        newFontSize -= 2;
        widthText = newFontSize * countSymbols;
      }
    }

    return newFontSize;
  }
  funcMathClick(type) {
    if (this.one_param == "") {
      switch (type) {
        case 'sqrt':
          this.one_param = Math.sqrt(parseFloat(this.text_response));
          break;
        case 'sqr':
          this.one_param = (parseFloat(this.text_response) * parseFloat(this.text_response));
          break;
        case 'onediv':
          this.one_param = (1 / parseFloat(this.text_response));
          break;
      }
      if (getPointLength(this.one_param) <= 18) {
        this.one_param = this.one_param.toFixed(getPointLength(this.one_param)).toString();
      }
      else {
        this.one_param = this.one_param.toFixed(18).toString();
      }
      this.text_response = this.one_param;
      this.one_param = "";
    }
    else {
      this.text_response = this.text_response.substring(0, this.text_response.length - this.two_param.length);
      switch (type) {
        case 'sqrt':
          this.two_param = Math.sqrt(parseFloat(this.two_param));
          break;
        case 'sqr':
          this.two_param = (parseFloat(this.two_param) * parseFloat(this.two_param));
          break;
        case 'onediv':
          this.two_param = (1 / parseFloat(this.two_param));
          break;
      }
      if (getPointLength(this.two_param) <= 18) {
        this.two_param = this.two_param.toFixed(getPointLength(this.two_param)).toString();
      }
      else {
        this.two_param = this.two_param.toFixed(18).toString();
      }
      this.text_response += this.two_param;
    }
    return this.text_response;
  }
  clearClick() {
    if (this.two_param.length > 0) {
      this.two_param = "";
    }
  }
  clearAllClick() {
    this.text_response = "0";
    this.one_param = "";
    this.two_param = "";
    this.action = "";
    this.response = 0;
  }
  eraseClick() {
    if (this.text_response.includes('e')) {
      this.text_response = "";
    }
    if (this.text_response[this.text_response.length - 1] < '0' || this.text_response[this.text_response.length - 1] > '9') {
      this.action = "";
    }
    this.text_response = this.text_response.substring(0, this.text_response.length - 1);
    return this.text_response;
  }
}