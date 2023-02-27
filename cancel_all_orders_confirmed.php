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

$ticket = $_POST['ticket'];

$sql = "UPDATE cafe_report SET status='Cancelled' WHERE ticket='$ticket'";

if ($conn->query($sql) === TRUE){
    echo 'Orders Cancelled';
}
$conn->close();
?>