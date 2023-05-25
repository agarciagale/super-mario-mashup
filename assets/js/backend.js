let divRegisterButtons = document.getElementById('register-buttons');
let profilePicImage = document.getElementById('profile-pic');
let signUpAction = document.getElementById("sign-up-action");
let logInAction = document.getElementById("log-in-action");
let errorLogIn = document.getElementById("error-log-in");
let errorSignUp = document.getElementById("error-sign-up");
let saveCanvasBtn = document.getElementById("save-canvas-btn");
let userZoneLoggedOut = document.getElementById("user-zone-logged-out");
let userZoneLoggedIn = document.getElementById("user-zone-logged-in");
let showGalleryBtn = document.getElementById("show-gallery-btn");
let logOutBtn = document.getElementById("log-out-btn");
let canvassesList = document.getElementById("canvasses-list");
let canvassesJSON;

// Check if session still exists
if (checkCookie("logged_in")) {
    displayUserLoggedIn(getCookieValue("logged_in"), getCookieValue("profilePicSrc"));
}

// Event listeners
signUpAction.addEventListener("click", signUp)
logInAction.addEventListener("click", logIn)
saveCanvasBtn.addEventListener("click", saveCanvas);
userZone.addEventListener("click", displayUserOptions);
showGalleryBtn.addEventListener("click", showGallery);
logOutBtn.addEventListener("click", logOut);

function displayUserLoggedIn(username, profilePicSrc){
    resetFormFields();
    userZone.classList.add("user-zone-active");
    userZoneLoggedOut.style.display = "none";
    userZoneLoggedIn.style.display = "flex";
    userZoneLoggedIn.textContent = username;
    if (profilePicSrc) {
        profilePicImage.src = "http://localhost/mario-mashup/usersPics/" +  profilePicSrc;
    }
    logInWindow.classList.remove("active-window");
    signUpWindow.classList.remove("active-window");
    userZone.style.opacity = "1";
}

function resetFormFields(){
    document.getElementById("username-login").value = "";
    document.getElementById("password-login").value = "";
    document.getElementById("email-register").value = "";
    document.getElementById("username-register").value = "";
    document.getElementById("password-register").value = "";
}

function displayUserLoggedOut() {
    userZone.classList.remove("user-zone-active");
    userZoneLoggedOut.style.display = "flex";
    userZoneLoggedIn.style.display = "none";
    userZoneLoggedIn.textContent = "";
    profilePicImage.src = "http://localhost/mario-mashup/assets/icons/profile-circle.svg";
    logInWindow.classList.remove("active-window");
    signUpWindow.classList.remove("active-window");
    userZoneOptions.classList.remove("user-zone-options-visible");
    userZone.style.opacity = "1";
}

function logIn(){
    let username = document.getElementById("username-login").value;
    let pass = document.getElementById("password-login").value;

    if (username.length === 0 || pass.length === 0) {
        errorLogIn.textContent = "Please enter a username and password";
    }else{
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);

                if (response === "NO_USERS") {
                    errorLogIn.textContent = "User or password incorrect";
                }else if (response === "ERROR") {
                    errorLogIn.textContent = "Error when trying to login, please try again";
                }else{
                    if ("profilePic" in response) {
                        displayUserLoggedIn(response.username, response.profilePic);
                    }else{
                        displayUserLoggedIn(response.username, null);
                    }
                }
            }
        };
        xhttp.open("POST", "./webServices/logIn.php", true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhttp.send("username=" + username + "&password=" + pass);
    }
}

function signUp(){
    let email = document.getElementById("email-register").value;
    let username = document.getElementById("username-register").value;
    let pass = document.getElementById("password-register").value;
    let profilePic = document.getElementById("profile-pic-input").files;

    let formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", pass);

    if (username.length === 0 || pass.length === 0 || email.length === 0) {
        errorSignUp.textContent = "Please fill all the fields, profile pic is optional";
    }else{
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);

                if (response === "BAD_FORMAT") {
                    errorSignUp.textContent = "The extension or size of the files is not correct. Only .gif, .jpg, jpeg, .png., .jfif, .webp and 500 kb maximum size files are allowed.";
                }else if (response === "FAILED_UPLOAD"){
                    errorSignUp.textContent = "Error when uploading the image, if error persists, sign up without profile pic";
                }else if (response === "ERROR"){
                    errorSignUp.textContent = "Error when signing up, please try again";
                }else if (response === "USER_EXISTS"){
                    errorSignUp.textContent = "A user with that name already exists";
                }else if (response === "EMAIL_EXISTS"){
                    errorSignUp.textContent = "A user with that email already exists";
                }else{
                    if ("profilePic" in response) {
                        displayUserLoggedIn(response.username, response.profilePic);
                    }else{
                        displayUserLoggedIn(response.username);
                    }
                }
            }
        };
        xhttp.open("POST", "./webServices/signUp.php", true);

        if (profilePic.length > 0) {
            profilePic = profilePic[0];
            formData.append("profilePic", profilePic);
        }

        xhttp.send(formData);
    }
}

