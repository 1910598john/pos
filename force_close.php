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

if (isset($_SESSION['logoutlastId'])){
    $lastid = $_SESSION['logoutlastId'];
    $user = $_SESSION['cashier'];

    $sql = "UPDATE cashier_auth SET last_id='$lastid' WHERE name='$user'";

    if ($conn->query($sql) === TRUE){
        echo 'Force closed!';
    }
}

$conn->close();
?>