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
$date = $_POST['date'];
$year = $_POST['year'];
$sql = "SELECT amount, quantity FROM detailed_report WHERE date='$date' AND year='$year' AND is_cancelled = 'false'";
$result = $conn->query($sql);
$items = array();
$quantity_list = array();
$amount_list = array();
if ($result->num_rows >= 1) {
    // output data of each row
    $x = 0;
    while($row = $result->fetch_assoc()) {
        $amount_list[$x] = $row['amount'];
        $quantity_list[$x] = $row['quantity'];
        $x += 1;
    }
    $items[0] = $amount_list;
    $items[1] = $quantity_list;
    echo json_encode($items);
} 

$conn->close();
?>