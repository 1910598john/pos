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

$items = $_POST['items'];
$pricelist = $_POST['pricelist'];
$current_user = $_SESSION['cashier'];
$time = $_POST['time'];
$date = $_POST['date'];
$items_length = count($items);
$order_status = "Pending";
$ticket = $_POST['cafeticket'];

if (isset($_POST['tablenumber'])) {
    $tableNumber = $_POST['tablenumber'];
}  else {
    $tableNumber = "None";
}


if ($items_length > 1) {
    $sql = "INSERT INTO cafe_report(ticket, item, amount, user, time, date, status, table_id) VALUES('$ticket', '$items[0]', $pricelist[0], '$current_user', '$time', '$date', '$order_status', '$tableNumber');";
    for ($i = 1; $i < $items_length; $i++){
        $sql .= "INSERT INTO cafe_report(ticket, item, amount, user, time, date, status, table_id) VALUES('$ticket', '$items[$i]', $pricelist[$i], '$current_user', '$time', '$date', '$order_status', '$tableNumber');";
    }
    if ($conn->multi_query($sql) === TRUE){
        echo 'success';
    } else {
        echo 'not success';
    }
} elseif ($items_length == 1) {
    $sql = "INSERT INTO cafe_report(ticket, item, amount, user, time, date, status, table_id) VALUES('$ticket', '$items[0]', $pricelist[0], '$current_user', '$time', '$date', '$order_status', '$tableNumber')";
    if ($conn->query($sql) === TRUE){
        echo 'success';
    } else{
        echo 'not success';
    }
}

$conn->close();
?>