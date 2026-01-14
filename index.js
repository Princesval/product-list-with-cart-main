let containerHTML = document.getElementById('container-grid');
let listaDeProdutos = [];

let cartHTML = document.getElementById('cart-div');
let cartCounter = document.getElementById('cart-counter');
let emptyCartImg = document.getElementById('empty-cart-img');
let emptyCartP = document.getElementById('empty-cart-p');
let cart = [];
let OrderFinalPriceUpdate = document.getElementById('order-final-price');
let finalPrice;

let confirmOrderDiv = document.getElementById('confirm-order');

const addDataToHTML = () => {
    containerHTML.innerHTML= '';
    if(listaDeProdutos.length > 0) {
        listaDeProdutos.forEach(produto => {
            let newProduto = document.createElement('div');
            newProduto.classList.add('card-dessert');
            newProduto.dataset.id = produto.id;
            newProduto.innerHTML = `
            <img src="${produto.image.desktop}" alt="">
            <button class="addToCart">
                <img src="assets/images/icon-add-to-cart.svg" alt="">
                Add to Cart
            </button>
            <p>${produto.category}</p>
            <h3>${produto.name}</h3>
            <span>$${produto.price.toFixed(2)}</span>`;
            containerHTML.appendChild(newProduto)
        })
    }
}

containerHTML.addEventListener('click', (event) => {
    let click = event.target;
    if(click.classList.contains('addToCart')){
        let produto_id = click.parentElement.dataset.id;
        addToCart(produto_id);
        }
})

const addToCart = (produto_id) => {
    let position = cart.findIndex((value) => value.produto_id == produto_id)
    if(cart.length <=0) {
        cart= [{
            produto_id: produto_id,
            quantity: 1
        }]
    } else if (position < 0) {
        cart.push({
            produto_id: produto_id,
            quantity: 1
        });
    } else {
        cart[position].quantity = cart[position].quantity + 1;
    }
    addToCartHTML();
}

const addToCartHTML = () => {
    cartHTML.innerHTML = ``;
    let totalQuantity = 0;
    finalPrice = 0;
    if(cart.length > 0) {
        emptyCartImg.style.display = 'none';
        emptyCartP.style.display = 'none';
        confirmOrderDiv.style.display = 'block'

        cart.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('cart-product-item');
            let position = listaDeProdutos.findIndex((value) => value.id == cart.produto_id);
            let info = listaDeProdutos[position];
            newCart.innerHTML += `
                <div class="info-product">
                    <p>${info.name}</p>
                    <p>
                    <span class="span-quantity">${cart.quantity}x</span> 
                    <span class="span-price">@$${info.price}</span> 
                    <span class="span-price-product-total">$${info.price * cart.quantity}</span></p>
                </div>

                <div class="cart-remove-button">
                    <button  class="remove-item" data-id="${cart.produto_id}">
                        <img src="assets/images/icon-remove-item.svg" alt="">
                    </button>
                </div>
            `;
            finalPrice += info.price * cart.quantity;
            cartHTML.appendChild(newCart)
            console.log(`Preço final: ${finalPrice}`);
            console.log(totalQuantity);
            OrderFinalPriceUpdate.innerText = `$${finalPrice.toFixed(2)}`;
        })
    }
    cartCounter.innerText = totalQuantity;
}

cartHTML.addEventListener('click', (event) => {
    const button = event.target.closest('.remove-item');
    if(!button) return;

    const produto_id = button.dataset.id;
    removeFromCart(produto_id);
})

const removeFromCart = (produto_id) => {
    let position = cart.findIndex(item => item.produto_id == produto_id);

    cart.splice(position, 1);

    addToCartHTML();
}


const initApp = () => {
    // Pegar dados do json
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        listaDeProdutos = data;
        console.log(listaDeProdutos);
        addDataToHTML();
    })
}

initApp();