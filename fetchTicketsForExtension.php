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
$date = $_POST['date'];

$sql = "SELECT ticketID FROM playground_time WHERE NOT item='Unlimited' AND date='$date' ";
$result = $conn->query($sql);
$tickets = array();
if ($result->num_rows > 0) {
    // output data of each row
    $x = 0;
    while($row = $result->fetch_assoc()) {
        $tickets[$x] = $row['ticketID'];
        $x += 1;
    }
    
} 
echo json_encode($tickets);
$conn->close();
?>