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

$pass = $_POST['pass'];

$sql = "SELECT password FROM auth WHERE password='$pass'";
$result = $conn->query($sql);
if ($result->num_rows >= 1) {
    echo 'confirmed';
} else {
    echo 'Not an admin password.';
}
$conn->close();
?>