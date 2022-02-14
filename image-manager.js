const displayImageContainer = document.getElementById("image-displayer");
const imageProductList = document.querySelectorAll(".image-container");

// Image Renderer Functions
const imgPrefix = "./images/";
const urlManager = {
    product_1 : imgPrefix + "image-product-1.jpg",
    product_2 : imgPrefix + "image-product-2.jpg",
    product_3 : imgPrefix + "image-product-3.jpg",
    product_4 : imgPrefix + "image-product-4.jpg",
}

function getSelectedImgPath () {
    const imageList = document.getElementsByClassName("image-container");
    let path;
    for(let i = 0; i < imageList.length; i++){
        let element = imageList.item(i)
        if(/selected/gi.test(element.className)) {
            let renderedName = element.children[0].classList[1].replace("-", "_");
            path = urlManager[renderedName];
        };
    }
    return path;
}

function displaySelectedImg () {
    let path = getSelectedImgPath();
    displayImageContainer.style.backgroundImage = `url(${path})`
}

// First Render
displaySelectedImg();

// Dom Manipulation Functions
function bindClassName(element, class_name){
    element.className += ` ${class_name}`
}

function removeClassName(element, class_name) {
    element.className = element.className.replace(` ${class_name}`, "")
}

function resetSelected() {
    let elem = document.querySelector(".selected");
    removeClassName(elem, "selected");
}

imageProductList.forEach(e => {
    e.addEventListener("click", () => {
        if(e.className.includes(" selected")){
            //
        } else {
            resetSelected();
            bindClassName(e, "selected");
            displaySelectedImg();
        }
    })
})




