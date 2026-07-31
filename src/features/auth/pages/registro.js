export function validarNombre(nombre) {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(nombre);
}

export function validarApellido(apellido) {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(apellido);
}
export function validarCedula(cedula) {
    const regex = /^[0-9]+$/;
    return regex.test(cedula);
}
export function validarCorreo(correo) {
    const regex = /^[a-zA-Z0-9._%+-]+@anima\.edu\.uy$/;
    return regex.test(correo);
}
export function validarTelefono(telefono) {
    const regex = /^[0-9]+$/;
    return regex.test(telefono);
}
export function validarPassword(password) {
    return password.length >= 8;
}