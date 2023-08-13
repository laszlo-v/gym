<?php

	$name = @trim(stripslashes($_POST['name'])); 
	$email = @trim(stripslashes($_POST['email']));
	$message = @trim(stripslashes($_POST['message'])); 

	$email_from = $email;
	$email_to = 'v2leslie@yahoo.com';

	$body = 'Name: ' . $name . "\n\n" . 'Email: ' . $email . "\n\n"  . 'Message: ' . $message;

	$success = @mail($email_to, $body, 'Name: ' . $name . "\n\n" . "\n\n" . 'Email: ' . $email . "\n\n"  . 'Message: ' . $message);
	
?>

<!DOCTYPE HTML>
<html lang="en-US">
<head><meta http-equiv="Content-Type" content="text/html; charset=euc-jp">
	<script>alert("Email has been sent.");</script>
	<meta HTTP-EQUIV="REFRESH" content="0; url=index.html"> 
</head>