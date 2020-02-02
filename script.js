let creditText = document.querySelector('#creditText');
let creditRange = document.querySelector('#creditRange');

let CREDIT_MIN = 0;
let CREDIT_MAX = 1000000;
let PERIOD_MIN = 0;
let PERIOD_MAX = 20;

let firstContributionText = document.querySelector('#firstContributionText');
let returnPeriodText = document.querySelector('#returnPeriodText');

let formatterNumber = new Intl.NumberFormat('ru');

creditText.addEventListener('input', inputHandler);
firstContributionText.addEventListener('input', inputHandler);
returnPeriodText.addEventListener('input', inputHandler);


function numberMinMax(item, calc) {

	if (item == returnPeriodText) {

		if (calc < PERIOD_MIN) {
			calc = PERIOD_MIN;
		}

		if (calc > PERIOD_MAX) {
			calc = PERIOD_MAX;
		}

	} else {
		if (calc < CREDIT_MIN) {
			calc = CREDIT_MIN;
		}

		if (calc > CREDIT_MAX) {
			calc = CREDIT_MAX;
		}
	}

	return calc;
}

function inputHandler(event) {
	let number = '';

	if (this == returnPeriodText) {
		let initItem = this;

		for (let letter of this.value) {
			if ('0123456789'.includes(letter)) {
				number += letter;
			}
		}

		number = parseInt(number);
		number = numberMinMax(initItem, number);
		number = formatterNumber.format(number);

	} else {
		let initItem = this;

		this.value = this.value.replace(/[^\d\,]/g, "");
		number = this.value;

		if (number.match(/\,/g) != null && number.match(/\,/g).length > 1){
			number = number.substr(0, number.lastIndexOf(","));
		}

		number = numberMinMax(initItem, number);

	}

	this.value = number;
}

