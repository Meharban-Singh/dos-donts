let obj;

window.onload = init;

function init() {
	document.getElementById("search").addEventListener("submit", getData);
}

function getData(evt) {
	evt.preventDefault();

	let country = verifyCountry();
	console.log(country);
	let xhr = new XMLHttpRequest();
	xhr.open('GET', "http://localhost/dos-donts/server.php?country=" + country);
	xhr.send();

	xhr.onload = () => {
		obj = JSON.parse(xhr.response);
	}
}

function verifyCountry() {
	return document.getElementsByName("country")[0].value;
}