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

$id = $_POST['selected'];

$sql = "SELECT item, quantity FROM playground_time WHERE ticketID='$id'";
$result = $conn->query($sql);
$item = array();
if ($result->num_rows > 0) {
    // output data of each row
    $row = $result->fetch_assoc();
    $item[0] = $row['item'];
    $item[1] = $row['quantity'];
    echo json_encode($item);
} 

$conn->close();
?>