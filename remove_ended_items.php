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
$year = $_POST['year'];
$sql="SELECT * FROM playground_time WHERE date='$date' AND year='$year'";
$result=$conn->query($sql);

$ID_LIST = $_POST['id_list'];
$len = count($ID_LIST);
for ($i = 0; $i < $len; $i++) {
    $sql1 = "UPDATE playground_time SET status='removed' WHERE id='" . $ID_LIST[$i] . "'";
    $result1=$conn->query($sql1);
}
if ($conn->query($sql) === TRUE){
    echo 'Items removed!';
}

$conn->close();
?>