let warningWindow = document.getElementById('warning-window');
let returnBtns = document.getElementsByClassName("return-btn");
let userZone = document.getElementById("user-zone");
let userZoneOptions = document.getElementById("user-zone-options");
let signUpBtn = document.getElementById("sign-up-btn");
let signUpWindow = document.getElementById("sign-up-window");
let logInBtn = document.getElementById("log-in-btn");
let logInWindow = document.getElementById("log-in-window");
let closeSignUpWindowBtn = document.getElementById("close-sign-up-window");
let closeLogInWindowBtn = document.getElementById("close-log-in-window");
let profilePicLabel = document.getElementById("profile-pic-label");
let profilePicInput = document.getElementById("profile-pic-input");
let createSpriteMenu = document.getElementById("create-sprite-menu");
let bodyPartsMenu = document.getElementById("body-parts-menu");
let optionBtns = document.getElementsByClassName("option-btn");
let savedSpritesMenu = document.getElementById("saved-sprites-menu");
let savedSpritesMenuWrapper = document.getElementById("saved-sprites-menu-wrapper");
let savedSpritesList = document.getElementById("saved-sprites-list");
let uploadBackgroundImageLabel = document.getElementById("upload-background-image");
let uploadBackgroundImageInput = document.getElementById("upload-background-image-input");
let backgroundsMenu = document.getElementById("backgrounds-menu");
let backgroundsList = document.getElementById("backgrounds-list");
let sceneBuilder = document.getElementById("scene-builder");
let backgroundSceneBuilder = document.getElementById("background-scene-builder");
let displayBackgroundMenuBtn = document.getElementById("display-background-menu-btn");
let deleteActiveObjectBtn = document.getElementById("delete-active-object-btn");
let clearCanvasBtn = document.getElementById("clear-canvas-btn");
let textBoxBtn = document.getElementById("text-box-btn");
let textColor = document.getElementById("text-color");
let fontSize = document.getElementById("font-size");
let textBackgroundColor = document.getElementById("text-background-color");
let spritesSceneBuilder = document.getElementById("sprites-scene-builder");
let sceneBuilderCenter = document.getElementById("scene-builder-center");
let stage = document.getElementById("stage");
let galleryMenu = document.getElementById("gallery-menu");
let downloadBtn = document.getElementById("download-btn");

let currentOption = optionBtns[0];
let currentMenu = document.getElementById("heads-menu");

// Sounds
const damageSound = new Audio("http://localhost/mario-mashup/assets/sounds/damage-sound.mp3");

// Sliders
let ySlider = document.getElementById("y-slider");
let widthSlider = document.getElementById('width-slider');
let heightSlider = document.getElementById('height-slider');
let skewSliderX = document.getElementById('skew-slider-x');
let skewSliderY = document.getElementById('skew-slider-y');
let scaleSlider = document.getElementById('scale-slider');
let angleSlider = document.getElementById('angle-slider');
let resetIcons = document.getElementsByClassName("reset-icon");

// Buttons in sprite editor
let reverseButton = document.getElementById('reverse-button');
let deleteButton = document.getElementById('delete-button');
let saveSpriteButton = document.getElementById('save-sprite-btn');

// Buttons in the saved sprites menu
let addSpriteBtn = document.getElementById("add-sprite-btn");

let savedSprites = {};

let headsContainer = document.getElementById("heads-menu");
let headsDivs = headsContainer.children;

let bodiesContainer = document.getElementById("bodies-menu");
let bodiesDivs = bodiesContainer.children;

let legsContainer = document.getElementById("legs-menu");
let legsDivs = legsContainer.children;

let headSelector = document.getElementById("head-selector");
let bodySelector = document.getElementById("body-selector");
let legsSelector = document.getElementById("legs-selector");

let headPath;
let headWidth;
let headHeight;

let bodyPath;
let bodyWidth;
let bodyHeight;

let legsPath;
let legsWidth;
let legsHeight;

let activeBodyPart;
let activeBodyPartSelector;

let idSprite = 0;
let zoomed = false;
let zoomedImage;
let draggableImage;
let draggableText;
let defaultScaleFactor = 1;
let backgroundSeted = false;
let currentBackgroundData = null;

// FABRIC.JS STUFF
let drawingModeBtn = document.getElementById("drawing-mode-btn");
let pencilWidthSlider = document.getElementById("drawing-line-width");
let pencilWidthIndicator = document.getElementById("pencil-width-indicator");
let pincelColorPicker = document.getElementById("drawing-color-picker");
let pincelShadowColorPicker = document.getElementById("drawing-shadow-color-picker");
let pincelShadowBlurSlider = document.getElementById("drawing-shadow-blur");
let pincelShadowBlurIndicator = document.getElementById("drawing-shadow-blur-indicator");
let pincelShadowOffsetSlider = document.getElementById("drawing-shadow-offset");
let pincelShadowOffsetIndicator = document.getElementById("drawing-shadow-offset-indicator");

