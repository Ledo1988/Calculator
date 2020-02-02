let creditText = document.querySelector('#creditText');
let creditRange = document.querySelector('#creditRange');
let firstContributionText = document.querySelector('#firstContributionText');
let returnPeriodText = document.querySelector('#returnPeriodText');

let formatterNumber = new Intl.NumberFormat('ru');

creditText.addEventListener('input', inputHandler);
firstContributionText.addEventListener('input', inputHandler);
returnPeriodText.addEventListener('input', inputYearsHandler);

function inputHandler (event) {

	this.value = this.value.replace(/[^\d\,]/g, "");
	if(this.value.match(/\,/g).length > 1) {
		this.value = this.value.substr(0, this.value.lastIndexOf(","));
	}

}

function inputYearsHandler (event) {
	let number = '';

	for (let letter of this.value) {
		if ('0123456789'.includes(letter)) {
			number += letter;
		}
	}

	number = formatterNumber.format(number);
	this.value = number;
}