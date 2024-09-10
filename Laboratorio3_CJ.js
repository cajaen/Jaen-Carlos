
function Problema1() {
    let Numero = prompt("Ingresa un número para verificar si es palíndromo en base 10 y 2:");
    if (isNaN(Numero)) {
        alert("Entrada inválida. Por favor ingresa un número.");
        return;
    }
    let Resultado = EsPalindromoDobleBase(Number(Numero));
    alert(Resultado ? `${Numero} es palíndromo tanto en base 10 como en base 2` : `${Numero} no es palíndromo en ambas bases.`);
}

function Problema2() {
    let Cadena = prompt("Ingresa una cadena de caracteres:");
    if (Cadena === '') {
        alert("Por favor, ingresa una cadena de texto.");
        return;
    }
    let Resultado = ContarCaracteres(Cadena);
    let FormattedResult = '';
    for (const [key, value] of Object.entries(Resultado)) {
        FormattedResult += `${key}: ${value}
`;
    }
    alert(FormattedResult);
}

function Problema3() {
    let Anio = prompt("Ingresa un año para verificar si es bisiesto:");
    if (Anio === '') {
        alert("Por favor, ingresa un año.");
        return;
    }
    let Resultado = EsBisiesto(Number(Anio));
    alert(Resultado ? `${Anio} es un año bisiesto` : `${Anio} no es un año bisiesto`);
}

function Problema4() {
    let Numero = prompt("Ingresa un número para sumar los primos menores o iguales a él:");
    if (Numero === '') {
        alert("Por favor, ingresa un número.");
        return;
    }
    let Resultado = SumarPrimos(Number(Numero));
    alert(`La suma de los números primos menores o iguales a ${Numero} es ${Resultado}`);
}

function EsPalindromoDobleBase(t) {
    const StrBase10 = t.toString();
    const StrBase2 = t.toString(2);

    const EsPalindromo = (str) => str === str.split('').reverse().join('');
    return EsPalindromo(StrBase10) && EsPalindromo(StrBase2);
}

function ContarCaracteres(t) {
    const Resultado = {};
    for (let Char of t) {
        Resultado[Char] = (Resultado[Char] || 0) + 1;
    }
    return Resultado;
}

function EsBisiesto(a) {
    return (a % 4 === 0 && a % 100 !== 0) || (a % 400 === 0);
}

function EsPrimo(Num) {
    if (Num < 2) return false;
    for (let i = 2; i <= Math.sqrt(Num); i++) {
        if (Num % i === 0) return false;
    }
    return true;
}

function SumarPrimos(n) {
    let Sumatoria = 0;
    for (let i = 2; i <= n; i++) {
        if (EsPrimo(i)) {
            Sumatoria += i;
        }
    }
    return Sumatoria;
}