function saveCanvas(){
    if (checkCookie("logged_in")) {
        let formData = new FormData();
        let zoom = sceneBuilderCanvas.getZoom();
        let width = sceneBuilderCanvas.width;
        let height = sceneBuilderCanvas.height;
        let canvasData = JSON.stringify((sceneBuilderCanvas.toJSON()));
        formData.append("zoom", zoom);
        formData.append("width", width);
        formData.append("height", height);
        formData.append("canvasData", canvasData);

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let response = this.responseText;

                if (response === "NO_SESSION") {
                    showWarningWindow("You must be registered to save the canvas!", "error");
                }else if (response === "ERROR") {
                    showWarningWindow("Failed to save canvas!", "error");
                }else if (response === "OK"){
                    showWarningWindow("Canvas saved!", "success");
                }else{
                    showWarningWindow(response, "error");
                }
            }
        };
        xhttp.open("POST", "./webServices/saveCanvas.php", true);
        xhttp.send(formData);   
    }else{
        showWarningWindow("You must be registered to save the canvas!", "error");
    }
}

function checkCookie(cookieName) {
    let cookies = document.cookie.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();

      if (cookie.startsWith(cookieName + '=')) {
        return true;
      }
    }

    return false;
}

function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + '=')) {
        return cookie.substring(cookieName.length + 1);
      }
    }

    return null;
  }

function displayUserOptions(){
    if (userZone.classList.contains("user-zone-active")) {
        userZoneOptions.classList.toggle("user-zone-options-visible");
    }
}

function showGallery(){
    if (galleryMenu.style.display == "none") {
        if (checkCookie("logged_in")) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let response = this.responseText;
        
                    if (response === "NOT_FOUND") {
                        showWarningWindow("You dont have any canvas saved yet", "error");
                    }else if (response === "NO_SESSION") {
                        showWarningWindow("You must be registered to access the gallery", "error");
                    }else{
                        response = JSON.parse(this.responseText);
                        displayGalleryMenu(response);
                    }
                }
            };
            xhttp.open("POST", "./webServices/showCanvasses.php", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send();   
        }else{
            showWarningWindow("You must be registered to access the gallery", "error");
        }
    }
}

function displayGalleryMenu(canvasses){
    sceneBuilder.style.display = "none";
    userZoneOptions.classList.remove("user-zone-options-visible");
    canvassesList.innerHTML = "";

    for (let key in canvasses) {
        if (canvasses.hasOwnProperty(key)) {
            let div = document.createElement("div");
            div.classList.add("d-flex", "user-canvas", "justify-content-center", "align-items-center", "m-1");

            let zoom = canvasses[key]["zoom"];
            let width = canvasses[key]["width"];
            let height = canvasses[key]["height"];
            let canvasData = canvasses[key]["canvasData"];
            let scaledWidth = parseFloat(width) / parseFloat(zoom);
            let scaledHeight = parseFloat(height) / parseFloat(zoom);

            let canvas = new fabric.Canvas();
            canvas.setDimensions({
                width: scaledWidth,
                height: scaledHeight
            });
            canvas.loadFromJSON(canvasData, () =>{
                let image = new Image();
                image.src = canvas.toDataURL();
                image.width = 800;
                image.setAttribute("canvas-id", key);
                div.appendChild(image);
            });

            div.addEventListener("click", ()=>{
                sceneBuilderCanvas.clear();
                sceneBuilderCanvas.loadFromJSON(canvasData, () =>{
                    displaySceneBuilder();
                    let scaleFactor = sceneBuilderCanvas.width / scaledWidth;
                    currentBackgroundData = canvasData["backgroundImage"]["src"];
                    sceneBuilderCanvas.setZoom(scaleFactor);
                    defaultScaleFactor = sceneBuilderCanvas.getZoom();
                    sceneBuilderCanvas.renderAll();
                });
            })

            canvassesList.appendChild(div);
        }
    }

    galleryMenu.style.display = "flex";
}

function logOut(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = this.responseText;

            if (response === "OK") {
                displayUserLoggedOut();
            }else{
                alert(response);
            }
        }
    };
    xhttp.open("POST", "./webServices/logout.php", true);
    xhttp.send(); 
}