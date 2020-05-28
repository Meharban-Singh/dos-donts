window.onload = init;

function init() {
	autocomplete(document.getElementsByName("country")[0], countries);
}

/**
 * Sends AJAX req to server to get dos and donts file of country as specified by the user
 */
function getData() {
	let country = verifyCountry();

  //if there is atleat one country in the system that matches the search from user, get its files via AJAX req
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


/**
 * Verifies if a country exists in the system. 
 * 
 * @return If a country exists, return the formatted country name else return -1
 */
function verifyCountry() {
  //Format input -> remove leading, trailing spaces, and convert to PascalCase
  let formattedSearch = document.getElementsByName("country")[0].value.trim()
    .split(' ').map(name => 
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    ).join('');
	
	if(countries.indexOf(formattedSearch) > -1)
		return formattedSearch;

	//In case of error alert the user and dont send request
	return -1;
}


//https://www.w3schools.com/howto/howto_js_autocomplete.asp
/**
 * Auto-completes user input, using an input element and an araay
 * of values to auto complete from. 
 * 
 * @param {input element} inp 
 * @param {array to acutocomplete from} arr 
 */
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