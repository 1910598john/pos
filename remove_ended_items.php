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

$sql = "UPDATE playground_time SET status='removed' WHERE status='ended'";

if ($conn->query($sql) === TRUE){
    echo 'Items removed!';
}
$conn->close();
?>