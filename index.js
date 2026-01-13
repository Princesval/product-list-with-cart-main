let containerHTML = document.getElementById('container-grid');
let listaDeProdutos = [];

let cartHTML = document.getElementById('cart');
let cartCounter = document.getElementById('cart-counter');
let cart = [];

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
    console.log(cart)
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