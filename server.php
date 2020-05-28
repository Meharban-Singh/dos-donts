<?php

/**
 * Gets dos and donts files data from fules dos/country.txt and donts/country.txt 
 * where country is name of country as sent from client.
 * 
 * Country name has to be in PascalCase since all files will be created as PascalCase.txt
 */
	//Allow reqs from all sources
	header("Access-Control-Allow-Origin: *");
	
	//Get dos and donts file from system using country name from user input
	$dosFile = "C:\\xampp\\htdocs\\dos-donts\\dos\\" . $_GET["country"];
	$dontsFile = "C:\\xampp\\htdocs\\dos-donts\\donts\\" . $_GET["country"];

	//Open both files
	$dosFileObj = fopen($dosFile, "r");
	$dontsFileObj = fopen($dontsFile, "r");

	//Check for errors
	if($dosFileObj == false)
		echo("Error in opening Dos File");
	if($dontsFileObj == false)
		echo("Error in opening Donts File");

	//read from both files 
	$dosFileText = fread($dosFileObj,filesize($dosFile));
	$dontsFileText = fread($dontsFileObj, filesize($dontsFile));

	//close files 
	fclose($dosFileObj);
	fclose($dontsFileObj);

	//create a nrw obj with props dos and donts with data as received from files.
	$obj = new \stdClass();
	$obj->dos = $dosFileText;
	$obj->donts = $dontsFileText;

	//return obj in json
	echo json_encode($obj);
?>