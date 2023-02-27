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
$id = $_POST['id'];

$sql = "SELECT ticket FROM cafe_report WHERE id='$id'";
$result = $conn->query($sql);
if ($result->num_rows >= 1) {
    $row = $result->fetch_assoc();
    echo $row['ticket'];
}
$conn->close();
?>