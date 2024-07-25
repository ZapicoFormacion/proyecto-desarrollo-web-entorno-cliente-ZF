// Este script controla la validación de las entradas del formulario



// Nombre
// Comprobación estándar
// Mensajes personalizados
const nombre = document.getElementById('nombre')
nombre.addEventListener('input', () => nombre.setCustomValidity(''))
nombre.addEventListener('invalid', () => nombre.setCustomValidity('Se requiere nombre'))



// Precio
// Comprobación estándar
// Mensajes personalizados
const precio = document.getElementById('precio')
precio.addEventListener('input', () => precio.setCustomValidity(''))
precio.addEventListener('invalid', () => precio.setCustomValidity('Se requiere precio'))



// Imagen
// Comprobación personalizada: se espera una foto accesible por http/https y almacenada en un dominio de internet
// Mensajes personalizados
const imagen = document.getElementById('imagen')
function comprobarEnlace() {
    const url = this.value
    let mensaje = ''
    if (url.length === 0)
        mensaje = 'Se requiere url a una imagen'
    else {
        const esUrl = url.match(/^(https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*\.(?:jpeg|jpg|gif|png|webp)))$/i) != null
        if (!esUrl) {
            mensaje = 'No parece ser una url válida para una imagen'
        }
    }
    this.setCustomValidity(mensaje)
}
imagen.addEventListener('input', comprobarEnlace)
imagen.addEventListener('invalid', comprobarEnlace)



// Descripción
// Comprobación personalizada: se espera una longitud mínima
// Mensajes personalizados
const descripción = document.getElementById('descripción')
function comprobarDescripción() {
    const longitudMínima = 10
    const longitudActual = this.value.length
    let mensaje = ''
    if (longitudActual === 0)
        mensaje = 'Se requiere descripción'
    else if (longitudActual < longitudMínima) {
        const esSingular = longitudMínima - longitudActual === 1
        mensaje = 'La descripción debe ser más extensa:\nañade ' + (longitudMínima - longitudActual) +
            (esSingular ? ' carácter' : ' caracteres') + ' más.'
    }
    this.setCustomValidity(mensaje)
}
descripción.addEventListener('input', comprobarDescripción)
descripción.addEventListener('invalid', comprobarDescripción)



