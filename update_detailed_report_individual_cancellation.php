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
$year = $_POST['year'];
$time = $_POST['time'];
$ticket = $_POST['ticket'];
$item = $_POST['item'];
$sql = "UPDATE detailed_report SET is_cancelled= 'true' WHERE year='$year' AND time= '$time' AND ticketNumber='$ticket' AND item='$item'";

if ($conn->query($sql) === TRUE){
    echo 'Order Cancelled';
}
$conn->close();
?>