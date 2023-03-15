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
$year = $_POST['year'];
$items_length = count($items);
$ticketNumber = $_POST['cafeticket'];
$currentUser = $_SESSION['cashier'];
$quantity = $_POST['quantity'];

if ($items_length > 1) {
    if ($items[0] != 'Adult Pass' &&  $items[0] != 'Adult Socks' && $items[0] != 'Kid Socks') {
        $qty = $quantity;
    } else {
        $qty = 1;
    }
    $sql .= "INSERT INTO playground_report(ticketNumber, item, amount, user, time, date, year, quantity) VALUES($ticketNumber, '$items[0]', $pricelist[0], '$currentUser', '$time', '$date', '$year', '$qty');";
    for ($i = 1; $i < $items_length; $i++){
        if ($items[$i] != 'Adult Pass' && $items[$i] != 'Adult Socks' && $items[$i] != 'Kid Socks') {
            $qty = $quantity;
        } else {
            $qty = 1;
        }
        $sql .= "INSERT INTO playground_report(ticketNumber, item, amount, user, time, date, year, quantity) VALUES($ticketNumber, '$items[$i]', $pricelist[$i], '$currentUser', '$time', '$date', '$year', '$qty');";
    }
    if ($conn->multi_query($sql) === TRUE){
        echo 'success';
    } else {
        echo 'not success';
    }
    
} elseif ($items_length == 1){
    if ($items[0] != 'Adult Pass' &&  $items[0] != 'Adult Socks' && $items[0] != 'Kid Socks') {
        $qty = $quantity;
    } else {
        $qty = 1;
    }
    $sql = "INSERT INTO playground_report(ticketNumber, item, amount, user, time, date, year, quantity) VALUES($ticketNumber, '$items[0]', $pricelist[0], '$currentUser', '$time', '$date', '$year', '$qty');";
    if ($conn->query($sql) === TRUE){
        echo 'success';
    } else {
        echo 'not success';
    }
}



$conn->close();
?>