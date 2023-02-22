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
    $lastid = $_SESSION['lastId'];
    $sql = "UPDATE cashier_auth SET logged_out='$date', balance = '0', last_id = '$lastid', status='inactive' WHERE name='$name'";
    if ($conn->query($sql) === TRUE) {
        unset($_SESSION['cashier']);
        $_SESSION['logoutlastId'] = $lastid;
        header('Location: http://localhost/pos/home.php');
    }
}
$conn->close();
?>