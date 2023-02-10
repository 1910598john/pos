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

$payment = intval($_POST['payment']);

$sql = "UPDATE playground_report SET amount = amount + $payment";

if ($conn->query($sql) === TRUE){
    echo 'Time extended!';
}

$conn->close();
?>