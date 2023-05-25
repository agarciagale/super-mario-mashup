<?php
session_start();
require_once "./config/connect.php";

    if (isset($_POST["email"]) && isset($_POST["username"]) && isset($_POST["password"])){
        $email = $_POST["email"];
        $username = $_POST["username"];

        $query = mysqli_query($connection, "SELECT username, email FROM users WHERE username = '$username' OR email = '$email'");

        if ($query -> num_rows > 0) {
            $queryResult = mysqli_fetch_array($query);
            if ($queryResult['username'] == $username) {
                $result = "USER_EXISTS";
            }else if ($queryResult['email'] == $email){
                $result = "EMAIL_EXISTS";
            }
        }else{
            $pass = $_POST["password"];
            $pass = password_hash($pass, PASSWORD_DEFAULT);
    
            if (isset($_FILES["profilePic"])) {
                $profilePic = $_FILES["profilePic"];
                $profilePicName = $profilePic["name"];
                $profilePicSize = $profilePic["size"];
                $profilePicType = $profilePic["type"];
                $temp = $profilePic['tmp_name'];
    
                $profilePicName = $username . "." . explode("/", $profilePicType)[1];
    
                if (!((strpos($profilePicType, "gif") || strpos($profilePicType, "jpeg") || strpos($profilePicType, "jpg") || strpos($profilePicType, "png") || strpos($profilePicType, "jfif") || strpos($profilePicType, "webp"))  && ($profilePicSize < 5000000))) {
                    $result = "BAD_FORMAT";
                }else if (!move_uploaded_file($temp, "../usersPics/" . $profilePicName)) {
                        $result = "FAILED_UPLOAD";
                }else{
                    $sql = "INSERT INTO users (email, username, password, profilePic) values ('$email', '$username', '$pass', '$profilePicName')";
                }
            }else{
                $sql = "INSERT INTO users (email, username, password) values ('$email', '$username', '$pass')";
            }
        }

        if (!isset($result)) {
            try{
                $query = mysqli_query($connection, $sql);

                if (isset($profilePic)) {
                    $result = array(
                        "username" => $username,
                        "profilePic" => $profilePicName
                    );
                    setcookie("profilePicSrc", $profilePicName, null, "/");
                }else{
                    $result = array(
                        "username" => $username
                    );
                }
                setcookie("logged_in", $username, null, "/");
                $_SESSION["username"] = $username;
            }catch (Exception $e){
                $result = "ERROR";
            }   
        }   
    }else{
        $result = "ERROR";
    }

    echo json_encode($result);

?>