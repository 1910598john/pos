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
$user = $_SESSION['cashier'];
$sql = "SELECT balance FROM cashier_auth WHERE name='$user'";
$result = $conn->query($sql);
$items = array();
if ($result->num_rows >= 1) {
    // output data of each row
    $row = $result->fetch_assoc();
    echo $row['balance'];
}
$conn->close();
?>