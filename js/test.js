

describe("calcularString()", (string) => {
    it("no debería modificar el parámetro", () => {
        const string = "4, 7, 5";
        calcularString(string)

        expect(string).to.eql("4, 7, 5");
    })

    it("debería sumar 0, 1 o 2 números, y devolver su suma", () => {
        const string = "4, 7, 5";
        const resultado = calcularString(string)

        expect(resultado).to.equal(16)
    })
    it("debería devolver cero si el string se ingresa vacío", () => {
        const string = "";
        const resultado = calcularString(string)

        expect(resultado).to.equal(0)
    })

    it("debería aceptar una cantidad indefinida de números", () => {
        const string = "4, 7, 5, 8, 40, 50, 20, 30";
        const resultado = calcularString(string)

        expect(resultado).to.equal(164)
    })
    it("debería aceptar un delimitador definido por el usuario", () => {
        const string = "4 7 5 8 40 50 20 30";
        const string1 = "4-7-5-8-40-50-20-30";
        const resultado = calcularString(string, ' ')
        const resultado1 = calcularString(string1, '-')

        expect(resultado).to.equal(164)
        expect(resultado1).to.equal(164)
    })

    it("debería tirar error si se le pasa un número negativo", () => {
        const string = "4, -7, 5, 8, 40, 50, 20, 30";
        const fn = () => {
            calcularString(string)
        }
        expect(fn).to.throw(`No se pueden ingresar números negativos. Ingresó: -7`)

    })

    it("debería tirar en el error los números negativos si se le pasan varios números negativos", () => {
        const string = "4, -7, 5, 8, 40, -50, 20, 30";
        const fn = () => {
            calcularString(string)
        }
        expect(fn).to.throw(`No se pueden ingresar números negativos. Ingresó: -7 -50`)

    })

    it("debería ignorar los valores mayores a 1000", () => {
        const string = "4, 7, 5, 1008, 40, 50, 2220, 30";
        const resultado = calcularString(string)
        expect(resultado).to.equal(136)

    })
})

describe("moverElemento()", (tablero, coordenadas, movimiento) => {
    it("debería devolver el valor de la casilla a la que el usuario se movió", () => {
        const tablero = [
            ["1", "2", "3", "4"],
            ["5", "6", "7", "8"],
            ["9", "10", "11", "12"],
            ["13", "14", "15", "16"],
            ["17", "18", "19", "20"],
        ];

        const coordenadas = [2, 2];
        const movimiento = ["ARRIBA"];
        const movimiento1 = ["ABAJO"];
        const movimiento2 = ["DERECHA"];
        const movimiento3 = ["IZQUIERDA"];

        expect(moverElemento(tablero, coordenadas, movimiento)).to.equal("7")
        expect(moverElemento(tablero, coordenadas, movimiento1)).to.equal("15")
        expect(moverElemento(tablero, coordenadas, movimiento2)).to.equal("12")
        expect(moverElemento(tablero, coordenadas, movimiento3)).to.equal("10")
    })

    it("Si está en algún borde, debe pasar al otro lado", () => {
        const tablero = [
            ["1", "2", "3", "4"],
            ["5", "6", "7", "8"],
            ["9", "10", "11", "12"],
            ["13", "14", "15", "16"],
            ["17", "18", "19", "20"],
        ];

        const coordenadas = [0, 2];
        const movimiento = ["ARRIBA"];

        expect(moverElemento(tablero, coordenadas, movimiento)).to.equal("19")
    })

    it("Debe aceptar varios movimientos y devolver el resultado final de ese movimiento", () => {
        const tablero = [
            ["1", "2", "3", "4"],
            ["5", "6", "7", "8"],
            ["9", "10", "11", "12"],
            ["13", "14", "15", "16"],
            ["17", "18", "19", "20"],
        ];

        const coordenadas = [0, 2];
        const movimiento = ["ARRIBA", "IZQUIERDA", "IZQUIERDA", "ARRIBA", "ARRIBA", "DERECHA"];

        expect(moverElemento(tablero, coordenadas, movimiento)).to.equal("10")
    })

    it("Debe arrojar un error si las coordenadas iniciales no son válidas", () => {
        const tablero = [
            ["1", "2", "3", "4"],
            ["5", "6", "7", "8"],
            ["9", "10", "11", "12"],
            ["13", "14", "15", "16"],
            ["17", "18", "19", "20"],
        ];

        const coordenadas = [7, 2];
        const movimiento = ["ARRIBA"];

        const fn = () => { moverElemento(tablero, coordenadas, movimiento) }

        expect(fn).to.throw('Coordenadas inválidas');

    })

    it("Debe arrojar un error si un movimiento no es válido", () => {
        const tablero = [
            ["1", "2", "3", "4"],
            ["5", "6", "7", "8"],
            ["9", "10", "11", "12"],
            ["13", "14", "15", "16"],
            ["17", "18", "19", "20"],
        ];

        const coordenadas = [2, 2];
        const movimiento = ["Arri"];

        const fn = () => { moverElemento(tablero, coordenadas, movimiento) }

        expect(fn).to.throw('Ingrese un movimiento válido');

    })
})

describe("algoritmoLuhn()", (numeroTarjeta) => {
    it("no debería modificar el parametro dado", () => {
        const numeroTarjeta = "4012 - 8888 - 8888 - 1881";
        algoritmoLuhn(numeroTarjeta);
        expect(numeroTarjeta).to.eql("4012 - 8888 - 8888 - 1881")
    })
    it("debería devolver un booleano", () => {
        const numeroTarjeta = "4012 - 8888 - 8888 - 1881";
        const resultado = algoritmoLuhn(numeroTarjeta);

        expect(resultado).to.be.true;
    })

})

describe("verificadorTarjeta()", (numeroTarjeta) => {
    it("no debería modificar el parametro dado", () => {
        const numeroTarjeta = "5050 - 8888 - 1111 - 2222";
        verificadorTarjeta(numeroTarjeta);
        expect(numeroTarjeta).to.eql("5050 - 8888 - 1111 - 2222")
    })
    it("debería devolver un mensaje", () => {
        const numeroTarjeta = "4012 - 8888 - 8888 - 1881";
        const resultado = verificadorTarjeta(numeroTarjeta);

        expect(resultado).to.be.a('string');
    })

    it("debería devolver un mensaje indicando el tipo de tarjeta", () => {
        const numeroTarjeta = "4024007194639323";//VISA
        const numeroTarjeta2 = "5487398672792560" //MC
        const numeroTarjeta3 = "345767629816925" //AE
        const resultado = verificadorTarjeta(numeroTarjeta);
        const resultado2 = verificadorTarjeta(numeroTarjeta2);
        const resultado3 = verificadorTarjeta(numeroTarjeta3);

        expect(resultado).to.eql('La tarjeta es Visa');
        expect(resultado2).to.eql('La tarjeta es MasterCard');
        expect(resultado3).to.eql('La tarjeta es American Express');

    })

    it("debería devolver un mensaje si es inválido el número", () => {
        const numeroTarjeta = "40240071946323";
        const resultado = verificadorTarjeta(numeroTarjeta);

        expect(resultado).to.eql('La tarjeta es inválida');

    })

})

describe("mostrarPaginacion()", (totalPaginas) => {
    it("debería mostrar un array de length 5", () => {
        let paginacion = [1, 2, 3, 4, 5]
        expect(paginacion.length).to.equal(5)
    })

})