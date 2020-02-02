let rateUsd = document.querySelector('#rateUsd');
let rateMyr = document.querySelector('#rateMyr');
let rateRange = document.querySelector('#rateRange');

let comissionUsd = document.querySelector('#comissionUsd');
let comissionMyr = document.querySelector('#comissionMyr');
let comissionRange = document.querySelector('#comissionRange');

let RATE_MIN = 0;
let RATE_MAX = 1000000;

let formatterNumber = new Intl.NumberFormat('ru-RU', { minimumIntegerDigits: 1, minimumFractionDigits: 2, maximumFractionDigits: 2});
let formatterCurrencyUsd = new Intl.NumberFormat('ru', {
	style: 'currency',
	currency: 'USD',
});
let formatterCurrencyMyr = new Intl.NumberFormat('ru', {
	style: 'currency',
	currency: 'MYR',
});

rateUsd.addEventListener('input', inputHandler);
rateMyr.addEventListener('input', inputHandler);
comissionUsd.addEventListener('input', inputHandler);
comissionMyr.addEventListener('input', inputHandler);

// rateUsd.addEventListener('blur', blurHandler);
// rateMyr.addEventListener('blur', blurHandler);


function numberMinMax(item, calc) {
	let initCalc = calc;
	calc = parseFloat(calc.replace(",", "."));

	if (calc < RATE_MIN) {
		calc = RATE_MIN;
		return calc;
	} else if (calc > RATE_MAX) {
		calc = RATE_MAX;
		console.log(calc);
		return calc;
	} else {
		return initCalc;
	}
}

function checkKey(item) {
	let clean = item.value.replace(/[^0-9,]/g, "")
		.replace(/(,.*?),(.*,)?/, "$1")
		.replace(/(\,[\d]{2})./g, '$1');

	if (clean !== item.value) item.value = clean;

	return clean;
}

function inputHandler(event) {
	let number = '';
	let initItem = this;
	number = checkKey(this);
	number = numberMinMax(initItem, number);
	console.log(number);
	this.value = number;
}






	// for (let letter of this.value) {
	// 	if ('0123456789,'.includes(letter)) {
	// 		number += letter;
	// 	}
	// }
	//
	// if (number.match(/\,/g) != null && number.match(/\,/g).length > 1){
	// 	number = number.substr(0, number.lastIndexOf(","));
	// }
	//
	//
	// number = numberMinMax(initItem, number);
	// number = formatterNumber.format(number);

	// // } else {
	// 	let initItem = this;

	// this.value = this.value.replace(/[^\d\,]/g, "");
	// number = this.value;
	//
	// if (number.match(/\,/g) != null && number.match(/\,/g).length > 1){
	// 		number = number.substr(0, number.lastIndexOf(","));
	// 	}


	//number = parseFloat(number.replace(",", "."));
	//number = "" + number.replace(".", ",");
	//number = formatterNumber.format(number);



// function blurHandler(event) {
//
// 	if (this.dataset.cur == 'usd') {
// 		this.value = formatterCurrencyUsd.format();
// 	} else {
// 		this.value = formatterCurrencyMyr.format();
// 	}
//
//
//
// }
