
console.log("bonjour");
if (document.readyState == 'loading'){

    document.addEventListener('DOMContentLoaded', ready)

}else {

    ready()
}

function ready () {

//console.log(123)

var cartlocal = localStorage.getItem("products")
var display = JSON.parse(cartlocal)

if(display != null){

    //console.log(display[0].title)
    for(var i=0; i < display.length; i++){

        addItemsToCart(display[i].title, display[i].price, display[i].imageSrc) 
    }
    //addItemsToCart(display[0].title, display[0].price, display[0].imageSrc) 

}else{

    //console.log("false")
}

////console.log(display)

var removeCartItemButtons = document.getElementsByClassName('btn-danger')
//console.log(removeCartItemButtons.length);

    for(var i = 0; i < removeCartItemButtons.length; i++){

        var  button = removeCartItemButtons[i]
        
        button.addEventListener('click', removeCartItem)
        
        
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')

    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')

    for(var i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

}

//FONCTION VALIDER L'ACHAT
function purchaseClicked() {


    
    //alert('thank you for your purchase')
    localStorage.removeItem("products");

    var cartItems = document.getElementsByClassName('cart-items')[0]
    
    while(cartItems.hasChildNodes()){

        cartItems.removeChild(cartItems.firstChild)
    }

    
    updateCartTotal()
}

//FONCTION SUPPRIMER ARTICLE
function removeCartItem(event){

    var buttonClicked = event.target
    var resultat = buttonClicked.parentElement.parentElement

   
    var echo = resultat.getElementsByClassName("cart-item-title")[0].innerText

    var cartlocal = localStorage.getItem("products")
    var display = JSON.parse(cartlocal)

    for (var i=0; i < display.length; i++ ) {

        if(display[i].title == echo){

            display.splice(i, 1);
            console.log(display); 

        }
    }
        
    localStorage.setItem("products", JSON.stringify(display))
    buttonClicked.parentElement.parentElement.remove()

    updateCartTotal()

}



//FONCTION CHANGEMENT QUANTITE
function quantityChanged(event) {
    
    var input = event.target
    if(isNaN(input.value) || input.value <= 0 ){

        input.value = 1
    }
    updateCartTotal()
}

//FONCTION ADD AU PANIER
function addToCartClicked(event){

    var button = event.target
    var shopItem = button.parentElement.parentElement
    

    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src

    let products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
    }
    for(var i=0; i < products.length; i++ ){
        
        if(products[i].title == title){

            return
        }
    }
    //let product = [title, price, imageSrc]
    let product = {title: title, price: price, imageSrc: imageSrc }

    products.push(product)
    localStorage.setItem('products', JSON.stringify(products));


    //console.log(title, price, imageSrc)
    addItemsToCart(title, price, imageSrc)
    updateCartTotal()
    ////console.log(title)

}

//FONCTION ADD AU PANIER
function addItemsToCart(title, price, imageSrc) {

    var cartRow = document.createElement('div')
    //cartRow.innerText = title
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title') 
    
    for(var i=0; i < cartItemNames.length; i++ ){
        
        if(cartItemNames[i].innerText == title){

            
            return
        }
    }
    var cartRowContents = `

    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>

    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`

    cartRow.innerHTML = cartRowContents                
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

}

//FONCTION ACTUALISE LE TOTAL PANIER
function updateCartTotal() {

    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')

    var total = 0
    for(var i = 0; i < cartRows.length ; i++){

        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]

        ////console.log(priceElement, quantityElement)
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value

        total = total + (price * quantity)
        ////console.log(price)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total

}
