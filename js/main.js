let articulosCarrito = []

const listaProductos = document.querySelector('#product-list')
//console.log(listaProductos)
const carrito = document.querySelector('#carrito')
//console.log(carrito)
const contenedorCarrito = document.querySelector('.buy-card .lista_carrito')
//console.log(contenedorCarrito)
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
//console.log(vaciarCarritoBtn)
document.addEventListener('DOMContentLoaded',()=>{
    if(JSON.parse(localStorage.getItem('carrito')) == null){
        articulosCarrito = []
        console.log(articulosCarrito)
    }else{
    articulosCarrito = JSON.parse(localStorage.getItem('carrito'))
    console.log(articulosCarrito)
    }
    carritoHTML();
})
listaProductos.addEventListener('click', agregarProducto);
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
carrito.addEventListener('click', eliminarProducto);
//agragar producto al carrito
function agregarProducto(evt){
    evt.preventDefault()
    if(evt.target.classList.contains('agregar-carrito')){
        const producto = evt.target.parentElement.parentElement;
        //console.log(producto)
        leerDatosPoducto(producto)
    }
}
//eliminar producto del carrito
function eliminarProducto(e){
    if(e.target.classList.contains('borrar-producto')){
        const productoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
        carritoHTML();
    }
}
// leer el contenido de nuestro html
function leerDatosPoducto(item){
    const infoProducto = {
        imagen: item.querySelector('img').src,
        nombre: item.querySelector('h3').textContent,
        precio: item.querySelector('.precio p').textContent,
        id: item.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }
    if(articulosCarrito.some( item=> item.id  === infoProducto.id)){
        const productos = articulosCarrito.map( producto =>{
        if(producto.id === infoProducto.id){
            let cantidad = parseInt(producto.cantidad);
            cantidad+=1;
            producto.cantidad = cantidad;
            return producto
        }else{
            return producto
        }
    })
    articulosCarrito = productos.slice();
}else{
    articulosCarrito.push(infoProducto)
    //console.log(articulosCarrito)
}
carritoHTML()
}
function carritoHTML(){
    limpiarCarrito();
    articulosCarrito.forEach(producto => {
        const fila = document.createElement('div');
        fila.innerHTML = `
            <img src="${producto.imagen}"  width="100"/><img>
           <p>${producto.nombre}</p>
             <p>${producto.precio}</p>
             <p>${producto.cantidad}</p>
             <p><span class="borrar-producto" data-id="${producto.id}">❌</span></p>           
        `;
        contenedorCarrito.appendChild(fila)
    })
    sincronizarStorage()
}
function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}
//borrar todo el carrito
function limpiarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
function vaciarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    articulosCarrito = [];
    sincronizarStorage();
}


