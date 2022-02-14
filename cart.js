const plusButton = document.getElementById("plus-button");
const minusButton = document.getElementById("minus-button");
const cartButton = document.querySelector(".shopping-cart");
const cartMenu = document.querySelector(".cart-menu");
const current = document.getElementById("current")
const addCartButton = document.getElementById("add-cart");
const cartOverlay = document.querySelector(".cart-quantity");

plusButton.addEventListener("click", () => {
    let currentVal = Number(current.innerHTML)
    current.innerHTML = currentVal + 1
})

minusButton.addEventListener("click", () => {
    let currentVal = Number(current.innerHTML)
    if(!currentVal == 0){
        current.innerHTML = currentVal - 1
    }
})

cartButton.addEventListener("click", () => {
    if(cartMenu.className.includes("hidden")){
        cartMenu.className = cartMenu.className.replace(" hidden", "");
    } else {
        cartMenu.className += " hidden";
    }
})

function createElement(elem, className){
    const element = document.createElement(elem);
    className ? element.className = className : null;
    return element
}

function removeSneaker(){
    const sneakersItem = document.querySelector(".fall-sneakers");
    const itemWrapper = document.querySelector(".items-wrapper");
    itemWrapper.removeChild(sneakersItem);
    let emptyContainer = itemWrapper.firstElementChild;
    emptyContainer.className = emptyContainer.className.replace(" hidden", ""); 
    cartOverlay.className += " hidden"
}

function updateSneaker(n) {
    const qt = document.querySelector(".quantity");
    const total = document.querySelector(".sneakers-total");

    qt.innerHTML = Number(qt.innerHTML) + n;
    total.innerHTML = `$${125 * qt.innerHTML},00`;
    cartOverlay.innerHTML = Number(cartOverlay.innerHTML) + n;
}

function createSneaker(n) {
    if(n == 0) { return }
    const itemWrapper = document.querySelector(".items-wrapper");
    let emptyContainer = itemWrapper.firstElementChild;
    if(!emptyContainer.className.includes("hidden")) {
        emptyContainer.className += " hidden";
        cartOverlay.className = cartOverlay.className.replace(" hidden", "")
        

        if(!itemWrapper.children.item(1).className.includes("fall-sneakers")) {
            const sneakerClass = createElement("div", "fall-sneakers");
            
            const sneakerThumb = createElement("div", "sneakers-thumb");
    
            const sneakerTitle = createElement("div", "sneakers-title");
            const spanText = createElement("span");
            spanText.innerHTML = "Fall Limited Edition Sneakers";
    
            const pricingDiv = createElement("div", "sneakers-pricing");
            pricingDiv.innerHTML = `$125,00 x <span class="quantity">${n}</span> <span class="sneakers-total">$${n * 125},00</span>`
            cartOverlay.innerHTML = n;

            const trashCanImg = createElement("img");
            trashCanImg.setAttribute("src", "images/icon-delete.svg")
            trashCanImg.className = "trash-can";
            trashCanImg.addEventListener("click", () => {
                removeSneaker();
            })
    
            sneakerTitle.appendChild(spanText);
            sneakerTitle.appendChild(pricingDiv);
            
            sneakerClass.appendChild(sneakerThumb);
            sneakerClass.appendChild(sneakerTitle);
            sneakerClass.appendChild(trashCanImg);
            
            itemWrapper.insertBefore(sneakerClass, itemWrapper.lastElementChild);
        }
    } else {
        updateSneaker(n);
    }
 
}

addCartButton.addEventListener("click", () => {
    createSneaker(Number(current.innerHTML));
})
