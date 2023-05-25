<?php
session_start();
require_once "./config/connect.php";

    if (isset($_POST["username"]) && isset($_POST["password"])){
        $username = $_POST["username"];
        $pass = $_POST["password"];

        try{
            $query = mysqli_query($connection, "SELECT username, password, profilePic FROM users WHERE username = '$username'");
            
            if ($query -> num_rows == 1){
                $user = mysqli_fetch_array($query);
                $hash = $user['password'];

                if (password_verify($pass, $hash)){    
                    $username = $user['username'];
                    $profilePic = $user['profilePic'];
                    
                    if (strlen($profilePic) > 0) {
                        $result = array(
                            "username" => $username,
                            "profilePic" => $profilePic
                        );
                        setcookie("profilePicSrc", $profilePic, null, "/");
                    }else{
                        $result = array(
                            "username" => $username
                        );
                    }
                    setcookie("logged_in", $username, null, "/");
                    $_SESSION["username"] = $username;
                }else{
                    $result = "NO_USERS";
                }
            }else{
                $result = "NO_USERS";
            }
        }catch (Exception $e){
            $result = "ERROR";
        }
    }

    echo json_encode($result);

?>