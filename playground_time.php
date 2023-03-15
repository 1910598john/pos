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

$items = $_POST['items'];
$status = 'running';
$items_length = count($items);
$tickets = $_POST['cafeticket'];
$date = $_POST['date'];
$year = $_POST['year'];
$quantity = $_POST['quantity'];
date_default_timezone_set('Asia/Manila');

if ($items_length == 1){
    if ($items[0] == '1 hour') {
        $end_time = date("h:i A", strtotime("+1 hour"));
        $extended = 'false';
        //$remaining_time = 60 * 60; //convert into seconds
        $sql = "INSERT INTO playground_time(ticketID, item, status, date, year, extended, end_time, quantity) VALUES($tickets,'$items[0]', '$status', '$date','$year', '$extended', '$end_time', '$quantity')";
    } elseif ($items[0] == '2 hours'){
        $end_time = date("h:i A", strtotime("+2 hours"));
        $extended = 'false';
        //$remaining_time = 120 * 60; //convert into seconds
        $sql = "INSERT INTO playground_time(ticketID, item, status, date, year, extended, end_time, quantity) VALUES($tickets,'$items[0]', '$status', '$date','$year', '$extended', '$end_time', '$quantity')";
    } elseif ($items[0] == 'Unlimited') {
        $end_time = "No time";
        $extended = 'unli';
        //$remaining_time = 'No limit';
        $sql = "INSERT INTO playground_time(ticketID, item, status, date, year, extended, end_time, quantity) VALUES($tickets,'$items[0]', '$status', '$date','$year', '$extended', '$end_time', '$quantity')";
    }
      elseif ($items[0] == 'KTV') {
        $end_time = date("h:i A", strtotime("+1 hour"));
        //$remaining_time = 60 * 60;
        $extended = 'false';
        $sql = "INSERT INTO playground_time(ticketID, item, status, date, year, extended, end_time, quantity) VALUES($tickets,'$items[0]', '$status', '$date','$year', '$extended', '$end_time', '$quantity')";
    }
      elseif ($items[0] == 'Half hour') {
        $end_time = date("h:i A", strtotime("+30 minutes"));
        //$remaining_time = 30 * 60;
        $extended = 'false';
        $sql = "INSERT INTO playground_time(ticketID, item, status, date, year, extended, end_time, quantity) VALUES($tickets,'$items[0]','$status', '$date','$year', '$extended', '$end_time', '$quantity')";
    }

    if ($conn->query($sql) === TRUE){
        echo 'Success';
    } else {
        echo 'Error';
    }
}



$conn->close();
?>