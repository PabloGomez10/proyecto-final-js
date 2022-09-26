const sAlert = () => {

  Swal.fire({
    title: "Agregado al carrito"
  })

}
const sAlertDelete = () => {
  Swal.fire({
    icon: 'error',
    title: 'Se ha eliminado el producto',

  })
}
const sAlertCompra = () => {
  Swal.fire({
    icon: 'success',
    title: 'Compra Exitosa',
    showConfirmButton: false,
    timer: 1500
  })
}
let componentes = []

let backendForJSON = async () => {
  await fetch("backend.json")
    .then((responsive) => responsive.json())
    .then((datos) => {
      console.log(datos)
      componentes = {
        nombre,
        precio,
        id,
        imagenes
      } = datos;
      createCards()
      return componentes
    })
}
backendForJSON();




const divContainerProducts = document.querySelector(".container");
const cartItemsContainer = document.querySelector(".cartItemsContainer");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function createCards() {
  componentes.forEach((products) => {
    divContainerProducts.innerHTML += `
    
    <div class="card col-6" style="width: 18rem;">
            <img src="${products.imagenes}" class="card-img-top" alt="...">
            <div class="card-body">
            <h4>${products.nombre}</h4>
        <p>$${products.precio}</p>
        <button class="btnCarrito btn btn-primary" id="btn-agregar${products.id}">Agregar</button>
            </div>
  
   `;

  });

  addFunctionality();
}

function addFunctionality() {
  componentes.forEach((products) => {
    document
      .querySelector(`#btn-agregar${products.id}`)
      .addEventListener("click", () => {
        console.log(products);
        addToCart(products);
        sAlert()
      });
  });
}

function addToCart(products) {
  let existe = cart.some((productsItem) => productsItem.id === products.id);
  if (existe === false) {
    products.cantidad = 1;
    cart.push(products);
  } else {
    let prodFind = carrito.find((findProducts) => findProducts.id === products.id);
    prodFind.cantidad++;

  }

  console.log(cart);
  visualizarCarrito();
}

function visualizarCarrito() {
  cartItemsContainer.innerHTML = "";
  cart.forEach((products) => {
    cartItemsContainer.innerHTML += ` 
        
        
        <div class="row itemProduct">
        <div class="col-6">
            <div class="d-flex align-items-center h-100 border-bottom pb-2 pt-3 ">
               
                <h6 class="text-truncate ml-3 mb-0">${products.nombre}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0">${products.precio}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <div class="">
                
                <p class="mb-0 pb-0 mx-3 cantidad">${products.cantidad}</p>
                <button class="btn btn-primary btnCarrito" id="btn-borrar${products.id}"> <i class="fa-solid fa-trash"></i> </button>
                </div>

            </div>
        </div>
     </div>
        `;
  });
  sumOfTheTotal()
  localStorage.setItem("cart", JSON.stringify(cart));
  deleteProducts();
}

function deleteProducts() {
  cart.forEach((products) => {
    document
      .querySelector(`#btn-borrar${products.id}`)
      .addEventListener("click", () => {
        cart = cart.filter(
          (productoFilter) => productoFilter.id !== products.id
        );
        sAlertDelete()
        visualizarCarrito();
      });
  });
}

createCards();
visualizarCarrito();




function sumOfTheTotal() {

  let totalProducts = 0;
  const priceCartTotal = document.querySelector(".costado")
  const itemProduct = document.querySelectorAll(".itemProduct")

  itemProduct.forEach((item) => {
    let shoppingCartItemPriceElement = item.querySelector("p.item-price.mb-0")
    console.log(shoppingCartItemPriceElement)
    const priceOfTheItem = Number(shoppingCartItemPriceElement.textContent.replace("$", ""))

    const cantidad = item.querySelector(".cantidad")
    const itemCarritoCantidad = Number(
      cantidad.textContent
    )
    totalProducts = totalProducts + priceOfTheItem * itemCarritoCantidad;

  })
  priceCartTotal.innerHTML = ""
  priceCartTotal.innerHTML = `Total: ${totalProducts}$`;
  if (priceCartTotal.innerHTML == "Total: 0$") {
    priceCartTotal.innerHTML = "0$"
  }
}

function buttonCompra() {
  const buttonCompraCart = document.querySelector(".btn-success")
  buttonCompraCart.addEventListener("click", () => {
    sAlertCompra()
    const priceCartTotal = document.querySelector(".costado")
    priceCartTotal.innerHTML = "0$"
    const itemProduct = document.querySelector(".cartItemsContainer")
    itemProduct.innerHTML = ""
    localStorage.clear()
    cart.length = 0
  })

}
buttonCompra()