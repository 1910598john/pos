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

$item = $_POST['combo'];

if ($item == 'B1') {
    $sql = "SELECT id, name, description, image_loc FROM products WHERE name='Fries' OR description='Pizza Waffle' OR description='Drinks'";
} 
else if ($item == 'B2') {
    $sql = "SELECT id, name, description,   image_loc FROM products WHERE name='Fries' OR description='Sushi Roll' OR description='Drinks'";
} 
else if ($item == 'C1') {
    $sql = "SELECT id, name,description,  image_loc FROM products WHERE name='Fries' OR name='Spaghetti' OR description='Drinks'";
} 
else if ($item == 'C2') {
    $sql = "SELECT id, name,description,  image_loc FROM products WHERE name='Fries' OR name='Spaghetti'OR description='Chicken' OR name='Baked chicken with vege (half)' OR description='Drinks'";
} 
else if ($item == 'D1') {
    $sql = "SELECT id, name, description, image_loc FROM products WHERE name='Original Waffle' OR name='Ice cream with toppings' OR description='Drinks'";
} 
else if ($item == 'D2') {
    $sql = "SELECT id, name, description, image_loc FROM products WHERE name='Fries' OR name='Ice cream with toppings' OR description='Drinks'";
} 

$result = $conn->query($sql);
$products = array();

if ($result->num_rows > 0) {
    // output data of each row
    $x = 0;
    while($row = $result->fetch_assoc()) {
        $product = array();
        $product[0] = $row["id"];
        $product[1] = $row["name"];
        $product[2] = $row["image_loc"];
        $product[3] = $row["description"];
        $products[$x] = $product;
        $x += 1;
    }
    echo json_encode($products);
    
}


$conn->close();
?>