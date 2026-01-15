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
            <button class="plus-minus-btn">
                <span class="decrement-btn"><img src="assets/images/icon-decrement-quantity.svg" alt="-"></span>
                <span class="quantity-span">1</span>
                <span class="increment-btn"><img src="assets/images/icon-increment-quantity.svg" alt=""></span>
            </button>
            <p>${produto.category}</p>
            <h3>${produto.name}</h3>
            <span>$${produto.price.toFixed(2)}</span>`;
            containerHTML.appendChild(newProduto);
        });
            listaDeProdutos.forEach(produto => {
            updateCardButton(produto.id);
        });

    }
}

containerHTML.addEventListener('click', (event) => {
    let click = event.target;
    const btn = event.target.closest('.addToCart');
    if (btn) {
        let produto_id = btn.parentElement.dataset.id;
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
            OrderFinalPriceUpdate.innerText = `$${finalPrice.toFixed(2)}`;
        })
    } else if (cart.length == 0){
        emptyCartImg.style.display = 'block';
        emptyCartP.style.display = 'block';
        confirmOrderDiv.style.display = 'none'
    }
    cartCounter.innerText = totalQuantity;
    listaDeProdutos.forEach(produto => {
    updateCardButton(produto.id);})
}

const updateCardButton = (produto_id) => {
    const card = document.querySelector(`.card-dessert[data-id="${produto_id}"]`);

    if (!card) return;

    const addBtn = card.querySelector('.addToCart');
    const qtyBtn = card.querySelector('.plus-minus-btn');
    const qtySpan = card.querySelector('.quantity-span');
    const item = cart.find(item => item.produto_id == produto_id);

    if (item) {
        addBtn.style.display = 'none';
        qtyBtn.style.display = 'flex';
        qtySpan.innerText = item.quantity;
    } else {
        addBtn.style.display = 'flex';
        qtyBtn.style.display = 'none';
    }
}

containerHTML.addEventListener('click', (event) => {
    const card = event.target.closest('.card-dessert');
    if (!card) return;

    const produto_id = card.dataset.id;

    // +
    if (event.target.closest('.increment-btn')) {
        addToCart(produto_id);
    }

    // -
    if (event.target.closest('.decrement-btn')) {
        decrementItem(produto_id);
    }
});

const decrementItem = (produto_id) => {
    let position = cart.findIndex(item => item.produto_id == produto_id);
    if (position < 0) return;

    cart[position].quantity--;

    if (cart[position].quantity <= 0) {
        cart.splice(position, 1);
    }

    addToCartHTML();
};


cartHTML.addEventListener('click', (event) => {
    const button = event.target.closest('.remove-item');
    if(!button) return;

    const produto_id = button.dataset.id;
    removeFromCart(produto_id);
});

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
        addDataToHTML();
    })
}

initApp();