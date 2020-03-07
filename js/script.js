// Calculadora de strings
// Crear una función calculadora que tome un string por parámetro
// la función debe sumar 0, 1 o 2 números, y devolver su suma
// los números se ingresan separados por coma
// para un string vacío debe devolver 0
// Permitir a la función aceptar una cantidad indefinida de números
// Permitir a la función aceptar otros delimitadores en vez de coma
// el delimitador se pasa por parámetro
// el delimitador es opcional
// el delimitador defecto es una coma
// Si se pasa un número negativo, debe tirar una excepción
// la excepción debe indicar qué número negativo se pasó
// si hay más de un número negativo, debe indicarlos a todos en la excepción
// Números mayores a 1000 deben ser ignorados

const calcularString = (string, delimitador = ', ') => {

    const array = string.split(`${delimitador}`);
    let suma = 0;
    const negativos = [];

    for (let i = 0; i < array.length; i++) {

        if (Number(array[i]) < 0) {
            negativos.push(Number(array[i]))
        }
        else if (Number(array[i]) < 1000) {
            suma += Number(array[i]);
        }
    }

    if (negativos.length === 0) {
        return suma;
    }
    else {
        throw new Error(`No se pueden ingresar números negativos. Ingresó: ${negativos.join(' ')}`)
    }

}


// Movimiento en Tablero
// Crear una función que acepte un array 2d, unos índices (de array) correspondientes a coordenadas y un movimiento posible que puede ser: ARRIBA, ABAJO, DERECHA, IZQUIERDA (como string, dentro de un array)
// Debe devolver el valor de la casilla correspondiente a mover las coordenadas actuales en la dirección que se pidió
// Si está en algún borde, debe pasar al otro lado
// Debe aceptar varios movimientos y devolver el resultado final de ese movimiento
// Debe arrojar un error si un movimiento no es válido o si las coordenadas iniciales son inválidas
const moverElemento = (tablero, coordenadas, movimiento) => {

    let coordenadasDestino = coordenadas.slice();
    let movimientosRestantes = movimiento.slice();

    if (coordenadasDestino[0] >= tablero.length || coordenadasDestino[1] >= tablero[0].length) {
        throw new Error('Coordenadas inválidas')

    } else {

        for (let i = 0; i < movimientosRestantes.length; i++) {
            switch (movimientosRestantes[i]) {
                case "ARRIBA":
                    if (coordenadasDestino[0] === 0) {
                        coordenadasDestino[0] = (tablero.length) - 1;

                    } else {
                        coordenadasDestino[0] = coordenadasDestino[0] - 1;
                    }
                    break

                case "ABAJO":
                    if (coordenadasDestino[0] === ((tablero.length) - 1)) {
                        coordenadasDestino[0] = 0;
                    } else {
                        coordenadasDestino[0] = coordenadasDestino[0] + 1;
                    }

                    break

                case "IZQUIERDA":
                    if (coordenadasDestino[1] === 0) {
                        coordenadasDestino[1] = (tablero[0].length) - 1;
                    } else {
                        coordenadasDestino[1] = coordenadasDestino[1] - 1;
                    }

                    break


                case "DERECHA":
                    if (coordenadasDestino[1] === ((tablero[0].length) - 1)) {
                        coordenadasDestino[1] = 0;
                    } else {
                        coordenadasDestino[1] = coordenadasDestino[1] + 1;
                    }


                    break
                default:
                    throw new Error(`Ingrese un movimiento válido`)
            }
        }
    }

    return tablero[coordenadasDestino[0]][coordenadasDestino[1]]
}


// Algoritmo de Luhn
// Se utiliza para verificar la validez de una tarjeta, pin, etc.Crear una función que devuelva si un número pasa el algoritmo de Luhn o no.

// Número de ejemplo: 4012 - 8888 - 8888 - 1881

// Se divide el número en dígitos.
// 4 0 1 2 8 8 8 8 8 8 8 8 1 8 8 1
// Se multiplica por 2 los dígitos que ocupan las posiciones pares contando de derecha a izquierda y empezando por 1, no por 0. - 8 0 2 2 16 8 16 8 16 8 16 8 2 8 16 1
// Los números mayor a 9 se restan por 9.
// 8 0 2 2 7 8 7 8 7 8 7 8 2 8 7 1
// Se suman todos los números.
// 90
// Si el resto de dividirlo por 10 es 0, el número es válido

