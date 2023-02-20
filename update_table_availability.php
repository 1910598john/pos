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


$tabledId = $_POST['tablenumber'];

$sql = "UPDATE tables SET availability='occupied' WHERE table_id='$tabledId'";

if ($conn->query($sql) === TRUE){
    echo 'Table availability updated!';
} else {
    echo 'Error updating table.';
}
$conn->close();
?>