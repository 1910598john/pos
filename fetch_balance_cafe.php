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
$year = $_POST['year'];
$user = $_SESSION['cashier'];
$sql = "SELECT amount FROM detailed_report WHERE user='$user' AND section='cafe' AND date='$date' AND year='$year' AND is_cancelled='false'";
$result = $conn->query($sql);
$items = array();
if ($result->num_rows >= 1) {
    // output data of each row
    $x = 0;
    while ($row = $result->fetch_assoc()) {
        $items[$x] = $row['amount'];
        $x += 1;
    }
    echo json_encode($items);
}
$conn->close();
?>