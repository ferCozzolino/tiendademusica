
const stockDiscos = [] 
const contenedorDiscos = document.getElementById('discos__contenedor')  // --> para armar el catalogo
const url = "./discos.json";


// Uso del fetch para simular la obtencion  de los datos de una BD

fetch(url) //asincronico - Se llama al final de todo el codigo
.then( (respuesta) => respuesta.json())
.then( (discos) => {
    // console.log(discos)
    discos.forEach((disco) => {
        stockDiscos.push(disco)
    
    
    
    });
})  

// Recarga de los datos del .JSON //

document.addEventListener("DOMContentLoaded", (e) => {
    
    
    setTimeout( () => {
      mostrarDiscos(stockDiscos);
    }, 100)

  });





// Uso del LocalStorage

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('cesta')){
        cesta = JSON.parse(localStorage.getItem('cesta'))
        actualizarCesta()
    }
})

// Inyectado del html de los productos en  el DOM

let cesta =[];

function mostrarDiscos(disco) {

    stockDiscos.forEach((disco) => {
        const div = document.createElement('div')
        div.classList.add('disco')
        div.innerHTML = `
        <img src=${disco.img} alt= "portada">
        <h3>${disco.titulo}</h3>
        <p>${disco.artista}</p>
        <p>${disco.categoria}</p>
        <p class="precioDisco">Precio:$ ${disco.precio}</p>
        <button id="agregar${disco.id}" class="btnComprar">Comprar </button>
        `
        contenedorDiscos.appendChild(div)
        localStorage.setItem('cesta', JSON.stringify(cesta))
    
        const btn = document.getElementById(`agregar${disco.id}`) 
    
        btn.addEventListener ('click', () =>  {
        agregarCesta(disco.id)
        })
    
    });

    

}

// Agrego a la cesta el disco

const agregarCesta =(discoID) =>  {

    const existe = cesta.some (disco => disco.id === discoID) 
    if (existe){
        const disco = cesta.map (disco => {
           if (disco.id === discoID){
                disco.cantidad++
            }
        })
    } else {
        const item= stockDiscos.find((disc) => disc.id === discoID);
        cesta.push(item);
    }    
    actualizarCesta();

}

// Actualizacion de la Cesta de compra
const cestaContador = document.getElementById ('cestaQty') //--> Contador de Cesta
const contenedorCesta  = document.getElementById('cestaContenedor')  // --> para armar la cesta    

const precioTotal = document.getElementById('precioTotal') // --> Suma los valores 

const actualizarCesta = () => {
    contenedorCesta.innerHTML = "";
    cesta.forEach((disco) => {
        const div = document.createElement('div')
        div.className = ('discoEnCesta')
        div.innerHTML = `
            <p>${disco.titulo}</p>
            <p>${disco.precio}</p>
            <p>Cantidad: <span id="qty">${disco.cantidad}</span></p>
            <button onclick="sacarDeCesta(${disco.id})" class="btnBorrar">X</button>
  
        `
        contenedorCesta.appendChild(div)
        
      
    })
    
    cestaContador.innerText = cesta.length
    precioTotal .innerHTML  = cesta.reduce ((acum, prod) => acum + prod.precio, 0)

}

// Sacar item de la cesta de compras

const sacarDeCesta = ((discoID) => {
    const item =cesta.find((disco)  =>  {disco.id === discoID}) 
    const indice  = cesta.indexOf(item)
    cesta.splice( indice, 1)  
    actualizarCesta();
})

//Vaciar la cesta

const btnVaciar = document.getElementById('vaciarCesta')

btnVaciar.addEventListener('click', () => {
    cesta.length = 0
    actualizarCesta();
})






