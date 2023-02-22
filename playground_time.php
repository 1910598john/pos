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
$tickets = $_POST['tickets'];
$date = $_POST['date'];


if ($items_length > 1) {
    if ($items[0] == '1 hour') {
        $extended = 'false';
        $remaining_time = 60 * 60; //convert into seconds
    } elseif ($items[0] == '2 hours'){
        $remaining_time = 120 * 60; //convert into seconds
        $extended = 'false';
    } elseif ($items[0] == 'Unlimited') {
        $remaining_time = 'No limit';
        $extended = 'unli';
    }
      elseif ($items[0] == 'KTV') {
        $remaining_time = 120 * 60;
        $extended = 'false';
    }
      elseif ($items[0] == 'Half hour') {
        $remaining_time = 30 * 60;
        $extended = 'false';
    }
    $sql = "INSERT INTO playground_time(ticketID, item, remaining_time, status, date, extended) VALUES($tickets[0], '$items[0]', '$remaining_time','$status', '$date', '$extended');";
    for ($i = 1; $i < $items_length; $i++){
        if ($items[$i] == '1 hour') {
            $extended = 'false';
            $remaining_time = 60 * 60; //convert into seconds
        } elseif ($items[$i] == '2 hours'){
            $extended = 'false';
            $remaining_time = 120 * 60; //convert into seconds
        } elseif ($items[$i] == 'Unlimited') {
            $extended = 'unli';
            $remaining_time = 'No limit';
        }
          elseif ($items[$i] == 'KTV') {
            $remaining_time = 120 * 60;
            $extended = 'false';
        }
          elseif ($items[$i] == 'Half hour') {
            $remaining_time = 30 * 60;
            $extended = 'false';
        }
        $sql .= "INSERT INTO playground_time(ticketID, item, remaining_time, status, date, extended) VALUES($tickets[$i], '$items[$i]', '$remaining_time','$status', '$date', '$extended');";
    }
    if ($conn->multi_query($sql) === TRUE){
        echo 'Success';
    } else {
        echo 'Error';
    }
    
} elseif ($items_length == 1){
    if ($items[0] == '1 hour') {
        $extended = 'false';
        $remaining_time = 60 * 60; //convert into seconds
    } elseif ($items[0] == '2 hours'){
        $extended = 'false';
        $remaining_time = 120 * 60; //convert into seconds
    } elseif ($items[0] == 'Unlimited') {
        $extended = 'unli';
        $remaining_time = 'No limit';
    }
      elseif ($items[0] == 'KTV') {
        $remaining_time = 120 * 60;
        $extended = 'false';
    }
      elseif ($items[0] == 'Half hour') {
        $remaining_time = 30 * 60;
        $extended = 'false';
    }
    $sql = "INSERT INTO playground_time(ticketID, item, remaining_time, status, date, extended) VALUES($tickets[0],'$items[0]', '$remaining_time','$status', '$date', '$extended')";

    if ($conn->query($sql) === TRUE){
        echo 'Success';
    } else {
        echo 'Error';
    }
}



$conn->close();
?>