let formularioInformacion = document.getElementById('conversionForm');

formularioInformacion .addEventListener('submit', (e)=>{
    e.preventDefault();

    const cantidadInput = document.getElementById('cantidad');
    const selectMoneda = document.getElementById('moneda');

    const cantidadPesos = parseFloat(cantidadInput.value);
    const divisa = selectMoneda.value
    
    let conversionFinal = exchange(divisa,cantidadPesos)

    console.log(conversionFinal)

});

let exchange =(d,c)=>{
    for(let i=0; i<valores.length; i++){
        if(d==valores[i].moneda){
            let convertido =  c * valores[i].precio
            alert(convertido)
        }
    }
}

const valores = [
    {id: 1, moneda:'USD', precio: 1570},
    {id: 2, moneda:'EUR', precio: 1730},
    {id: 3, moneda:'BRL', precio: 240},
]

console.log(valores)