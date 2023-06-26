let action = '', one_param = '', two_param = '', text_response = '0', response = 0;

for (let i = 0; i <= 9; i++) {
	document.getElementById('num'+i).onclick = function() {
		if (text_response == '0') {
			text_response = i.toString();
		}
		else if (action == '') {
			text_response += i;
		}
		else {
			two_param += i;
			text_response += i;
		}
		document.getElementById('response').value = text_response;
	};
}

document.getElementById('point').onclick = function() {
	let count_point = text_response.split('.').length - 1;
	if (one_param === '' && count_point == 0) {
		text_response += '.';
	}
	else if (two_param !== '') {
		let count_point = two_param.split('.').length - 1;
		if (count_point == 0) {
			text_response += '.';
			two_param += '.';
		}
	}
	document.getElementById('response').value = text_response;
};

function setAction(type) {
	switch (action) {
		case 'addition':
			response = parseFloat(one_param) + parseFloat(two_param);
			break;
		case 'subtraction':
			response = parseFloat(one_param) - parseFloat(two_param);
			break;
		case 'division':
			response = parseFloat(one_param) / parseFloat(two_param);
			break;
		case 'multiplication':
			response = parseFloat(one_param) * parseFloat(two_param);
			break;
		case 'mod':
			response = parseFloat(one_param) % parseFloat(two_param);
			break;
	}
	one_param = text_response;
	if (action != '') {
		one_param = response.toString();
		text_response = one_param;
	}
	two_param = '';
	switch (type) {
		case 'addition':
			text_response += '+';
			break;
		case 'subtraction':
			text_response += '-';
			break;
		case 'division':
			text_response += '÷';
			break;
		case 'multiplication':
			text_response += '×';
			break;
		case 'mod':
			text_response += '%';
			break;
	}
	action = type;
	document.getElementById('response').value = text_response;
}

document.getElementById('addition').onclick = function() { setAction('addition') };
document.getElementById('subtraction').onclick = function() { setAction('subtraction') };
document.getElementById('division').onclick = function() { setAction('division') };
document.getElementById('multiplication').onclick = function() { setAction('multiplication') };
document.getElementById('mod').onclick = function() { setAction('mod') };
document.getElementById('sign').onclick = function() { 
	if (text_response[0] != '-') {
		text_response = '-' + text_response;
	}
	else {
		text_response = text_response.slice(1);
	}
	document.getElementById('response').value = text_response;
};
document.getElementById('equal').onclick = function() { 
	switch (action) {
		case 'addition':
			response = parseFloat(one_param) + parseFloat(two_param);
			break;
		case 'subtraction':
			response = parseFloat(one_param) - parseFloat(two_param);
			break;
		case 'division':
			response = parseFloat(one_param) / parseFloat(two_param);
			break;
		case 'multiplication':
			response = parseFloat(one_param) * parseFloat(two_param);
			break;
		case 'mod':
			response = parseFloat(one_param) % parseFloat(two_param);
			break;
	}
	one_param = '';
	two_param = '';
	text_response = response.toString();
	action = '';	
	document.getElementById('response').value = text_response;
};
function leftFunction(type) {
	if (one_param === '') {
		switch (type) {
			case 'sqrt': 
				one_param = Math.sqrt(parseFloat(text_response)).toString();
				break;
			case 'sqr':
				one_param = (parseFloat(text_response) * parseFloat(text_response)).toString();
				break;
			case 'onediv':
				one_param = (1 / parseFloat(text_response)).toString();
				break;
		}
		text_response = one_param;
		one_param = '';
	}
	else {
		text_response = text_response.substring(0, text_response.length - two_param.length);
		switch (type) {
			case 'sqrt': 
				two_param = Math.sqrt(parseFloat(two_param)).toString();
				break;
			case 'sqr':
				two_param = (parseFloat(two_param) * parseFloat(two_param)).toString();
				break;
			case 'onediv':
				two_param = (1 / parseFloat(two_param)).toString();
				break;
		}
		text_response += two_param;
	}
	document.getElementById('response').value = text_response;
}
document.getElementById('sqrt').onclick = function() { leftFunction('sqrt'); };
document.getElementById('sqr').onclick = function() { leftFunction('sqr'); };
document.getElementById('onediv').onclick = function() { leftFunction('onediv'); };
document.getElementById('clear').onclick = function() { 
	text_response = text_response.substring(0, text_response.length - two_param.length);
	two_param = '';
	document.getElementById('response').value = text_response;
};
document.getElementById('clearall').onclick = function() { 
	text_response = '0';
	one_param = '';
	two_param = '';
	action = '';
	response = 0;
	document.getElementById('response').value = text_response;
};
document.getElementById('erase').onclick = function() { 
	if (text_response[text_response.length - 1] < '0' || text_response[text_response.length - 1] > '9') {
		action = '';
	}
	text_response = text_response.substring(0, text_response.length - 1);
	document.getElementById('response').value = text_response;
};