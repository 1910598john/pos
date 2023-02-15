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

if (isset($_SESSION['cashier'])) {
    $name = $_SESSION['cashier'];
    date_default_timezone_set('Asia/Manila');
    $date = date("h:i A");
    $sql = "UPDATE cashier_auth SET logged_in='$date' WHERE name='$name'";
    if ($conn->query($sql) === TRUE) {
        header('Location: http://localhost/pos/home.php');
    }
}

$conn->close();
?>