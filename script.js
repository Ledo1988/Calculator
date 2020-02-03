let rateUsd = document.querySelector('#rateUsd');
let rateMyr = document.querySelector('#rateMyr');
let rateRange = document.querySelector('#rateRange');

let comissionUsd = document.querySelector('#comissionUsd');
let comissionMyr = document.querySelector('#comissionMyr');
let comissionRange = document.querySelector('#comissionRange');

let RATE_MIN = 0;
let RATE_MAX = 1000000000;

//let formatterNumber = new Intl.NumberFormat('ru-RU', { minimumIntegerDigits: 1, minimumFractionDigits: 2, maximumFractionDigits: 2});
// let formatterCurrencyUsd = new Intl.NumberFormat('ru', {
// 	style: 'currency',
// 	currency: 'USD',
// });
// let formatterCurrencyMyr = new Intl.NumberFormat('ru', {
// 	style: 'currency',
// 	currency: 'MYR',
// });

rateUsd.addEventListener('input', inputHandler);
rateMyr.addEventListener('input', inputHandler);
comissionUsd.addEventListener('input', inputHandler);
comissionMyr.addEventListener('input', inputHandler);
rateRange.addEventListener('input', rangeHandler);
comissionRange.addEventListener('input', rangeHandler);

function numberMinMax(item, calc) {
	let initCalc = calc;
	calc = parseFloat(calc.replace(",", "."));

	if (calc < RATE_MIN) {
		calc = RATE_MIN;
		return calc;
	} else if (calc > RATE_MAX) {
		calc = RATE_MAX;
		return calc;
	} else {
		return initCalc;
	}
}

function checkKey(item) {
	let clean = item.value.replace(/[^0-9,]/g, "")
		.replace(/(,.*?),(.*,)?/, "$1")
		.replace(/(\,[\d]{2})./g, '$1');

	if (clean !== item.value) {
		console.log('[hty');
	} else {
		item.value = clean;
	}
	return clean;
}

function inputHandler(event) {
	let number = '';
	let initItem = this;
	number = checkKey(this);
	number = numberMinMax(initItem, number);
	//number = parseFloat(number.replace(/,/g, ''));
	this.value = number;

	if (this.dataset.desc.includes('rate') ) {
		rateRange.value = Math.round(this.value.replace(/,/, '.'));
		console.log(rateRange.value);
		console.log(typeof rateRange.value);
		rateRange.value = parseInt(rateRange.value);
		console.log(typeof rateRange.value);
	} else if (this.dataset.desc.includes('comission')) {
		comissionRange.value = this.value;
	}
}

function rangeHandler(event) {
	let rangeParent = this.closest(".calculator__item").getElementsByClassName("rangeParent")[0];
	rangeParent.value = parseInt(this.value).toFixed(2).replace(".", ",");
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
