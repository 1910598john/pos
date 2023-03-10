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
$name = $_SESSION['cashier'];
if (isset($_SESSION['logoutlastId'])) {
    $lastid = $_SESSION['logoutlastId'];
    $sql = "SELECT id, section, item, amount, discounted, user, time, date, year, quantity FROM detailed_report WHERE id > '$lastid' AND year='$year' AND date='$date' AND user='$name' AND NOT is_cancelled='true'";
} else {
    $sql = "SELECT id, section, item, amount, discounted, user, time, date, year, quantity FROM detailed_report WHERE  date='$date' AND year='$year' AND user='$name' AND NOT is_cancelled='true'";
}


$result = $conn->query($sql);
$items = array();
$play = array();
$cafe = array();
$test = array();
if ($result->num_rows >= 1) {
    // output data of each row
    $x = 0;
    while($row = $result->fetch_assoc()) {
        $items[$x][0] = $row['id'];
        $items[$x][1] = $row['item'];
        $items[$x][2] = $row["amount"];
        $items[$x][3] = $row["discounted"];
        $items[$x][4] = $row["user"];
        $items[$x][5] = $row["time"];
        $items[$x][6] = $row["date"];
        $items[$x][7] = $row["quantity"];
        $x += 1;
        $last_id = $row["id"];
    }
    $_SESSION['lastId'] = $last_id;
    echo json_encode($items);
}

$conn->close();
?>