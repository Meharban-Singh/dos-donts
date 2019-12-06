window.onload = init;

function init() {
	document.getElementById("search").addEventListener("submit", getData);
}

function getData(evt) {
	evt.preventDefault();

	let country = verifyCountry();
	let xhr = new XMLHttpRequest();
	xhr.open('GET', "http://localhost/dos-donts/server.php?country=" + country);
	xhr.send();

	xhr.onload = () => {
		let obj = JSON.parse(xhr.response);ss
		document.getElementById("doContent").innerHTML = obj['dos'];
		document.getElementById("dontContent").innerHTML = obj['donts'];
	}
}

function verifyCountry() {
	return document.getElementsByName("country")[0].value;
}