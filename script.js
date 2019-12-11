/*
a variable 'countries' has been obtained form another script (files.php), while
gets all the names of files from folder 'dos' and makes an array of file names
(and hence array of names of all the countries in system).
*/

window.onload = init;

function init() {
	document.getElementById("search").addEventListener("submit", getData);
}

function getData(evt) {
	evt.preventDefault();

	let country = verifyCountry();

	if(country != "-1") {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', "http://localhost/dos-donts/server.php?country=" + country);
		xhr.send();

		xhr.onload = () => {
			let obj = JSON.parse(xhr.response);
			document.getElementById("doContent").innerHTML = obj['dos'];
			document.getElementById("dontContent").innerHTML = obj['donts'];
		}
	}
	else {
		alert("Unfortunately, this country is not available in our system yet.");
	}
}

function verifyCountry() {
	let temp = document.getElementsByName("country")[0].value.trim().split(' ');
	let out = '';

	for(let i = 0; i < temp.length; i++) {
		out += temp[i].charAt(0).toUpperCase();
		out += temp[i].substring(1, temp[i].length).toLowerCase();
	}

	if(countries.indexOf(out) > -1)
		return out;

	//In case of error alert the user and dont send request
	return "-1";
}