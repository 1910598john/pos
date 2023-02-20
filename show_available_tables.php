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

$sql = "SELECT table_id FROM tables";
$result = $conn->query($sql);
$avaible_list = array();
if ($result->num_rows > 0) {
    // output data of each row
    $x = 0;
    while($row = $result->fetch_assoc()) {
        $avaible_list[$x] = $row['table_id'];
        $x += 1;
    }
    echo json_encode($avaible_list);
}

$conn->close();
?>