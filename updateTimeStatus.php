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
$remaining_time = $_POST['rem'];

$sql = "UPDATE playground_time SET remaining_time='$remaining_time' WHERE id='$id'";

if ($conn->query($sql) === TRUE){
    echo 'Updated';
} else {
    echo 'Error updating time.';
}
$conn->close();
?>