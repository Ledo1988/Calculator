let rateUsd = document.querySelector('#rateUsd');
let rateMyr = document.querySelector('#rateMyr');
let rateRange = document.querySelector('#rateRange');

let comissionUsd = document.querySelector('#comissionUsd');
let comissionMyr = document.querySelector('#comissionMyr');
let comissionRange = document.querySelector('#comissionRange');

let totalUsd = document.querySelector('#totalUsd');
let totalMyr = document.querySelector('#totalMyr');
let totalBonus = document.querySelector('#totalBonus');
let bonus = document.querySelector('#bonus');

const RATE_MYR = 4.44;

const RATE_USD_MIN = 0;
const RATE_USD_MAX = 10000;
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

		let calcAttention = document.getElementsByClassName("calculator__attention")[0];

		if (clean !== item.value) {
			calcAttention.classList.add('active');
		} else {
			item.value = clean;
			calcAttention.classList.remove('active');
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

	//Total

	function totalCalc(rate) {
		let total = '';

		total = rate.toString().replace(/,/, '.');
		total = parseFloat(total*110/100).toFixed(2).replace(/\./g, ',');

		return total;
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

		totalUsd.value = totalCalc(rateUsd.value);
		totalUsd.innerHTML = totalUsd.value;
		totalMyr.innerHTML = totalCalc(rateMyr.value);


		let calcBonus = parseFloat(comissionUsd.value).toFixed(2);

		if (calcBonus > 500) {
			totalBonus.innerHTML = '500';
			bonus.classList.add('active');
		} else {
			totalBonus.innerHTML = '0';
			bonus.classList.remove('active');
		}

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

		totalUsd.innerHTML = totalCalc(rateUsd.value);
		totalMyr.innerHTML = totalCalc(rateMyr.value);

		let calcBonus = parseFloat(comissionUsd.value).toFixed(2);

		if (calcBonus > 500) {
			totalBonus.innerHTML = '500';
			bonus.classList.add('active');
		} else {
			totalBonus.innerHTML = '0';
			bonus.classList.remove('active');
		}
	}

}


