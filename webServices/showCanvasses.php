<?php
session_start();
require_once "./config/connect.php";

    if (isset($_SESSION["username"])) {
        $username = $_SESSION["username"];
        $path = "../usersCanvasses/" . $username . ".json";

        if (file_exists($path)) {
            $result = file_get_contents("../usersCanvasses/" . $username . ".json");
        }else{
            $result = "NOT_FOUND";
        }
    }else{
        $result = "NO_SESSION";
    }

    echo ($result);
?>