<?php
session_start();
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

$time = $_POST['time'];
$ticket = $_POST['ticket'];

$sql = "UPDATE detailed_report SET is_cancelled= 'true' WHERE time = '$time' AND ticketNumber='$ticket'";

if ($conn->query($sql) === TRUE){
    echo 'Order Cancelled';
}
$conn->close();
?>