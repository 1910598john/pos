<?php
$servername = "localhost";
$username = "root";
$password = "";
$db = "admin";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$selectedticket = $_POST['selectedticket'];
$payment = intval($_POST['payment']);
$itemName = $_POST['itemName'];
date_default_timezone_set('Asia/Manila');
$endtime = $_POST['end'];
$current_end_time = date_create($endtime);
$foo_payment = intval($_POST['foopayment']);

//if current item is 1 hour and payment made is 100 and if current item is 2 hours and payment made is 50
if ($foo_payment == 100 && $itemName == '1 hour' || $itemName == '2 hours' && $foo_payment == 50 || $itemName == 'Half hour' && $foo_payment == 160){
    $sql = "UPDATE playground_time SET end_time = 'No time', item='Unlimited' WHERE ticketID='$selectedticket'";
} elseif ($foo_payment == 50 && $itemName == '1 hour'){
    
    date_add($current_end_time, date_interval_create_from_date_string("+1 hour"));
    $end_time = date_format($current_end_time, "h:i A");
    $sql = "UPDATE playground_time SET end_time='$end_time', item='2 hours', status='running' WHERE ticketID='$selectedticket'";

}elseif ($foo_payment == 60 && $itemName == 'Half hour'){
    date_add($current_end_time, date_interval_create_from_date_string("+30 minutes"));
    $end_time = date_format($current_end_time, "h:i A");

    echo $end_time;
    $sql = "UPDATE playground_time SET end_time='$end_time', item='1 hour', status='running' WHERE ticketID='$selectedticket'";
}
elseif ($foo_payment == 110 && $itemName == 'Half hour'){
    date_add($current_end_time, date_interval_create_from_date_string("+90 minutes"));
    $end_time = date_format($current_end_time, "h:i A");
    $sql = "UPDATE playground_time SET end_time='$end_time', item='2 hours', status='running' WHERE ticketID='$selectedticket'";
}
elseif ($foo_payment == 0 && $itemName == '1 hour'){
    date_add($current_end_time, date_interval_create_from_date_string("+1 hour"));
    $end_time = date_format($current_end_time, "h:i A");
    $sql = "UPDATE playground_time SET end_time='$end_time', extended='true', status='running' WHERE ticketID='$selectedticket'";
}
 elseif ($foo_payment == 0 && $itemName == '2 hours'){
    date_add($current_end_time, date_interval_create_from_date_string("+1 hour"));
    $end_time = date_format($current_end_time, "h:i A");
    $sql = "UPDATE playground_time SET end_time='$end_time', extended='true', status='running' WHERE ticketID='$selectedticket'";
}

if ($conn->query($sql) === TRUE){
    echo 'Extended.';
}

$conn->close();
?>