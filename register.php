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

if (isset($_POST['username'])){
    $name = $_POST['name'];
    $uname = $_POST['username'];
    $pwd = $_POST['password'];

    $sql = "INSERT INTO cashier_auth (name, username, password, balance, last_id)
    VALUES ('$name', '$uname', '$pwd', '0', '0')";

    if ($conn->query($sql) === TRUE) {
        header('Location: http://localhost/pos/');
    } else {
        header('Location: http://localhost/pos/register.php');
    }
}
$conn->close();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Register</title>
    <link rel='stylesheet' type='text/css' media='screen' href='./css/main.css'>
    <script src="./js/jquery-3.6.2.js"></script>
</head>
<body>
<div class="login" id="login-container">
	<h1>REGISTER</h1>
    <form class="register-form" method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
        <input type="text" name="name" placeholder="Name" required="required" />
    	<input type="text" name="username" placeholder="Username" required="required" />
        <input type="password" name="password" placeholder="Password" required="required" />
        <button type="submit" class="btn btn-primary btn-block btn-large">Register.</button>
        <a id="login" style="color:#fff;cursor:pointer;font-size:15px;padding:5px;">Login</a>
    </form>
</div>
<script src="./js/main.js"></script>
</body>
</html>