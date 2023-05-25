<?php
session_start();
require_once "./config/connect.php";

    if (isset($_POST["width"]) && isset($_POST["height"]) && isset($_POST["zoom"]) && isset($_POST["canvasData"])){
        if (isset($_SESSION["username"])) {
            $username = $_SESSION["username"];
            $zoom = $_POST["zoom"];
            $width = $_POST["width"];
            $height = $_POST["height"];
            $canvasData = $_POST["canvasData"];
            $canvasData = json_decode($canvasData, true);
            $path = "../usersCanvasses/" . $username . ".json";

            if (file_exists($path)) {
                $userCanvassesJSON = file_get_contents("../usersCanvasses/" . $username . ".json");
                $userCanvasses = json_decode($userCanvassesJSON);
            }else{
                $userCanvasses = [];
            }

            $canvasId = count($userCanvasses);
            $userCanvasses[$canvasId]["zoom"] = $zoom;
            $userCanvasses[$canvasId]["width"] = $width;
            $userCanvasses[$canvasId]["height"] = $height;
            $userCanvasses[$canvasId]["canvasData"] = $canvasData;
            $updatedUserCanvassesJSON = json_encode($userCanvasses);
            file_put_contents($path, $updatedUserCanvassesJSON);

            $result = "OK";
        }else{
            $result = "NO_SESSION";
        }
    }else{
        $result = "ERROR";
    }

    echo ($result);
?>