// Taking the canvas element from the DOM and creating a fabric.js app
let sceneBuilderCanvas = new fabric.Canvas("scene-builder-canvas");
// sceneBuilderCanvas.setDimensions({
//     width: 1200,
//     height: 750
// });
addBackground(backgroundsList.getElementsByTagName("img")[0].src)
sceneBuilderCanvas.isDrawingMode = false;

// Creating the pencil brush
sceneBuilderCanvas.freeDrawingBrush = new fabric.PencilBrush(sceneBuilderCanvas);
sceneBuilderCanvas.freeDrawingBrush.shadow = new fabric.Shadow({
    color: "rgba(255,255,255)",
    blur: 0,
    offsetX: 0,
    offsetY: 0
});
sceneBuilderCanvas.freeDrawingBrush.color = 'black';
sceneBuilderCanvas.freeDrawingBrush.width = 5;

// Event listener for the button to trigger the drawing mode
drawingModeBtn.addEventListener("click", ()=>{
    drawingModeBtn.classList.toggle("btn-active");
    sceneBuilderCanvas.isDrawingMode = !sceneBuilderCanvas.isDrawingMode;
});

// Event listener for the line width slider
pencilWidthSlider.addEventListener("input", () =>{
    let pencilWidth = parseInt(pencilWidthSlider.value)
    sceneBuilderCanvas.freeDrawingBrush.width = pencilWidth;
    pencilWidthIndicator.innerText = pencilWidth;
})

// Event listener for the pincel color picker
pincelColorPicker.addEventListener('input', () => {
    sceneBuilderCanvas.freeDrawingBrush.color = pincelColorPicker.value;
});

// Event listener for the pincel shadow color picker
pincelShadowColorPicker.addEventListener('input', () => {
    sceneBuilderCanvas.freeDrawingBrush.shadow.color = pincelShadowColorPicker.value;
});

// Event listener for the pincel shadow blur slider
pincelShadowBlurSlider.addEventListener("input", () =>{
    let blurWidth = parseInt(pincelShadowBlurSlider.value);
    sceneBuilderCanvas.freeDrawingBrush.shadow.blur = blurWidth;
    pincelShadowBlurIndicator.innerText = pincelShadowBlurSlider.value;
})

// Event listener for the pincel shadow offset slider
pincelShadowOffsetSlider.addEventListener("input", () =>{
    let offset = parseInt(pincelShadowOffsetSlider.value)
    sceneBuilderCanvas.freeDrawingBrush.shadow.offsetX = offset;
    sceneBuilderCanvas.freeDrawingBrush.shadow.offsetY = offset;
    pincelShadowOffsetIndicator.innerText = pincelShadowOffsetSlider.value;
})

// Function for playing audios
function playAudio(audio) {
    audio.play();
}

// Functior displaying a warning window
function showWarningWindow(message, type=null, duration = 3000) {
    if (!warningWindow.classList.contains("show")) {
        if (type === "error") {
            warningWindow.style.color = "red";
        }else if (type === "success"){
            warningWindow.style.color = "green";
        }else{
            warningWindow.style.color = "black";
        }
        
        warningWindow.innerText = message;
        warningWindow.classList.add('show');
        
        setTimeout(function() {
          warningWindow.classList.remove('show');
        }, duration);
    }
}  

// Event listeners for the log-in and sign-up buttons (not web services, just for displaying the windows)
logInBtn.addEventListener("click", () => {
    logInWindow.classList.add("active-window");
    userZone.style.opacity = "0";
});

closeLogInWindowBtn.addEventListener("click", () => {
    logInWindow.classList.remove("active-window");
    userZone.style.opacity = "1";
});

signUpBtn.addEventListener("click", () => {
    signUpWindow.classList.add("active-window");
    userZone.style.opacity = "0";
});

closeSignUpWindowBtn.addEventListener("click", () => {
    signUpWindow.classList.remove("active-window");
    userZone.style.opacity = "1";
});

// Event listener for the input file image to display a message when a file uploads
profilePicInput.addEventListener("change", e => {
    if (profilePicLabel.childElementCount !== 2) {
        profilePicLabel.style.backgroundColor = "rgb(144, 238, 144)";
        let span = document.createElement("span");
        span.style.display = "block";
        span.style.width = "100px";
        span.textContent = "File uploaded";

        profilePicLabel.appendChild(span);
    }
})

for (let returnBtn of returnBtns) {
    returnBtn.addEventListener("click", ()=>{
        displaySceneBuilder();
    });   
}

