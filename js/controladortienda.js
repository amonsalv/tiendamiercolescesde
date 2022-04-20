import {llenarTienda} from './llenadotienda.js'
import {ampliarInformacionProducto} from './amplianinfo.js'

//creo un producto vacio en el controlador 
let producto={}

//llamando a tienda llenado
llenarTienda()

//referencia al modal
let modalinfo = new bootstrap.Modal(document.getElementById('modalinformacion'))
let modalcompra = new bootstrap.Modal(document.getElementById('resumencompra'))

// rutina para ampliar informacion
let contenedorTienda=document.getElementById("filas")
contenedorTienda.addEventListener("click",function(evento){

    if(evento.target.classList.contains("btn")){
        producto=ampliarInformacionProducto(evento)
        console.log(producto)
        modalinfo.show()
    }
})

//rutina para el anadir un producto a la cesta a la cesta 
let carrito=[]
let botonAgregarCarrito=document.getElementById("botonadd")
botonAgregarCarrito.addEventListener("click",function(){

    //Debo capturar la cantidad y agregarla al producto 
    let cantidad=document.getElementById("cantidadProducto").value
    producto.cantidad=cantidad

    //agrego el producto al carrito
    carrito.push(producto)

    //pintar la capsula en el  carrito
    let suma=0
    carrito.forEach(function(producto){
        suma=suma+Number(producto.cantidad)
    })

    let capsula=document.getElementById("capsula")
    capsula.textContent=suma;
    capsula.classList.remove("invisible")

    console.log(carrito)
    modalinfo.hide()
})

//rutina para limpiar
let limpiar=document.getElementById("limpiar")
limpiar.addEventListener("click",function(){

    carrito=[]

    let capsula=document.getElementById("capsula") 
    capsula.classList.add("invisible")

})


//rutina para ver el carrito
let botonVerCarrito=document.getElementById("vercarrito")
botonVerCarrito.addEventListener("click",function(){

    //recorrer el carrito y pintar los productos
    let base=document.getElementById("basecarro")

    base.innerHTML=""

    carrito.forEach(function(producto){

        let fila=document.createElement("div")
        fila.classList.add("row")

        let columna1=document.createElement("div")
        columna1.classList.add("col-4")

        let columna2=document.createElement("div")
        columna2.classList.add("col-8")

        let foto=document.createElement("img")
        foto.classList.add("w-100","img-fluid")
        foto.src=producto.foto

        //PADRES E HIJOS
        columna1.appendChild(foto)
        fila.appendChild(columna1)
        fila.appendChild(columna2)
        base.appendChild(fila)

    })

    modalcompra.show()



})
