let rateUsd = document.querySelector('#rateUsd');
let rateMyr = document.querySelector('#rateMyr');
let rateRange = document.querySelector('#rateRange');

let comissionUsd = document.querySelector('#comissionUsd');
let comissionMyr = document.querySelector('#comissionMyr');
let comissionRange = document.querySelector('#comissionRange');

const RATE_MYR = 4.44;

const RATE_USD_MIN = 0;
const RATE_USD_MAX = 1000000;
const RATE_MYR_MIN = 0;
const RATE_MYR_MAX = RATE_USD_MAX*RATE_MYR;

const COMISSION_USD_MIN = 0;
const COMISSION_USD_MAX = RATE_USD_MAX/100*10;
const COMISSION_MYR_MIN = 0;
const COMISSION_MYR_MAX = RATE_MYR_MAX/100*10;

setDoubleDependencies(rateUsd, rateRange, RATE_USD_MIN, RATE_USD_MAX);
setDoubleDependencies(rateMyr, rateRange,  RATE_MYR_MIN, RATE_MYR_MAX);
setDoubleDependencies(comissionUsd, comissionRange, COMISSION_USD_MIN, COMISSION_USD_MAX);
setDoubleDependencies(comissionMyr, comissionRange, COMISSION_MYR_MIN, COMISSION_MYR_MAX);

