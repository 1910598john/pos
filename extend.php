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

//if current item is 1 hour and payment made is 100 and if current item is 2 hours and payment made is 50
if ($payment == 100 && $itemName == '1 hour' || $itemName == '2 hours' && $payment == 50 || $itemName == 'Half hour' && $payment == 160){
    $sql = "UPDATE playground_time SET remaining_time='0', item='Unlimited' WHERE ticketID='$selectedticket'";
} elseif ($payment == 50 && $itemName == '1 hour'){
    $sql = "UPDATE playground_time SET remaining_time = remaining_time + 3600, item='2 hours', status='running' WHERE ticketID='$selectedticket'";
}elseif ($payment == 60 && $itemName == 'Half hour'){
    $sql = "UPDATE playground_time SET remaining_time = remaining_time + 1800, item='1 hour', status='running' WHERE ticketID='$selectedticket'";
}
elseif ($payment == 110 && $itemName == 'Half hour'){
    $sql = "UPDATE playground_time SET remaining_time = remaining_time + 3600, item='2 hours', status='running' WHERE ticketID='$selectedticket'";
}
elseif ($payment == 0 && $itemName == '1 hour'){
    $sql = "UPDATE playground_time SET remaining_time = remaining_time + 3600, extended='true', status='running' WHERE ticketID='$selectedticket'";
}
elseif ($payment == 0 && $itemName == 'Half hour'){
    $sql = "UPDATE playground_time SET remaining_time = remaining_time + 3600, extended='true', status='running' WHERE ticketID='$selectedticket'";
}
 elseif ($payment == 0 && $itemName == '2 hours'){
    $sql = "UPDATE playground_time SET remaining_time = remaining_time + 3600, extended='true', status='running' WHERE ticketID='$selectedticket'";
}

if ($conn->query($sql) === TRUE){
    echo 'Extended.';
}

$conn->close();
?>