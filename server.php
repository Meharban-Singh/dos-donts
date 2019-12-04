<?php

	$file = "C:\\xampp\\htdocs\\dos-donts\\dos\\" . $_GET["country"];
	$dosFile = fopen($file, "r");
	$dontsFile = fopen($file, "r");

	if($dosFile == false)
		echo("Error in opening Dos File");
	if($dontsFile == false)
		echo("Error in opening Donts File");

	$dosFileText = fread($dosFile,filesize($file));
	$dontsFileText = fread($dontsFile, filesize($file));

	fclose($dosFile);
	fclose($dontsFile);

	echo($dosFileText);
	echo("\n\n\n");
	echo($dontsFileText);

?>