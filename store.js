
var removeCartItemButtons = document.getElementsByClassName('btn-danger')

for(var i = 0; i < removeCartItemButtons.length; i++){

    var  button = removeCartItemButtons[i]
    button.addEventListener('click', teste())
}

 function teste(){

    console.log("clicked")
}