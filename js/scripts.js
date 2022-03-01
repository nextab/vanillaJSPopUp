var throttledListener = throttle(scrollListener, 1000);
window.addEventListener('scroll', throttledListener);

function throttle(func, delay) { // allows [func] to run once every [delay] ms
	var func = func.bind(func),
	last = Date.now();
	return function() {
		if (Date.now() - last > delay) {
			func();
			last = Date.now();
		}
	}
}
const dpBody = document.querySelector("body");
const popup = document.querySelector(".more_info_container");
function scrollListener() {
	console.log('scrolled');
	var threshold = document.body.clientHeight * 0.2;
	if ((window.pageYOffset >= threshold) && !(localStorage.getItem('nomorepopup'))) {
		// alert('user scrolled to threshold; listener removed');
		// console.log('listener down');
		popup.classList.add("active");
		dpBody.classList.add("modal-open");
		window.removeEventListener('scroll', throttledListener);
	}
}

document.addEventListener('click', function (event) {
	if (event.target.matches('.close_button')) {
		const modal = event.target.closest(".survey_modal");
		modal.classList.remove("active");
		dpBody.classList.remove("modal-open");
		disablePU();
		enableTrigger();
	}
	if(event.target.matches('body')) {
		const modal = document.querySelector(".more_info_container.active");
		modal.classList.remove("active");
		dpBody.classList.remove("modal-open");
	}
	return;
}, false);
document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
		const modal = document.querySelector(".more_info_container.active");
		if(modal) {
			modal.classList.remove("active");
			dpBody.classList.remove("modal-open");
			disablePU();
			enableTrigger();
		}
	}
});

function disablePU() {
	localStorage.setItem('nomorepopup', 'true');
}
function enableTrigger() {
	localStorage.setItem('showTrigger', 'true');
}

function showSurvey() {
	localStorage.removeItem('nomorepopup');
	popup.classList.add("active");
	dpBody.classList.add("modal-open");
}
if(localStorage.getItem('showTrigger')) {
	dpBody.classList.add("show-trigger");
}