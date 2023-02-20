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
$time = $_POST['time'];
$date = $_POST['date'];
$items_length = count($items);
$ticketNumber = $_POST['tickets'];
$currentUser = $_SESSION['cashier'];

if ($items_length > 1) {
    $sql = "INSERT INTO playground_report(ticketNumber, item, amount, user, time, date) VALUES($ticketNumber[0], '$items[0]', $pricelist[0], '$currentUser', '$time', '$date');";
    for ($i = 1; $i < $items_length; $i++){
        $sql .= "INSERT INTO playground_report(ticketNumber, item, amount, user, time, date) VALUES($ticketNumber[$i], '$items[$i]', $pricelist[$i], '$currentUser', '$time', '$date');";
    }
    if ($conn->multi_query($sql) === TRUE){
        echo 'success';
    } else {
        echo 'not success';
    }
    
} elseif ($items_length == 1){
    $sql = "INSERT INTO playground_report(ticketNumber, item, amount, user, time, date) VALUES($ticketNumber[0], '$items[0]', $pricelist[0], '$currentUser', '$time', '$date')";
    if ($conn->query($sql) === TRUE){
        echo 'success';
    } else {
        echo 'not success';
    }
}



$conn->close();
?>