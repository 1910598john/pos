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
$sql = "SELECT id, ticketID, item, remaining_time, status, end_time FROM playground_time WHERE NOT status='removed' AND date='$date' AND year='$year'";
$result = $conn->query($sql);
$items = array();
$end_items = array();
date_default_timezone_set('Asia/Manila');
if ($result->num_rows > 0) {
    // output data of each row
    $x = 0;
    $y = 0;
    while($row = $result->fetch_assoc()) {
        $entry = array();
        $entry[0] = $row["id"];
        $entry[1] = $row["item"];
        $entry[2] = $row["remaining_time"];
        $entry[3] = $row["ticketID"];
        $entry[4] = $row['status'];
        
        if ($row['item'] != 'Unlimited') {
            if (new DateTime(date("h:i A m/d/y")) > new DateTime($row['end_time'])) {
                $end_time = $row["end_time"];
                $end_items[$y] = $row['id'];
                $y += 1;
            }
        }
        
        $items[$x] = $entry;
        $x += 1;
    }
    if ($end_items > 0) {
        $_SESSION['ended_items'] = $end_items;
    }
    
    echo json_encode($items);
}
$conn->close();
?>