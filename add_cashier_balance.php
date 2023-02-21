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

$balance = $_POST['balance'];
$user = $_SESSION['cashier'];

$sql = "UPDATE cashier_auth SET balance = balance + $balance WHERE name='$user'";

if ($conn->query($sql) === TRUE){
    echo 'Balance updated.';
} else {
    echo $user;
}

$conn->close();
?>