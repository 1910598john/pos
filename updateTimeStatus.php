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
$status = 'ended';
$sql = "UPDATE playground_time SET status='$status' WHERE id='$id'";

if ($conn->query($sql) === TRUE){
    echo 'Status updated successfully!';
} else {
    echo 'Error updating status.';
}
$conn->close();
?>