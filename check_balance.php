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

if (isset($_SESSION['logoutlastId'])) {
    $lastid = $_SESSION['logoutlastId'];
    $sql = "SELECT id, item, amount, discounted, user, time, date FROM detailed_report WHERE id > '$lastid' AND date='$date'";
} 

$result = $conn->query($sql);
$items = array();
if ($result->num_rows >= 1) {
    // output data of each row
    $x = 0;
    while($row = $result->fetch_assoc()) {
        $entry = array();
        $entry[0] = $row["id"];
        $entry[1] = $row['item'];
        $entry[2] = $row["amount"];
        $entry[3] = $row["discounted"];
        $entry[4] = $row["user"];
        $entry[5] = $row["time"];
        $entry[6] = $row["date"];
        $items[$x] = $entry;
        $x += 1;
    }
    $_SESSION['lastId'] = $items[$x - 1][0];
    echo json_encode($items);
}

$conn->close();
?>