/*
a variable 'countries' has been obtained from another script (files.php), while
gets all the names of files from folder 'dos' and makes an array of file names
(and hence array of names of all the countries in system).
*/
window.onload = init;

function init() {
	autocomplete(document.getElementsByName("country")[0], countries);
}

function getData() {
	let country = verifyCountry();

	if(country != "-1") {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', "http://localhost/dos-donts/server.php?country=" + country);
		xhr.send();

		xhr.onload = () => {
			let obj = JSON.parse(xhr.response);
			document.getElementById("doContent").innerHTML = obj['dos'];
			document.getElementById("dontContent").innerHTML = obj['donts'];
			document.getElementsByName("country")[0].blur();
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


//https://www.w3schools.com/howto/howto_js_autocomplete.asp
function autocomplete(inp, arr) {
  let currentFocus;

  inp.addEventListener("input", function(e) {
      let a, b, i, val = this.value;
      
      closeAllLists();

      if (!val) 
      	return false;
      currentFocus = -1;
      
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");

      this.parentNode.appendChild(a);

      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);

          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          
          b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              getData();
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });

  inp.addEventListener("keydown", function(e) {
      let x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.key === "ArrowDown") {
        currentFocus++;
        addActive(x);
      } else if (e.key === "ArrowUp") {
        currentFocus--;
        addActive(x);
      } else if(e.key === "Tab") {
      	e.preventDefault();
      } else if(e.key === "Escape") {
      	closeAllLists();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        } else {
			getData();
			closeAllLists();    	
        }
      }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);

    if (currentFocus >= x.length) 
    	currentFocus = 0;

    if (currentFocus < 0) 
    	currentFocus = (x.length - 1);

    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}