//https://stackoverflow.com/a/47990744/7976792
//If link doesnt work -- https://stackoverflow.com/questions/31274329/get-list-of-filenames-in-folder-with-javascript

/*
	a variable 'countries' is created which gets all the names of files from folder 
	'dos' and makes an array of file names(and hence array of names of all 
	the countries in system).
*/

let countries = <?php $out = array();
	foreach (glob('C:\\xampp\\htdocs\\dos-donts\\dos\\*') as $filename) {
		$p = pathinfo($filename);
		$out[] = $p['filename'];	
	}

	echo json_encode($out);
?>;