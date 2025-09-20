const Boton = document.getElementById('startButton');

Boton.addEventListener('click',() => {
    let paramos = prompt('ENTONCES......CUANDO PARO CHE?')
    paramos = Number(paramos);
    if(paramos<=0){
            alert('GRACIAS FLAQUITO, ME SALVASTE LA VIDA');
        }
    for(let i = 0; i <= paramos; i++){
        if(i === paramos){
            console.log('ALFIN PARO CHE');
            break;
        }
        console.log('HOLA');
    }

})