function setDoubleDependencies(textElement, rangeElement, mins, maxs) {

	textElement.addEventListener('input', function() {
		inputHandler(this, mins, maxs);
	}, true);

	rangeElement.addEventListener('input', function() {
		rangeHandler(this);
	}, true);

	//Input validation
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

	//Min-max for input
	function numberMinMax(item, calc, itemMin, itemMax) {

		let initCalc = calc;
		calc = parseFloat(calc.replace(",", "."));

		if (calc < itemMin) {
			calc = itemMin;
			return calc;
		} else if (calc > itemMax) {
			calc = itemMax;
			return calc;
		} else {
			return initCalc;
		}

	}

	function interCalculation(value) {
		let interCalcUsd = '';
		let numberUsd = '';
		let interCalcMyr = '';
		let interCalcUsdComission = '';
		let interCalcMyrComission = '';
		let interCalculationObj = {};

		interCalcUsd = value;

		numberUsd = interCalcUsd.toString().replace(/,/, '.');

		interCalcMyr = parseFloat(numberUsd*RATE_MYR).toFixed(2).replace(/\./g, ',');

		interCalcUsdComission = parseFloat(numberUsd/100*10).toFixed(2).replace(/\./g, ',');

		interCalcMyrComission = parseFloat(numberUsd*RATE_MYR/100*10).toFixed(2).replace(/\./g, ',');

		interCalculationObj = {
			rateU: interCalcUsd,
			rateM: interCalcMyr,
			comissionU: interCalcUsdComission,
			comissionM: interCalcMyrComission,
		};

		// Return it
		return interCalculationObj;
	}

	//InputsHandler
	function inputHandler($this, min, max) {
		let number = '';
		let initItem = $this
		let interCalcValue = '';

		number = checkKey($this);
		number = numberMinMax(initItem, number, min, max);
		//number = parseFloat(number.replace(/,/g, ''));

		$this.value = number;

		interCalcValue = $this.value;

		if ($this.id == 'rateUsd') {
			interCalcValue = interCalcValue;

		} else if ($this.id == 'rateMyr') {
			interCalcValue = interCalcValue.toString().replace(/,/, '.');
			interCalcValue = parseFloat(interCalcValue/RATE_MYR).toFixed(2).replace(/\./g, ',');

		} else if ($this.id == 'comissionUsd') {
			interCalcValue = interCalcValue.toString().replace(/,/, '.');
			interCalcValue = parseFloat(interCalcValue*100/10).toFixed(2).replace(/\./g, ',');

		} else if ($this.id == 'comissionMyr') {
			interCalcValue = interCalcValue.toString().replace(/,/, '.');
			interCalcValue = parseFloat(interCalcValue/RATE_MYR*100/10).toFixed(2).replace(/\./g, ',');
		}

		let objInterCalculation = '';

		objInterCalculation = interCalculation(interCalcValue);

		rateUsd.value = objInterCalculation.rateU;
		rateMyr.value = objInterCalculation.rateM;
		comissionUsd.value = objInterCalculation.comissionU;
		comissionMyr.value = objInterCalculation.comissionM;
		rateRange.value = parseInt(rateUsd.value.replace(/,/, '.'));
		comissionRange.value = parseInt(comissionUsd.value.replace(/,/, '.'));



		// if ($this.id == 'rateUsd') {
		// 	$this.value = number;
		// 	let comission = '';
		//
		// 	comission = $this.value.replace(/,/, '.');
		// 	comissionUsd.value = parseFloat(comission/100*10).toFixed(2).replace(/\./g, ',');
		//
		// 	number = $this.value.replace(/,/, '.');
		// 	rateMyr.value = parseFloat(number*RATE_MYR).toFixed(2).replace(/\./g, ',');
		//
		//
		// 	comission = rateMyr.value.replace(/,/, '.');
		// 	comissionMyr.value = parseFloat(comission/100*10).toFixed(2).replace(/\./g, ',');
		//
		// 	//rateRange.value = Math.round(this.value.replace(/,/, '.'));
		// 	rateRange.value = parseInt($this.value.replace(/,/, '.'));
		// 	comissionRange.value = parseInt($this.value.replace(/,/, '.'));
		// } else if ($this.id == 'rateMyr') {
		// 	$this.value = number;
		//
		// 	number = $this.value.replace(/,/, '.');
		// 	rateUsd.value = parseFloat(number/RATE_MYR).toFixed(2).replace(/\./g, ',');
		//
		// 	//rateRange.value = Math.round(this.value.replace(/,/, '.'));
		// 	rateRange.value = parseInt(rateUsd.value.replace(/,/, '.'));
		// } else if ($this.id == 'comissiomUsd') {
		// 	$this.value = number;
		//
		// 	number = $this.value.replace(/,/, '.');
		// 	rateMyr.value = parseFloat(number*RATE_MYR).toFixed(2).replace(/\./g, ',');
		//
		// 	//rateRange.value = Math.round(this.value.replace(/,/, '.'));
		// 	comissionRange.value = parseInt($this.value.replace(/,/, '.'));
		// } else if ($this.id == 'comissiomMyr') {
		// 	$this.value = number;
		//
		// 	number = $this.value.replace(/,/, '.');
		// 	rateUsd.value = parseFloat(number/RATE_MYR).toFixed(2).replace(/\./g, ',');
		//
		// 	//rateRange.value = Math.round(this.value.replace(/,/, '.'));
		// 	rateRange.value = parseInt(rateUsd.value.replace(/,/, '.'));
		// }


	}

	//RangesHandle
	function rangeHandler($this) {
		let rangeParentUsd = '';
		let rangeParentMyr = '';
		let rangeMyrNumber = '';

		rangeParentUsd = $this.closest(".calculator__item").getElementsByClassName("rangeParentUsd")[0];
		rangeParentUsd.value = parseFloat($this.value).toFixed(2).replace(".", ",");

		let objInterCalculation = interCalculation(rangeParentUsd.value);

		rateUsd.value = objInterCalculation.rateU;
		rateMyr.value = objInterCalculation.rateM;
		comissionUsd.value = objInterCalculation.comissionU;
		comissionMyr.value = objInterCalculation.comissionM;
		//rateRange.value = parseInt(rateUsd.value.replace(/,/, '.'));
		//comissionRange.value = parseInt(comissionUsd.value.replace(/,/, '.'));

		console.log(rateRange.value);
		console.log(comissionRange.value);


		//
		// rangeParentMyr = $this.closest(".calculator__item").getElementsByClassName("rangeParentMyr")[0];
		// rangeMyrNumber = rangeParentUsd.value.replace(/,/, '.');
		// rangeMyrNumber = parseFloat(rangeMyrNumber*RATE_MYR).toFixed(2).replace(/\./g, ',');
		// rateMyr.value = rangeMyrNumber;
		// //rangeParentMyr.value = parseFloat(rangeMyrNumber).toFixed(2).replace(".", ",");
	}




		// if (item.id.includes('rate')) {
		// 	if (calc < RATE_MIN) {
		// 		calc = RATE_MIN;
		// 		return calc;
		// 	} else if (calc > RATE_MAX) {
		// 		calc = RATE_MAX;
		// 		return calc;
		// 	} else {
		// 		return initCalc;
		// 	}
		// } else if (item.id.includes('comission')) {
		// 	if (calc < COMMISSION_MIN) {
		// 		calc = COMMISSION_MIN;
		// 		return calc;
		// 	} else if (calc > COMMISSION_MAX) {
		// 		calc = COMMISSION_MAX;
		// 		return calc;
		// 	} else {
		// 		return initCalc;
		// 	}
		// }



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
