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

$payment = intval($_POST['payment']);
$ticket = $_POST['ticket'];
$item = $_POST['itemName'];
$foo_payment = intval($_POST['foopayment']);
if ($item == 'Half hour' && $foo_payment == 60) {
    $new_item_name = '1 hour';
}
elseif (($item == '1 hour' && $foo_payment == 50) || ($item == 'Half hour' && $foo_payment == 110) || ($item == '2 hours' && $foo_paymentt == 0)) {
    $new_item_name = '2 hours';
} 
elseif ($item == '1 hour' && $foo_payment == 0) {
    $new_item_name = '1 hour';
}
elseif ($item == '2 hours' && $foo_payment == 50) {
    $new_item_name = 'Unlimited';
}
$sql = "UPDATE playground_report SET item='$new_item_name', amount = amount + $foo_payment WHERE ticketNumber='$ticket' AND item='$item'";

if ($conn->query($sql) === TRUE){
    echo 'Time extended!';
}

$conn->close();
?>