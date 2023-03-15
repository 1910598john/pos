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

$ticket = $_POST['ticket'];

$sql = "SELECT amount FROM cafe_report WHERE ticket='$ticket'";
$amount = array();
$result = $conn->query($sql);
if ($result->num_rows > 0){
    $x = 0;
    while($row = $result->fetch_assoc()) {
        $amount[$x] = $row['amount'];
        $x += 1;
    }
    echo json_encode($amount);
}
$conn->close();
?>