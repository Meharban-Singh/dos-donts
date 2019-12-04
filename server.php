<?php

	$file = $_GET["country"];
	$dosFile = fopen("dos/" + $file + ".txt", "r");
	$dontsFile = fopen("donts/" + $file + ".txt", "r");

	if($dosFile == false)
		echo("Error in opening Dos File");
	if($dontsFile == false)
		echo("Error in opening Donts File");

	$dosFileText = fread($dosFile,filesize($dosFile));
	$dontsFileText = fread($dontsFile, filesize($dontsFile));

	fclose($dosFile);
	fclose($dontsFile);

	echo($dosFileText);
	echo("\n\n\n");
	echo($dontsFileText);

?>