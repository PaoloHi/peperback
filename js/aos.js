var TxtType = function (el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function () {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

	var that = this;
	var delta = 200 - Math.random() * 100;

	if (this.isDeleting) { delta /= 2; }

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.loopNum++;
		delta = 500;
	}

	setTimeout(function () {
		that.tick();
	}, delta);
};

window.onload = function () {
	var elements = document.getElementsByClassName('typewrite');
	for (var i = 0; i < elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-type');
		var period = elements[i].getAttribute('data-period');
		if (toRotate) {
			new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
	// INJECT CSS
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid transparent}";
	document.body.appendChild(css);
};



//*############################################################################################  RELOJ
var isSystemClock;
var date;

async function displayClock() {
	const getTimeAPIURL = 'https://worldtimeapi.org/api/ip';
	let apiResponse;

	try {
		apiResponse = await fetch(getTimeAPIURL);
	}
	catch {
		date = new Date();
		isSystemClock = true
	}	

	if (apiResponse.ok == false) {
		date = new Date();
		isSystemClock = true
	}
	else {
		let dateInformation = await apiResponse.json();
		let longDate = dateInformation.datetime;
		let shortDate = longDate.substring(0, longDate.indexOf('.'));
		date = new Date(shortDate);

		isSystemClock = false;
	}

	let clockElement = document.getElementById('reloj');	
	clockElement.textContent = formatTimeString(date)
}

function actualizarReloj() {
	let clockElement = document.getElementById('reloj');

	if (isSystemClock == false) {
		let currentSeconds = date.getSeconds() + 1;
		date.setSeconds(currentSeconds);
	}

	clockElement.textContent = formatTimeString(date);
}

function formatTimeString(date) {
	let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
	let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
	let seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

	return `${hours}:${minutes}:${seconds}`;
}

document.addEventListener("load", displayClock());
setInterval(actualizarReloj, 1000);//llama a funcion a cada segundo



//################################################################################################  MODAL 
// Obtener los elementos del modal
var modal = document.getElementById("myModal");
var openModalButton = document.getElementById("openModalButton");
var closeModalButton = document.getElementById("closeModalButton");
var videoBienvenidaBroker = document.getElementById("videoBienvenidaBroker");

// para abrir el modal
function openModal() {
	modal.style.display = "block";
	videoBienvenidaBroker.muted = false;
	videoBienvenidaBroker.currentTime = 0;
	videoBienvenidaBroker.play();
}

// para cerrar el modal
function closeModal() {
	modal.style.display = "none";
	videoBienvenidaBroker.pause();


}


openModalButton.addEventListener("click", openModal);


closeModalButton.addEventListener("click", closeModal);
