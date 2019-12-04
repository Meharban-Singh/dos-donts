<?php

	$dosFile = "C:\\xampp\\htdocs\\dos-donts\\dos\\" . $_GET["country"];
	$dontsFile = "C:\\xampp\\htdocs\\dos-donts\\donts\\" . $_GET["country"];

	$dosFileObj = fopen($dosFile, "r");
	$dontsFileObj = fopen($dontsFile, "r");

	if($dosFileObj == false)
		echo("Error in opening Dos File");
	if($dontsFileObj == false)
		echo("Error in opening Donts File");

	$dosFileText = fread($dosFileObj,filesize($dosFile));
	$dontsFileText = fread($dontsFileObj, filesize($dontsFile));

	fclose($dosFileObj);
	fclose($dontsFileObj);

	$obj = new \stdClass();
	$obj->dos = $dosFileText;
	$obj->donts = $dontsFileText;

	echo json_encode($obj);
?>