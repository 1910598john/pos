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
$itemName = $_POST['item'];
$sql = "SELECT discount FROM products WHERE name='$itemName'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    $row = $result->fetch_assoc();
    echo $row['discount'];
}

$conn->close();
?>