// Event listeners for the options of the body parts menu selection
for (let option of optionBtns) {
    option.addEventListener("click", function () {
        currentOption.classList.remove("selected");
        currentOption = option;
        currentOption.classList.add("selected");

        currentMenu.style.display = "none";
        currentMenu = document.getElementById(option.getAttribute("data-value"));
        currentMenu.style.display = "flex";
    })
}

// Click events for each body part
for (let headDiv of headsDivs) {
    headDiv.addEventListener("click", function(){
        let image = headDiv.getElementsByTagName("img")[0];
        headWidth = image.clientWidth;
        headHeight = image.clientHeight;
        addHeadSprite(image.src, headWidth, headHeight);
    });
}
for (let bodyDiv of bodiesDivs) {
    bodyDiv.addEventListener("click", function(){
        let image = bodyDiv.getElementsByTagName("img")[0];
        bodyWidth = image.clientWidth;
        bodyHeight = image.clientHeight;
        addBodySprite(image.src, bodyWidth, bodyHeight);
    });
}
for (let legsDiv of legsDivs) {
    legsDiv.addEventListener("click", function(){
        let image = legsDiv.getElementsByTagName("img")[0];
        legsWidth = image.clientWidth;
        legsHeight = image.clientHeight;
        addLegsSprite(image.src, legsWidth, legsHeight);
    });
}

// Creating PIXI app and stage
let app = new PIXI.Application({
    width: 400,
    height: 600,
    backgroundColor: 0xCCCCCC
});
globalThis.__PIXI_APP__ = app;

stage.appendChild(app.view);

// Sprite container for the preview of the built character (this container will update when the user clicks on a body part)
let spriteContainer = new PIXI.Container();
let headSpriteContainer = new PIXI.Container();
let bodySpriteContainer = new PIXI.Container();
let legsSpriteContainer = new PIXI.Container();

spriteContainer.interactive = true;
headSpriteContainer.interactive = true;
bodySpriteContainer.interactive = true;
legsSpriteContainer.interactive = true;

spriteContainer.addChild(headSpriteContainer);
spriteContainer.addChild(bodySpriteContainer);
spriteContainer.addChild(legsSpriteContainer);

// Create Graphics object for making a border when hovering over a body part sprite
let border = new PIXI.Graphics();
spriteContainer.addChild(border);

// Adding the spriteContainer to the stage
app.stage.addChild(spriteContainer);

spriteContainer.x = 200;
spriteContainer.y = 100;

// Function for adding the head sprite to the headSpriteContainer and see it on the preview
function addHeadSprite(path, width, height){
    headPath = path;

    let headTexture = PIXI.Texture.from(path);

    let headSprite = new PIXI.Sprite(headTexture);

    headSprite.anchor.set(0.5, 0.5);
    headSprite.width = width;
    headSprite.height = height;

    if (headSpriteContainer.children.length > 0) {
        headSpriteContainer.removeChildAt(0);   
    }
    headSpriteContainer.addChild(headSprite);   
    updateSpriteSizes();
}

// Function for adding the body sprite to the bodySpriteContainer and see it on the preview
function addBodySprite(path, width, height){
    bodyPath = path;

    let bodyTexture = PIXI.Texture.from(path);

    let bodySprite = new PIXI.Sprite(bodyTexture);

    bodySprite.anchor.set(0.5, 0.5);
    bodySprite.width = width;
    bodySprite.height = height;

    if (bodySpriteContainer.children.length > 0) {
        bodySpriteContainer.removeChildAt(0);   
    }
    bodySpriteContainer.addChild(bodySprite);
    updateSpriteSizes();
}

// Function for adding the legs sprite to the legsSpriteContainer and see it on the preview
function addLegsSprite(path, width, height){
    legsPath = path;

    let legsTexture = PIXI.Texture.from(path);

    let legsSprite = new PIXI.Sprite(legsTexture);

    legsSprite.anchor.set(0.5, 0.5);
    legsSprite.width = width;
    legsSprite.height = height;

    if (legsSpriteContainer.children.length > 0) {
        legsSpriteContainer.removeChildAt(0);   
    }
    legsSpriteContainer.addChild(legsSprite);
    updateSpriteSizes();
}

