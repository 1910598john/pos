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

$amount = intval($_POST['amount']);
$name = $_SESSION['cashier'];
$sql = "UPDATE cashier_auth SET balance = balance - $amount WHERE name='$name'";

if ($conn->query($sql) === TRUE){
    echo 'Order Cancelled';
}
$conn->close();
?>