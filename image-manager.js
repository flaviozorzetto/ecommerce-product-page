const displayImageContainer = document.querySelectorAll(".display-image");
const imageProductList = document.querySelectorAll(".image-container");
const lightboxImageList = document.querySelectorAll(".image-container-lightbox")
const mainImage = document.getElementById("image-displayer");
const nextBtn = document.querySelectorAll(".next-image");
const prevBtn = document.querySelectorAll(".prev-image");

// Image Renderer Functions
const imgPrefix = "./images/";
const urlManager = {
    product_1: imgPrefix + "image-product-1.jpg",
    product_2: imgPrefix + "image-product-2.jpg",
    product_3: imgPrefix + "image-product-3.jpg",
    product_4: imgPrefix + "image-product-4.jpg",
}

function selectNext() {
    let maxL = imageProductList.length;
    let changed = false
    imageProductList.forEach((e, i) => {
        if (e.className.includes("selected")) {
            let validator = (i + 1) == maxL ? 0 : (i + 1)
            changed ? null : (resetSelected(), bindClassName(imageProductList[validator], "selected"), bindClassName(lightboxImageList[validator], "selected"));
            changed = true;
        }
    })
    displaySelectedImg();
}

function selectPrev() {
    let changed = false
    let lastIndex = imageProductList.length - 1
    imageProductList.forEach((e, i) => {
        if (e.className.includes("selected")) {
            let validator = (i - 1) < 0 ? lastIndex : (i - 1)
            changed ? null : (resetSelected(), bindClassName(imageProductList[validator], "selected"), bindClassName(lightboxImageList[validator], "selected"));
            changed = true;
        }
    })
    displaySelectedImg();
}

function getSelectedImgPath() {
    const imageList = document.getElementsByClassName("image-container");
    let path;
    for (let i = 0; i < imageList.length; i++) {
        let element = imageList.item(i)
        if (/selected/gi.test(element.className)) {
            let renderedName = element.children[0].classList[1].replace("-", "_");
            path = urlManager[renderedName];
        };
    }
    return path;
}

function displaySelectedImg() {
    let path = getSelectedImgPath();
    displayImageContainer.forEach(e => e.style.backgroundImage = `url(${path})`);
}

// First Render
displaySelectedImg();

// Dom Manipulation Functions
function bindClassName(element, class_name) {
    element.className += ` ${class_name}`
}

function removeClassName(element, class_name) {
    element.className = element.className.replace(` ${class_name}`, "")
}

function resetSelected() {
    let elem = document.querySelectorAll(".selected");
    elem.forEach(e => {
        removeClassName(e, "selected");
    })
}

imageProductList.forEach((e,i) => {
    e.addEventListener("click", () => {
        if (e.className.includes(" selected")) {
            //
        } else {
            resetSelected();
            bindClassName(e, "selected");
            bindClassName(lightboxImageList[i], "selected");
            displaySelectedImg();
        }
    })
})

lightboxImageList.forEach((e,i) => {
    e.addEventListener("click", () => {
        if (e.className.includes(" selected")) {
            //
        } else {
            resetSelected();
            bindClassName(e, "selected");
            bindClassName(imageProductList[i], "selected");
            displaySelectedImg();
        }
    })
})

nextBtn.forEach(e => {
    e.addEventListener("click", () => {
        selectNext();
    })
}) 

prevBtn.forEach(e => {
    e.addEventListener("click", () => {
        selectPrev();
    })
}) 

const showLightboxListener = () => { removeClassName(lightbox, "hidden") }
const lightbox = document.querySelector(".lightbox");
let attachedMainClick = false

const mql = window.matchMedia("(max-width:950px)")
if(!mql.matches){
    mainImage.addEventListener("click", showLightboxListener);
    attachedMainClick = true
}

mql.addEventListener("change", () => {
    if(attachedMainClick){
        mainImage.removeEventListener("click", showLightboxListener);
        attachedMainClick = false
    } else {
        mainImage.addEventListener("click", showLightboxListener);
        attachedMainClick = true;
    }
})

const x = document.getElementById("close-lightbox");
x.addEventListener("click", () => {
    bindClassName(lightbox, "hidden")
})