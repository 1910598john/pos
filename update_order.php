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
$action = $_POST['action'];
if ($action == 'delete'){
    $action = "deleted";
} elseif ($action == 'Cancel') {
    $action = 'Cancelled';
}

$sql = "UPDATE cafe_report SET status='$action' WHERE id='$id'";

if ($conn->query($sql) === TRUE){
    echo 'Status updated!';
} else {
    echo 'Error updating status.';
}




$conn->close();
?>