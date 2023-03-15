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
date_default_timezone_set('Asia/Manila');
$sql = "SELECT id, end_time FROM playground_time WHERE date='$date' AND year='$year' AND NOT status='removed'";
$ended_items = array();
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    $x = 0;
    while ($row = $result->fetch_assoc()) {
        if ($row['end_time'] != 'No time') {
            $time = date_create($row['end_time']);
            $end_time = date_format($time, "h:i A");
            if ($end_time < date("h:i A")) {
                $ended_items[$x] = $row['id'];
                $x += 1;
            }
        }
        
    }
    echo json_encode($ended_items);
}

$conn->close();
?>