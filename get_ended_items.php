<?php
session_start();
$items = $_SESSION['ended_items'];

echo json_encode($items);
?>