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

$sql = "SELECT item, amount, time, ticket FROM cafe_report WHERE id='$id'";
$item = array();
$result = $conn->query($sql);
if ($result->num_rows == 1){
    $row = $result->fetch_assoc();
    $item[0] = $row['amount'];
    $item[1] = $row['time'];
    $item[2] = $row['ticket'];
    $item[3] = $row['item'];
    echo json_encode($item);
}
$conn->close();
?>