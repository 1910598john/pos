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

$sql = "SELECT name, description, price, section, image_loc FROM products WHERE availability='available'";
$result = $conn->query($sql);
$products = array();
if ($result->num_rows > 0) {
    // output data of each row
    $x = 0;
    while($row = $result->fetch_assoc()) {
        $product = array();
        $product[0] = $row["name"];
        $product[1] = $row["description"];
        $product[2] = $row["price"];
        $product[3] = $row["section"];
        $product[4] = $row["image_loc"];
        $products[$x] = $product;
        $x += 1;
    }
    echo json_encode($products);
}

$conn->close();
?>