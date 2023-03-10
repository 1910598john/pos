<?php
session_start();

if (isset($_SESSION['cashier'])) {
    header('Location: http://localhost/pos/home.php');
}
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

$sql = "SELECT name, username, last_id, password FROM cashier_auth";
$result = $conn->query($sql);

if (isset($_POST['username'])){
    $uname = $_POST['username'];
    $pwd = $_POST['password'];
    $verifiedCashier = false;
    
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            if ($row["username"] == $uname && $row["password"] == $pwd) {
                $verifiedCashier = true;
                $lastid = $row['last_id'];
                $pos_user = $row['name'];
            }
        }
        if ($verifiedCashier) {
            
            
            $_SESSION["cashier"] = $pos_user;
            //header('Location: http://localhost/pos/home.php');
            
            if ($lastid != '0') {
                $_SESSION['logoutlastId'] = $lastid;
            }
            
            
            header('Location: http://localhost/pos/logged_in.php');
        } else {
            header('Location: http://localhost/pos/');
        }
    }
}
$conn->close();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Login</title>
    <link rel='stylesheet' type='text/css' media='screen' href='./css/main.css'>
    <script src="./js/jquery-3.6.2.js"></script>
</head>
<body>
<div class="login" id="login-container">
	<h1>LOGIN</h1>
    <form class="login-form" method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
    	<input type="text" name="username" placeholder="Username" required="required" />
        <input type="password" name="password" placeholder="Password" required="required" />
        <button type="submit" class="btn btn-primary btn-block btn-large">Let me in.</button>
        <a id="register" style="color:#fff;cursor:pointer;font-size:15px;padding:5px;">Register</a>
    </form>
</div>
<script src="./js/main.js"></script>
</body>
</html>