// Function to set the active body part
function setActiveBodyPart(bodyPart, bodyPartSelector = null) {
    if (activeBodyPart) {
        activeBodyPart.alpha = 1;
    }
    if (activeBodyPart === bodyPart) {
        activeBodyPart = false;
        widthSlider.classList.remove("sliderBodyPart");
        heightSlider.classList.remove("sliderBodyPart");
        scaleSlider.classList.remove("sliderBodyPart");
        reverseButton.classList.remove("sliderBodyPart");
        deleteButton.classList.remove("sliderBodyPart");
    }else{
        activeBodyPart = bodyPart;
        bodyPart.alpha = 0.5;
        widthSlider.classList.add("sliderBodyPart");
        heightSlider.classList.add("sliderBodyPart");
        scaleSlider.classList.add("sliderBodyPart");
        reverseButton.classList.add("sliderBodyPart");
        deleteButton.classList.add("sliderBodyPart");
    }

    if (!bodyPartSelector) {
        switch (bodyPart) {
            case headSpriteContainer:
                bodyPartSelector = headSelector;
                break;
            case bodySpriteContainer:
                bodyPartSelector = bodySelector;
                break;
            case legsSpriteContainer:
                bodyPartSelector = legsSelector;
                break;
            default:
                bodyPartSelector = null;
                break;
        }
    }

    if (activeBodyPartSelector) {
        activeBodyPartSelector.classList.remove("activeBodyPartSelector");
        if (activeBodyPartSelector === bodyPartSelector){
            activeBodyPartSelector = null;
            bodyPartSelector = null;
        }
    }
    if (bodyPartSelector) {
        bodyPartSelector.classList.add("activeBodyPartSelector");
        activeBodyPartSelector = bodyPartSelector;
    }
}

// Event listeners for each body part container
spriteContainer.children.forEach((bodyPart) => {
    bodyPart.on("click", () => {
        setActiveBodyPart(bodyPart);
    });
    bodyPart.on('pointerover', () => {
        document.body.style.cursor = 'pointer';
        // Add border graphics to container
        border.lineStyle(3, "yellow", 1);
        border.drawRect(
        // Casting to absolute number the body part width and height in case the are scaled to a negative numbers because of the reverse button
        bodyPart.x - Math.abs(bodyPart.width) / 2 - 5,
        bodyPart.y - Math.abs(bodyPart.height) / 2 - 5,
        Math.abs(bodyPart.width) + 10,
        Math.abs(bodyPart.height) + 10
        );
    });
    bodyPart.on('pointerout', () => {
        document.body.style.cursor = 'default';
        // Reset border graphics from container
        border.clear();
    });
});

// Event listeners for the body part selectors in the edit panel
headSelector.addEventListener("click", () => {
    setActiveBodyPart(headSpriteContainer, headSelector)
});
bodySelector.addEventListener("click", () => {
    setActiveBodyPart(bodySpriteContainer, bodySelector)
});
legsSelector.addEventListener("click", () => {
    setActiveBodyPart(legsSpriteContainer, legsSelector)
});

// Event listeners for the sliders
ySlider.addEventListener("input", () => {
    let newY = parseInt(ySlider.value);
    spriteContainer.y = newY;
});
widthSlider.addEventListener("input", () => {
    if (activeBodyPart) {
        activeBodyPart.width = widthSlider.value;
    }else{
        spriteContainer.width = widthSlider.value;
    }
});
heightSlider.addEventListener("input", () => {
    if (activeBodyPart) {
        activeBodyPart.height = heightSlider.value;
        updateSpriteSizes();
    }else{
        spriteContainer.height = heightSlider.value;
    }
});
skewSliderX.addEventListener("input", () => {
    let skewValue = parseFloat(skewSliderX.value);

    spriteContainer.skew.x = skewValue;
});
skewSliderY.addEventListener("input", () => {
    let skewValue = parseFloat(skewSliderY.value);

    spriteContainer.skew.y = skewValue;
});
scaleSlider.addEventListener("input", () => {
    let scaleValue = parseFloat(scaleSlider.value);
    if (activeBodyPart) {
        if (activeBodyPart.scale.x < 0) {
            activeBodyPart.scale.x = scaleValue * -1;
            activeBodyPart.scale.y = scaleValue;
        }else{
            activeBodyPart.scale.set(scaleValue);
        }
        updateSpriteSizes();
    }else{
        if (spriteContainer.scale.x < 0) {
            spriteContainer.scale.x = scaleValue * -1;
            spriteContainer.scale.y = scaleValue;
        }else{
            spriteContainer.scale.set(scaleValue);
        }
    }
});
angleSlider.addEventListener('input', () => {
    let angleInDegrees = angleSlider.value;
    let angleInRadians = angleInDegrees * (Math.PI / 180);
    spriteContainer.rotation = angleInRadians;
});
reverseButton.addEventListener('click', () => {
    if (activeBodyPart) {
        activeBodyPart.scale.x *= -1;
    }else{
        spriteContainer.scale.x *= -1;
    }
});
deleteButton.addEventListener('click', () => {
    if (activeBodyPart) {
        if (activeBodyPart.children.length > 0) {
            activeBodyPart.removeChildAt(0);   
        }
    }else{
        if (headSpriteContainer.children.length > 0) {
            headSpriteContainer.removeChildAt(0);
        }
        if (bodySpriteContainer.children.length > 0) {
            bodySpriteContainer.removeChildAt(0);
        }
        if (legsSpriteContainer.children.length > 0) {
            legsSpriteContainer.removeChildAt(0);
        }
    }
    updateSpriteSizes();
});