const algoritmoLuhn = (numeroTarjeta) => {
    copy = numeroTarjeta.slice();
    copy = copy.split("");
    let numeroChequeo = [];

    for (let i = 0; i < copy.length; i++) {
        if (!isNaN(copy[i])) {
            numeroChequeo.push(Number(copy[i]))
        }
    }

    for (let i = (numeroChequeo.length - 1); i >= 0; i--) {
        if (i % 2 === 0 || i === 0) {

            numeroChequeo[i] = numeroChequeo[i] * 2
        }

        if (numeroChequeo[i] > 9) {
            numeroChequeo[i] = numeroChequeo[i] - 9;
        }
    }

    let suma = 0;
    for (let i = 0; i < numeroChequeo.length; i++) {
        suma += numeroChequeo[i];
    }

    return suma % 10 === 0 ? true : false;

}


// Verificadora de tarjeta
// Crear una función que determine si una tarjeta es válida o no

// Debe permitir ingresar un string
// Debe verificar que el string sea un numero de Luhn valido
// Debe verificar que pertenezca a algún tipo de tarjeta, siguiendo las siguientes reglas:
// American Express: Comienza con 34 o 37, tiene 15 dígitos.
//     Visa: Comienza con 4, tiene 13 o 16 dígitos.
//         MasterCard: Comienza con 51, 52, 53, 54 o 55, tiene 16 dígitos.
// Debe devolver un string con el tipo de la tarjeta, o "invalid" si no es una tarjeta válida


const verificadorTarjeta = (numeroTarjeta) => {
    let copy = numeroTarjeta.slice();
    let mensaje = "La tarjeta es ";

    if (algoritmoLuhn(copy)) {
        copy = copy.split("");
        //american express
        if (copy[0] == 3 && (copy[1] == 4 || copy[1] == 7)) {

            mensaje += "American Express";

        } else if (copy[0] == 4 && (copy.length == 13 || copy.length == 16)) {

            mensaje += "Visa";

        } else if (copy[0] == 5 && (copy[1] == 1 || copy[1] == 2 || copy[1] == 3 || copy[1] == 4 || copy[1] == 5) && copy.length === 16) {

            mensaje += "MasterCard";

        } else {
            mensaje += "inválida"
        }

    } else {
        mensaje += "inválida";
    }

    return mensaje;
}

// // Paginador
// Crear una función que devuelva una páginacion

// Debe pedir por un número final de página.
// Si es igual a 5, debe devolver un array con los números en secuencia contando a partir de 1:
// [1, 2, 3, 4, 5]
// Debe ingresar el número actual de página.Si la cantidad de números a mostrar es menor que la cantidad de páginas, debe cumplir las siguientes reglas:
// Si la página actual no está pegada a los límites, se debe agregar puntos suspensivos a cada lado de la página actual:
// [1, '...', 6, '...', 10]
// Si la página actual está pegada a los límites, se debe agregar puntos suspensivos en el lado correspondiente:
// [1, 2, '...', 10]
// [1, '...', 9, 10]
// Se debe permitir agregar una cantidad X de números extra en los límites
// Por defecto es 0
// Ejemplos:
// [1, 2, '...', 6, '...', 9, 10]
// [1, 2, 3, '...', 9, 10]
// [1, 2, '...', 8, 9, 10]
// Se debe permitir agregar una cantidad X de números extra a ambos lados de la página seleccionada
// Por defecto es 1
// Ejemplos:
// [1, 2, '...', 5, 6, 7, '...', 9, 10]
// [1, '...', 5, 6, 7, '...', 10]
// [1, '...', 7, 8, 9, 10]
// Si entre ambos números al lado de puntos suspensivos hay solo un número intermedio, se debe mostrar ese número y no los puntos suspensivos
// En vez de
// [1, 2, '...', 4, 5, 6, '...', 9, 10]
// Mostrar
// [1, 2, 3, 4, 5, 6, '...', 9, 10]
// Nunca puede haber más de dos puntos suspensivos

const mostrarPaginacion = (totalPaginas, paginaActual, numerosExtraLimite = 0, numeroExtraLados = 1) => { }