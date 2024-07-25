// Este script controla el funcionamiento de la aplicación



// Almacena los productos de la lista en la sesión del navegador
function almacenarProductos(productos) {
    localStorage.setItem('ZF_productos', JSON.stringify(productos))
}



// Recupera y devuelve la lista de productos que mantiene la sesión del navegador
function recuperarProductos() {
    return JSON.parse(localStorage.getItem('ZF_productos')) || []
}



// Cuando sea necesario se podrá cambiar el modo de funcionamiento del formulario
function setModo(modo) {
    document.getElementById('aceptar').innerText = modo
}



// Eliminar un producto de la lista
function eliminarProducto(índice) {
    if (window.confirm('¡ACCIÓN IRREVERSIBLE!\n¿De verdad desea eliminar el producto?')) {
        const productos = recuperarProductos()
        productos.splice(índice, 1)
        almacenarProductos(productos)
    }
    // Aunque podría ser un inconveniente bajo algunas situaciones, como en este caso puntual
    // no afecta a la funcionalidad voy a optar por delegar el vaciado del formulario y la
    // reconstrucción del listado a la recarga del documento.
    window.location.reload(true);
}



// Actualizar un producto editado
function actualizarProducto(nombre, precio, descripción, imagen) {
    if (window.confirm('¡ACCIÓN IRREVERSIBLE!\n¿De verdad desea actualizar el producto?')) {
        const índice = document.getElementById('index').value
        const productos = recuperarProductos()
        productos[índice] = { nombre, precio, imagen, descripción }
        almacenarProductos(productos)
    }
    // Aunque podría ser un inconveniente bajo algunas situaciones, como en este caso puntual
    // no afecta a la funcionalidad voy a optar por delegar el vaciado del formulario y la
    // reconstrucción del listado a la recarga del documento.
    window.location.reload(true);
}



// Editar un producto de la lista
// En realidad sólo carga los datos en el formulario, no se modifican hasta actualizar
function editarProducto(índice) {
    const producto = recuperarProductos()[índice]
    document.getElementById('nombre').value = producto.nombre
    document.getElementById('precio').value = producto.precio
    document.getElementById('imagen').value = producto.imagen
    document.getElementById('descripción').value = producto.descripción
    document.getElementById('index').value = índice
    setModo('actualizar')
}



// Añadir un producto a la lista
function añadirProducto(nombre, precio, descripción, imagen) {
    const productos = recuperarProductos()
    productos.push({ nombre, precio, imagen, descripción })
    almacenarProductos(productos)
}



// Mostrar un producto en el listado de la ficha
function mostrarProducto(producto, índice) {
    const sección = document.querySelector('section')
    // Añadir el producto al listado ya mostrado
    sección.innerHTML +=
        `<article><img src="${producto.imagen}" alt="${producto.nombre}" />` +
        `<span><h3>${producto.nombre}</h3><p>${producto.descripción}</p></span>` +
        `<span><h3>` + parseFloat(producto.precio).toFixed(2) + `€</h3><div>` +
        `<button onclick="editarProducto(${índice})" title="Editar producto">?</button>` +
        `<button onclick="eliminarProducto(${índice})" title="Eliminar producto">x</button>` +
        `</div></span></article>`
    // Actualizar el precio total de la ficha
    const precioTotal = document.getElementById('precioTotal')
    precioTotal.textContent = (parseFloat(precioTotal.textContent) + parseFloat(producto.precio)).toFixed(2)
}



// Muestra todos los productos empleando la función que muestra un único producto
function mostrarProductos(productos) {
    // TODO: posibles ampliaciones...
    // TODO: opciones de ordenación de la lista
    // TODO: opciones de filtrado de la lista
    for (índice = 0; índice < productos.length; índice++) {
        mostrarProducto(productos[índice], índice)
    }
}



// Se controla el comportamiento del botón submit (tras superar las validaciones)
document.querySelector('form').addEventListener("submit", (evento) => {
    // Anular el envío y prevenir la recarga del documento
    evento.preventDefault
    // Cambiar el comportamiento por defecto
    const nombre = document.getElementById('nombre').value
    const precio = document.getElementById('precio').value
    const imagen = document.getElementById('imagen').value
    const descripción = document.getElementById('descripción').value
    const acción = document.getElementById('aceptar').innerText
    switch (acción) {
        case 'Añadir':
            añadirProducto(nombre, precio, descripción, imagen)
            break
        case 'Actualizar':
            actualizarProducto(nombre, precio, descripción, imagen)
            break
        default:
            alert('Ups... Algo no ha salido como se esperaba.')
            console.log('onSubmit: comprobar acción seleccionada')
    }
})



// Se controla el comportamiento del botón reset
document.querySelector('form').addEventListener("reset", (evento) => {
    document.getElementById('index').value = '' // Usado al editar productos
    setModo('añadir') // Regresa al modo por defecto
})



// El evento load controla lo que sucederá justo tras terminar de cargar el documento
window.addEventListener('load', () => {
    // Comportamiento del formulario por defecto: añadir
    setModo('añadir')
    // Recupera la lista de productos (si se añadieron en sesiones previas)
    let productos = recuperarProductos()
    // Se adapta el interfaz según cuántos productos se quieran mostrar a la vez.
    // Se activa la scrollbar si hay más productos de los que caben en el espacio.
    // Este ejemplo está adaptado para las siguientes posibilidades:
    // - No mostrar en la ficha nada más que el formulario
    // - Ampliar la ficha para alojar productos: adaptable a 1, 2, etc.
    // - Activar la scrollbar a partir de 3 elementos
    const sección = document.querySelector('section')
    switch (productos.length) {
        case 0:
            sección.style.display = 'none'
            break
        case 1:
            sección.style.height = '7.1rem'
            break
        case 2:
            sección.style.height = '13.8rem'
            break
        default:
            sección.style.height = '13.7rem'
            break
    }
    // Mostrar todos los productos de la lista
    mostrarProductos(productos)
})



// Enlaces de imágenes para productos
//
// Maíz
// https://cdn.iconscout.com/icon/free/png-256/corn-1671441-1422422.png
//
// Fresas
// https://static.vecteezy.com/system/resources/previews/007/128/944/original/fruit-with-dots-an-isometric-icon-of-prickly-pears-vector.jpg
//
// Sandía
// https://www.pinclipart.com/picdir/middle/568-5680531_circle-shape-fruit-clip-color-green-fruits-and.png
//
