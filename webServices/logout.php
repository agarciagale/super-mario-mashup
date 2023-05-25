<?php
session_start();

session_unset();
session_destroy();

setcookie("logged_in", "", time() - 3600, "/");
setcookie("profilePicSrc", "", time() - 3600, "/");

echo "OK";
?>