// Event listener for the reset value icon to reset the slider
for (let icon of resetIcons) {
    icon.addEventListener("click", () =>{
        let input = icon.previousElementSibling;
        input.value = parseFloat(input.getAttribute("reset-value"));
        input.dispatchEvent(new Event("input"));
    });
}

// Function to render the spriteContainer as an image
function renderSpriteContainer() {
    headSpriteContainer.alpha = 1;
    bodySpriteContainer.alpha = 1;
    legsSpriteContainer.alpha = 1;
    let canvas = app.renderer.extract.canvas(app.stage);
    let imageData = canvas.toDataURL();

    return imageData;
}

// Event listener for the save sprite button
saveSpriteButton.addEventListener('click', () => {
    if (spriteIsEmpty()) {
        showWarningWindow("You need to add at least one part to your sprite!", "error");
    }else{
        idSprite++;
        savedSprites[idSprite] = renderSpriteContainer();
        addSprite();
        displaySceneBuilder();
        setTimeout(function(){
            updateSavedSpritesMenu();
        }, 1)
    }
});

// Event listener for loading the updated image in the background image upload button
uploadBackgroundImageInput.addEventListener('change', () => {
    let file = uploadBackgroundImageInput.files[0];
    let acceptedImageTypes = ["image/png", "image/jpeg", "image/gif", "image/jpg", "image/webp", "image/jfif"];
    
    if (file) {
      if (acceptedImageTypes.includes(file.type)) {
            let reader = new FileReader();
            reader.onload = function(e) {
            let imageSrc = e.target.result;
            addBackground(imageSrc);
            };
            reader.readAsDataURL(file); 
      }else{
        showWarningWindow("Only .png, .jpeg, .gif, .jpg, .webp and .jfif images are supported", "error", 5000);
      }
    }
});

// Event listeners for the body
document.addEventListener('mousemove', e => {
    if (draggableImage) {
      let rect = backgroundSceneBuilder.getBoundingClientRect();
      draggableImage.style.top = e.pageY - draggableImage.clientHeight/2 + "px";
      draggableImage.style.left = e.pageX - draggableImage.clientWidth/2 + "px";
      if (
        e.clientX - draggableImage.width/2 >= rect.left &&
        e.clientX + draggableImage.width/2 <= rect.right &&
        e.clientY - draggableImage.height/2 >= rect.top &&
        e.clientY + draggableImage.height/2 <= rect.bottom
      ) {
        draggableImage.style.boxShadow = "0px 0px 0px 0px";
        draggableImage.style.outline = "none";
        backgroundSceneBuilder.style.boxShadow = "0px 0px 40px 5px rgba(178, 222, 39)";
        document.body.style.cursor = "none";
      }else{
        draggableImage.style.boxShadow = "0px 0px 40px 5px red";
        draggableImage.style.outline = "2px solid black";
        backgroundSceneBuilder.style.boxShadow = "none";
        document.body.style.cursor = "move";
      }
    }
});

// Event listener for placing the dragged sprite on the scene builder canvas
document.addEventListener('mousedown', e => {
    if (draggableImage) {
        let rect = backgroundSceneBuilder.getBoundingClientRect();
        let halfWidth = draggableImage.width / 2;
        let halfHeight = draggableImage.height / 2;
      if (
        e.clientX - halfWidth >= rect.left &&
        e.clientX + halfWidth <= rect.right &&
        e.clientY - halfHeight >= rect.top &&
        e.clientY + halfHeight <= rect.bottom
      ) {
        let zoomLevel = sceneBuilderCanvas.getZoom();

        fabric.Image.fromURL(draggableImage.src, function(img){
            img.set({
                left: (e.clientX - rect.left - halfWidth) / zoomLevel,
                top: (e.clientY - rect.top  - halfHeight) / zoomLevel,
                scaleX: 1 / zoomLevel,
                scaleY: 1 / zoomLevel
              });
            sceneBuilderCanvas.add(img);
        });
        backgroundSceneBuilder.style.boxShadow = "none";
      }
      draggableImage.remove();
      document.body.style.cursor = "default";
      draggableImage = null;
    }
});

