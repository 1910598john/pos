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
$sql = "SELECT id, ticket, item, time, status, table_id FROM cafe_report WHERE NOT status='deleted' AND date='$date' AND year='$year'";
$result = $conn->query($sql);
$items = array();
if ($result->num_rows >= 1) {
    // output data of each row
    $x = 0;
    while($row = $result->fetch_assoc()) {
        $entry = array();
        $entry[0] = $row["id"];
        $entry[1] = $row['ticket'];
        $entry[2] = $row["table_id"];
        $entry[3] = $row["item"];
        $entry[4] = $row["time"];
        $entry[5] = $row["status"];
        $items[$x] = $entry;
        $x += 1;
    }
    echo json_encode($items);
} else {
    echo 'No orders';
}

$conn->close();
?>