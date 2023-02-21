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
$section = $_POST['section'];
if ($section == 'play') {
    $ticketNumber = $_POST['tickets'];
}
$items = $_POST['items'];
$pricelist = $_POST['price'];
$time = $_POST['time'];
$mon_and_date = $_POST['mon'];
$items_length = count($items);
$currentUser = $_SESSION['cashier'];
$discounted = $_POST['discounted'];
$cafeticket = $_POST['cafeticket'];

if ($items_length > 1) {
    if ($section == 'play') {
        $sql = "INSERT INTO detailed_report(ticketNumber, item, amount, discounted, user, time, date) VALUES($ticketNumber[0], '$items[0]', $pricelist[0], '$discounted', '$currentUser', '$time', '$mon_and_date');";

        for ($i = 1; $i < $items_length; $i++){
            $sql .= "INSERT INTO detailed_report(ticketNumber, item, amount, discounted, user, time, date) VALUES($ticketNumber[$i], '$items[$i]', $pricelist[$i],'$discounted', '$currentUser', '$time', '$mon_and_date');";
        }

    } else {
        $sql = "INSERT INTO detailed_report(ticketNumber, item, amount, discounted, user, time, date) VALUES('$cafeticket', '$items[0]', $pricelist[0],'$discounted', '$currentUser', '$time', '$mon_and_date');";

        for ($i = 1; $i < $items_length; $i++){
            $sql .= "INSERT INTO detailed_report(ticketNumber, item, amount, discounted, user, time, date) VALUES('$cafeticket', '$items[$i]', $pricelist[$i],'$discounted', '$currentUser', '$time', '$mon_and_date');";
        }
    }
    
    if ($conn->multi_query($sql) === TRUE){
        echo 'success';
    } else {
        echo 'not success';
    }
    
} elseif ($items_length == 1){
    if ($section == 'play') {
        $sql = "INSERT INTO detailed_report(ticketNumber, item, amount, discounted, user, time, date) VALUES($ticketNumber[0], '$items[0]', $pricelist[0],'$discounted', '$currentUser', '$time', '$mon_and_date')";
    } else {
        $sql = "INSERT INTO detailed_report(ticketNumber, item, amount, discounted, user, time, date) VALUES('$cafeticket', '$items[0]', $pricelist[0],'$discounted', '$currentUser', '$time', '$mon_and_date')";
    }
    
    if ($conn->query($sql) === TRUE){
        echo 'success';
    } else {
        echo 'not success';
    }
}

$conn->close();
?>