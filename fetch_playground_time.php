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
$sql = "SELECT id, item, remaining_time FROM playground_time WHERE status='running'";
$result = $conn->query($sql);
$items = array();
if ($result->num_rows > 0) {
    // output data of each row
    $x = 0;
    while($row = $result->fetch_assoc()) {
        $entry = array();
        $entry[0] = $row["id"];
        $entry[1] = $row["item"];
        $entry[2] = $row["remaining_time"];
        $items[$x] = $entry;
        $x += 1;
    }
    echo json_encode($items);
}

$conn->close();
?>