// Important! Function that resizes de canvas and the content inside. All of this is done thanks to a default scale value based on the canvas width...
function resizeCanvas(){
    if (backgroundSeted) {
        if (sceneBuilder.style.display === "flex") {
            let currentWidth = sceneBuilderCanvas.width;
            let currentHeight = sceneBuilderCanvas.height;
    
            let maxWidth = sceneBuilderCenter.offsetWidth;
            if (maxWidth > 1200) {
                maxWidth = 1200;
            }
            let newHeight = currentHeight * maxWidth / currentWidth;
            let scaleFactor = maxWidth / currentWidth;
    
            sceneBuilderCanvas.setDimensions({
                width: maxWidth,
                height: newHeight
            });
    
            let newScaleFactor = defaultScaleFactor * scaleFactor;
            sceneBuilderCanvas.setZoom(newScaleFactor);
    
            defaultScaleFactor = sceneBuilderCanvas.getZoom();   
        }
    }
}

// Important! Event listener that resizes de canvas and the content inside. All of this is done thanks to a default scale value based on the canvas width...
window.addEventListener("resize", resizeCanvas);

// Event listener for the add sprite button
addSpriteBtn.addEventListener("click", displaySpriteEditorMenu);

// Event listener for the background of the scene builder to display the background menu
displayBackgroundMenuBtn.addEventListener("click", displayBackgroundMenu);

// Event listener for deleting the active object in the scene builder canvas
deleteActiveObjectBtn.addEventListener("click", () =>{
    sceneBuilderCanvas.getActiveObjects().forEach((obj) => {
        sceneBuilderCanvas.remove(obj)
    });
});

// Event listener for the clear canvas button
clearCanvasBtn.addEventListener("click", () =>{
    sceneBuilderCanvas.clear();
    addBackground(currentBackgroundData);
});

// Event listener for adding a text box to the canvas
textBoxBtn.addEventListener("click", () =>{
    let textbox = new fabric.Textbox('Enter text', {
        left: sceneBuilderCanvas.width / 2 - 70,
        top: sceneBuilderCanvas.height / 2,
        width: 140,
        fontSize: fontSize.value,
        fontFamily: 'Arial',
        fill: textColor.value,
        backgroundColor: ""
    });
    
    sceneBuilderCanvas.setActiveObject(textbox);
    sceneBuilderCanvas.add(textbox);
});

// Event listener for changing the selected textbox properties
textColor.addEventListener('input', function() {
    let selectedObject = sceneBuilderCanvas.getActiveObject();
    if (selectedObject instanceof fabric.Textbox) {
        selectedObject.set('fill', this.value);
        sceneBuilderCanvas.renderAll();
    }
});
  
fontSize.addEventListener('input', function() {
    let selectedObject = sceneBuilderCanvas.getActiveObject();
    if (selectedObject instanceof fabric.Textbox) {
        selectedObject.set('fontSize', parseInt(this.value, 10));
        sceneBuilderCanvas.renderAll();
    }
});

textBackgroundColor.addEventListener('input', function() {
    let selectedObject = sceneBuilderCanvas.getActiveObject();
    if (selectedObject instanceof fabric.Textbox) {
        selectedObject.set('backgroundColor', this.value);
        sceneBuilderCanvas.renderAll();
    }
});

document.getElementById('transparent-text-background-color').addEventListener('click', () =>{
    let selectedObject = sceneBuilderCanvas.getActiveObject();
    if (selectedObject instanceof fabric.Textbox) {
        selectedObject.set('backgroundColor', "");
        sceneBuilderCanvas.renderAll();
    }
});

// Function to download the canvas as an image
function downloadCanvas() {
    let dataURL = sceneBuilderCanvas.toDataURL({
      format: 'png',
      quality: 1.0
    });
  
    var link = document.createElement('a');
    link.href = dataURL;
    link.download = 'mashup.png';
    
    link.click();
}

// Event listener for the download canvas btn
downloadBtn.addEventListener('click', downloadCanvas);

// Event listener for the sprites of the scene builder to display the sprites menu
spritesSceneBuilder.addEventListener("click", displaySavedSprites);

// Function to delete the selected sprite from the list and display again the remaining ones
function deleteSprite(id){
    delete savedSprites[id];
    document.getElementById(id).parentElement.classList.add("spriteDiscarded");
    setTimeout(() =>{
        document.getElementById(id).parentElement.remove();
        updateSavedSpritesMenu();
    }, 1000);
}

// Function to display the saved sprites menu
function displaySavedSprites(){
    if (savedSpritesMenu.style.height === "0px" || savedSpritesMenu.style.height === "") {
        savedSpritesMenu.style.height = savedSpritesMenuWrapper.clientHeight + "px";    
    }else{
        savedSpritesMenu.style.height = "0px";    
    }
}

// Function to update the saved sprites menu with the new sprite
function updateSavedSpritesMenu(){
    savedSpritesMenu.style.height = savedSpritesMenuWrapper.clientHeight + "px";
}

// Function to display the backgrounds menu screen
function displayBackgroundMenu(){
    sceneBuilder.style.display = 'none';
    // Settin display none to the background div for applying later the transition
    resetBackgroundMenu();
    backgroundsMenu.style.display = "flex";
}

