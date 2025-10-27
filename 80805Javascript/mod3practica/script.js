let historialConversiones = [];

let formularioInformacion = document.getElementById('conversionForm');
let deleteHistoryBtn = document.getElementById('clearHistoryBtn');

formularioInformacion .addEventListener('submit', (e)=>{
    e.preventDefault();

    const cantidadInput = document.getElementById('cantidad');
    const selectMoneda = document.getElementById('moneda');

    const cantidadPesos = parseFloat(cantidadInput.value);
    const divisa = selectMoneda.value


    if(cantidadPesos >=1){
        exchange(divisa,cantidadPesos);
    }else{
        alert('no ingreso ninguna valor')
    }
});

let exchange =(d,c)=>{

    let transacciones = {
        montoArs: c,
        monedaDestino: d,
    }


    for(let i=0; i<valores.length; i++){                                                                    
        if(d==valores[i].moneda){
            let convertido =  c * valores[i].precio
            if(convertido){
                alert(`compraste $ ${convertido} ${valores[i].moneda}`)
                localStorage.setItem('transaccion', `${convertido}`)
                historialConversiones.push(transacciones);
                let ordenado = acomodarHistorial(historialConversiones);
                console.log(ordenado);
            }
        }
    }
}

deleteHistoryBtn.addEventListener('click', ()=>{
        localStorage.removeItem('transaccion')
    })

let finalExchange =(d,conv)=>{
}
let acomodarHistorial =(i)=>{
    let historialacomodado = i.sort((a,b)=> b.montoArs - a.montoArs);
    return historialacomodado;
}
const valores = [
    {id: 1, moneda:'USD', precio: 1570},
    {id: 2, moneda:'EUR', precio: 1730},
    {id: 3, moneda:'BRL', precio: 240},
]

