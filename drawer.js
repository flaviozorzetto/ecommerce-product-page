const burger = document.querySelector(".burger")
const drawer = document.querySelector(".blur-bg")

burger.addEventListener("click", () => {
    if(!burger.className.includes("crossed")){
        burger.className += " crossed"
        drawer.className = "blur-bg"
    } else {
        burger.className = "burger"
        drawer.className += " hidden"
    }

})