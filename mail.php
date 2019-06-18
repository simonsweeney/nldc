<?php

header('Content-Type: application/json');

$fromEmail = filter_var( $_REQUEST['fromEmail'], FILTER_SANITIZE_EMAIL);
$fromName = filter_var( $_REQUEST['fromName'], FILTER_SANITIZE_EMAIL);
$subject = filter_var( $_REQUEST['subject'], FILTER_SANITIZE_EMAIL);
$message = filter_var( $_REQUEST['message'], FILTER_SANITIZE_EMAIL);

$success = mail( 'ben.s.west@gmail.com', $subject, $message, 'From: '.$fromEmail );

echo json_encode( [ 'success' => $success ] );