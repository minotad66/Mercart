var total = 0;

/*/fetch('https://app.fakejson.com/q', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: "oBnzdo7RVLm0AiuXnIIwXw",
        "data": {
          "_repeat": 50,
          "id": "cryptoUUID",
          "image": "personAvatar",
          "name": "productName",
          "price": "numberInt|0,100000",
          "quantity": "numberInt",
          "size": "productSize",
          "status": "productOrderStatus"
        }
      })
    }).then(r => r.json()).then(console.log)*/

const data = [{
  id: "a82daa25-69e2-4b97-b961-24a757aee326",
  image: "https://robohash.org/odit.png?size=300x300",
  name: "Camiseta Node",
  price: 30000,
  quantity: 971,
  size: "L",
  status: "in-progress"
},

{
  id: "a82daa25-69e2-4b97-b961-24a757aee6754",
  image: "https://robohash.org/odit.png?size=300x300",
  name: "Camiseta COD",
  price: 60000,
  quantity: 911,
  size: "XL",
  status: "in-progress"
},

{
  id: "a82daa25-69e2-4b97-b961-24a7575yrge",
  image: "https://robohash.org/odit.png?size=300x300",
  name: "Camiseta Js",
  price: 180043,
  quantity: 271,
  size: "s",
  status: "in-progress"
}]


var fakePromise = Promise.resolve(data)
var repo = document.querySelector('#compra')
var compras = document.querySelector('.precios')

function precios(valor) {
  total += valor.price;
  compras.innerHTML = `sub total: ${total}`;
}

function product1() {
  fakePromise
    .then((hola) => {
      precios(hola[0]);
      repo.innerHTML += `<p class="card-text">${hola[0].name}, precio: ${hola[0].price}  talla: ${hola[0].size}<p>`;
    })
}

function product2() {
  fakePromise
    .then((hola) => {
      precios(hola[1]);
      repo.innerHTML += `<p class="card-text">${hola[1].name}, precio: ${hola[1].price}  talla: ${hola[1].size}<p>`;
    })
}

function product3() {
  fakePromise
    .then((hola) => {
      precios(hola[2]);
      repo.innerHTML += `<p class="card-text">${hola[2].name}, precio: ${hola[2].price}  talla: ${hola[2].size}<p>`;
    })
}

let form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
  event.preventDefault()
  alert('Gracias por tu compra!')
});


/*
function product1(){
    fakePromise()
    .then(console.log)
}*/