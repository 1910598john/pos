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
$items_length = count($items);
$currentUser = $_SESSION['cashier'];

if ($items_length > 1) {
    $sql = "INSERT INTO playground_report(item, amount, user, time) VALUES('$items[0]', $pricelist[0], '$currentUser', '$time');";
    for ($i = 1; $i < $items_length; $i++){
        $sql .= "INSERT INTO playground_report(item, amount, user, time) VALUES('$items[$i]', $pricelist[$i], '$currentUser', '$time');";
    }
    if ($conn->multi_query($sql) === TRUE){
        echo 'success';
    } else {
        echo 'not success';
    }
    
} elseif ($items_length == 1){
    $sql = "INSERT INTO playground_report(item, amount, user, time) VALUES('$items[0]', $pricelist[0], '$currentUser', '$time')";
    if ($conn->query($sql) === TRUE){
        echo 'success';
    } else {
        echo 'not success';
    }
}



$conn->close();
?>