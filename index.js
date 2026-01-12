let containerHTML = document.getElementById('container-grid');
let listaDeProdutos = [];

const addDataToHTML = () => {
    containerHTML.innerHTML= '';
    if(listaDeProdutos.length > 0) {
        listaDeProdutos.forEach(produto => {
            let newProduto = document.createElement('div');
            newProduto.classList.add('card-dessert');
            newProduto.innerHTML = `
            <img src="${produto.image.desktop}" alt="">
            <button>Add to Cart</button>
            <p>${produto.category}</p>
            <h3>${produto.name}</h3>
            <span>$${produto.price.toFixed(2)}</span>`;
            containerHTML.appendChild(newProduto)
        })
    }
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