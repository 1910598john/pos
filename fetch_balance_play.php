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
$date = $_POST['date'];
$user = $_SESSION['cashier'];
$year = $_POST['year'];
$sql = "SELECT amount, quantity FROM detailed_report WHERE user='$user' AND section='play' AND date='$date' AND year='$year'";
$result = $conn->query($sql);
$items = array();
$amount = array();
$qty = array();
if ($result->num_rows >= 1) {
    // output data of each row
    $x = 0;
    while ($row = $result->fetch_assoc()) {
        $amount[$x] = $row['amount'];
        $qty[$x] = $row['quantity'];
        $x += 1;
    }
    $items[0] = $amount;
    $items[1] = $qty;
    echo json_encode($items);
}
$conn->close();
?>