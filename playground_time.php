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

if ($items_length > 1) {
    if ($items[0] == '1 hour') {
        $remaining_time = 60 * 60; //convert into seconds
    } elseif ($items[0] == '2 hours'){
        $remaining_time = 120 * 60; //convert into seconds
    } elseif ($items[0] == 'Unlimited') {
        $remaining_time = 'No time';
    }
    $sql = "INSERT INTO playground_time(item, remaining_time, status) VALUES('$items[0]', '$remaining_time','$status');";
    for ($i = 1; $i < $items_length; $i++){
        if ($items[$i] == '1 hour') {
            $remaining_time = 60 * 60; //convert into seconds
        } elseif ($items[$i] == '2 hours'){
            $remaining_time = 120 * 60; //convert into seconds
        } elseif ($items[$i] == 'Unlimited') {
            $remaining_time = 'No time';
        }
        $sql .= "INSERT INTO playground_time(item, remaining_time, status) VALUES('$items[$i]', '$remaining_time','$status');";
    }
    if ($conn->multi_query($sql) === TRUE){
        echo 'Success';
    } else {
        echo 'Error';
    }
    
} elseif ($items_length == 1){
    if ($items[0] == '1 hour') {
        $remaining_time = 60 * 60; //convert into seconds
    } elseif ($items[0] == '2 hours'){
        $remaining_time = 120 * 60; //convert into seconds
    } elseif ($items[0] == 'Unlimited') {
        $remaining_time = 'No time';
    }
    $sql = "INSERT INTO playground_time(item, remaining_time, status) VALUES('$items[0]', '$remaining_time','$status')";

    if ($conn->query($sql) === TRUE){
        echo 'Success';
    } else {
        echo 'Error';
    }
}



$conn->close();
?>