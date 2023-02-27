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

$id = $_POST['id'];

$sql = "UPDATE cafe_report SET status='Cancelled' WHERE id='$id'";

if ($conn->query($sql) === TRUE){
    echo 'Order Cancelled';
}
$conn->close();
?>