// Event listeners for the backgrounds zoom function
for (let background of backgroundsList.children) {
    background.firstElementChild.addEventListener("click", zoomInBackground);
}

// Function to reset the background menu and prevent displaying it with a zoomed background
function resetBackgroundMenu(){
    for (let i = 0; i < backgroundsList.getElementsByClassName("confirm-buttons").length; i++) {
        backgroundsList.getElementsByClassName("confirm-buttons")[i].remove();
    }
    enableBackgroundsPointerEvents();
    if (zoomedImage) {
        zoomedImage.style.zIndex = "1";
        zoomedImage.classList.remove("zoomed");
        zoomedImage.style.transform = "scale(1)";   
    }
    zoomed = false;
}

// Function to zoom in the selected background
function zoomInBackground(event){
    let img = event.currentTarget;
    let divBackground = event.currentTarget.parentElement;

    divBackground.style.height = img.clientHeight + "px";

    if (zoomed) {
        zoomed = false;
        if (divBackground.getElementsByClassName("confirm-buttons").length > 0) {
            for (let i = 0; i < divBackground.getElementsByClassName("confirm-buttons").length; i++) {
                divBackground.getElementsByClassName("confirm-buttons")[i].remove();
            }
        }
        enableBackgroundsPointerEvents();
        img.style.transition= "0.3s";
        img.classList.remove("zoomed");
        img.style.transform = "scale(1)";
        setTimeout(() => {
            img.style.zIndex = "1";
            img.style.transition= "0s";
        }, 300);
    }else{ 
        zoomed = true;
        disableBackgroundsPointerEvents(divBackground);

        img.style.zIndex = "2";
        let x = divBackground.getBoundingClientRect().left;
        let y = divBackground.getBoundingClientRect().top;
        let imageWidth = img.clientWidth;
        let imageHeight = img.clientHeight;
        let bodyCenterX = document.body.clientWidth/2;
        let bodyCenterY = window.innerHeight/2;
        let differenceX = bodyCenterX - x - imageWidth/2 + 8;
        let differenceY = bodyCenterY - y - imageHeight/2 - 40;

        img.style.transition= "0.3s";
        img.classList.add("zoomed");
        img.style.transform = "translate(" + differenceX + "px," + differenceY + "px) scale(2)";
        // img.style.transform = "translateY(" + differenceY + "px) scale(2)";
        // img.style.transform = "translateX(" + differenceX + "px) scale(2)";

        zoomedImage = img;

        setTimeout(() => {
            img.style.transition= "0s";
            img.style.zIndex = "2";
            if (zoomed) {
                let divConfirmButtons = document.createElement("div");
                let confirmButton = document.createElement("button");
                divConfirmButtons.classList.add("d-flex", "p-absolute", "justify-content-center", "flex-wrap", "confirm-buttons");
                divConfirmButtons.style.top = img.getBoundingClientRect().bottom + window.scrollY + 20 + "px";
                confirmButton.textContent = "Confirm";
                confirmButton.removeEventListener("click", zoomInBackground);
                confirmButton.addEventListener("click", () => {
                    addBackground(img.src);
                });
                divConfirmButtons.appendChild(confirmButton);
                if (divBackground.getElementsByClassName("confirm-buttons").length > 0) {
                    for (let i = 0; i < divBackground.getElementsByClassName("confirm-buttons").length; i++) {
                        divBackground.getElementsByClassName("confirm-buttons")[i].remove();
                    }
                }
                divBackground.appendChild(divConfirmButtons);
            }
        }, 300);
    }
}

// Function to add the created sprite to the scene builder
function addSprite(){
    let divSprite = document.createElement("div");
    let img = document.createElement("img");
    let divCloseSign = document.createElement("div");
    let x = document.createElement("span");
    divCloseSign.appendChild(x);
    divSprite.appendChild(img);
    divSprite.appendChild(divCloseSign);

    img.src = savedSprites[idSprite];
    x.textContent = "x";

    divSprite.classList.add("d-flex", "saved-sprite", "justify-content-center", "align-items-center", "p-1", "mh-1", "m-bottom-1");
    divCloseSign.classList.add("d-flex", "justify-content-center", "p-absolute", "discard-sprite");
    divCloseSign.id = idSprite;

    divSprite.addEventListener("click", e =>{
        if (!e.target.classList.contains("discard-sprite") && e.target.tagName !== "SPAN") {
            draggableImage = document.createElement('img');
            draggableImage.src = img.src;
            draggableImage.style.position = 'absolute';
            draggableImage.style.zIndex = '9999';
            draggableImage.style.top = e.pageY - img.clientHeight/2 + "px";
            draggableImage.style.left = e.pageX - img.clientWidth/2 + "px";
            draggableImage.style.boxShadow = "0px 0px 40px 5px red";
            draggableImage.style.outline = "2px solid black";
            document.body.style.cursor = "move";
            document.body.appendChild(draggableImage);
        }
    });

    divCloseSign.addEventListener("click", () => {
        deleteSprite(divCloseSign.id);
        playAudio(damageSound);
    });

    savedSpritesList.appendChild(divSprite);
}

// Function to add the selected background to the scene builder canvas
function addBackground(backgroundData){
    currentBackgroundData = backgroundData;
    displaySceneBuilder();
    if (!backgroundSeted) {
        backgroundSeted = true;
    }
    defaultScaleFactor = 1;
    sceneBuilderCanvas.setZoom(1);

    let background = new Image();
    background.src = backgroundData;

    let computedStyles = window.getComputedStyle(sceneBuilderCenter);
    let maxWidthBackground = parseInt(computedStyles.getPropertyValue('width'));

    let maxWidth = maxWidthBackground;
    if (maxWidth > 1200) {
        maxWidth = 1200;
    }
    background.onload = function() {
        let newHeight = background.height * maxWidth / background.width;
        let backgroundImage = new fabric.Image(background);
        let scaleFactor = maxWidth / backgroundImage.width;
        backgroundImage.scale(scaleFactor);

        sceneBuilderCanvas.setBackgroundImage(backgroundImage, sceneBuilderCanvas.renderAll.bind(sceneBuilderCanvas));
        sceneBuilderCanvas.setDimensions({
            width: maxWidth,
            height: newHeight
        });
    };
}

// Function to display the scene builder
function displaySceneBuilder(){
    backgroundsMenu.style.display = "none";
    createSpriteMenu.style.display = "none";
    galleryMenu.style.display = "none";
    userZoneOptions.classList.remove("user-zone-options-visible");

    sceneBuilder.style.display = "flex";
    if (backgroundSeted) {
        resizeCanvas();   
    }
}

// Function to disable all pointer events on all backgrounds when zooming in in one and preventing bugs
function disableBackgroundsPointerEvents(divBackground){
    for (let i = 0; i < backgroundsList.childElementCount; i++) {
        if (backgroundsList.children[i] !== divBackground) {
            backgroundsList.children[i].style.transition = "0s";
            backgroundsList.children[i].style.pointerEvents = "none";
            backgroundsList.children[i].style.transition = "0.5s";
            backgroundsList.children[i].style.opacity = "0";
        }
    }
}

// Function to enable all pointer events on all backgrounds when zooming out one
function enableBackgroundsPointerEvents(){
    for (let i = 0; i < backgroundsList.childElementCount; i++) {
        backgroundsList.children[i].style.transition = "0s";
        backgroundsList.children[i].style.pointerEvents = "all";
        backgroundsList.children[i].style.transition = "0.5s";
        backgroundsList.children[i].style.opacity = "1";
    }
}

// Function to clean the sprite container (remove the childs contents) when returning to the sprite editor
// function cleanSpriteContainer(){
//     if (headSpriteContainer.children.length > 0) {
//         headPath = "";
//         headSpriteContainer.removeChildAt(0);   
//     }
//     if (bodySpriteContainer.children.length > 0) {
//         bodyPath = "";
//         bodySpriteContainer.removeChildAt(0);   
//     }
//     if (legsSpriteContainer.children.length > 0) {
//         legsPath = "";
//         legsSpriteContainer.removeChildAt(0);   
//     }
// }

// Function to check if at least 1 of the body parts nodes have children
function spriteIsEmpty(){
    if (headSpriteContainer.children.length > 0 || bodySpriteContainer.children.length > 0 || legsSpriteContainer.children.length > 0) {
        return false;
    }else{
        return true;
    }
}

// Function to return to the sprite editor screen when on the saved sprites menu
function displaySpriteEditorMenu() {
    sceneBuilder.style.display = "none";

    createSpriteMenu.style.display = "flex";
}

// Function to update the sprites positions when changes are made to an individual sprite...
function updateSpriteSizes(){
    let totalHeight = headSpriteContainer.height + bodySpriteContainer.height + legsSpriteContainer.height;

    headSpriteContainer.y = 0;
    bodySpriteContainer.y = headSpriteContainer.height - (headSpriteContainer.height - bodySpriteContainer.height)/2;
    legsSpriteContainer.y = headSpriteContainer.height + bodySpriteContainer.height - (headSpriteContainer.height - bodySpriteContainer.height)/2 - (bodySpriteContainer.height - legsSpriteContainer.height)/2;

    spriteContainer.pivot.set(0, (totalHeight / 2) - (headSpriteContainer.height / 2));
    spriteContainer.position.set(200, (spriteContainer.height / 2) + (600 - spriteContainer.height) / 2);
}