// Ejercicio 1: Promesas Encadenadas
const randomNumber = () =>{
    let number1 =  new Promise((resolve, reject)=>{
        setTimeout(function(){
            let numeroRandom = Math.floor(Math.random() * 100);
            resolve(numeroRandom)
            console.log("El numero random es: "  + numeroRandom)
        },2000)
    });
    let number2 = new Promise((resolve, reject)=>{
        setTimeout(function(){
            number1.then((response=>{
                let numeroAlCuadrado  = response**2;
                resolve(numeroAlCuadrado)
                console.log("El numero al cuadrado es: "  + numeroAlCuadrado)
            }))
        },3000)
    });
    return new Promise((resolve, reject)=>{
        setTimeout(function(){
            number2.then((response=>{
                let numeroRaiz = Math.sqrt(response);
                resolve(numeroRaiz)
                console.log("La raiz del cuadrado es: "  + numeroRaiz)
            }))
        },4000)
    });

}
randomNumber().then(console.log);

// Ejercicio 2: Promesa de Múltiples Solicitudes
// Crea una función que realice las siguientes tareas:

// Recibe un array de URLs como argumento.
// Utiliza fetch y promesas para realizar una solicitud GET a cada URL en el array.
// Devuelve una promesa que se resuelva con un array de los resultados de todas las solicitudes.

const URLArray = ['https://pokeapi.co/api/v2/pokemon/ditto','https://pokeapi.co/api/v2/pokemon/pikachu','https://pokeapi.co/api/v2/pokemon/charmander']
const multipleFetch = (array) =>{
    const arrayPromesas = [];
    array.forEach((e,i)=>{arrayPromesas.push(fetch(array[i])
        .then(res=>res.json())
        .then(res=>res.name)
        );});
    return arrayPromesas;   
}
Promise.all(multipleFetch(URLArray)).then((values)=>{
    console.log(values);
});


// Ejercicio 3: Promesas Paralelas
const nestedFunction1 = ()=>{return new Promise((resolve,reject)=>resolve("Promesa resuelta 1"))}
const nestedFunction2 = ()=>{return new Promise((resolve,reject)=>resolve("Promesa resuelta 2"))}
const nestedFunction3 = ()=>{return new Promise((resolve,reject)=>resolve("Promesa resuelta 3"))}
const arrayFunctions = [nestedFunction1,nestedFunction2,nestedFunction3];
//Esto retorna un arreglo de promisas
const parallelPromises = (arrrayFunciones)=>{
    //Aqui se "resuelven", pero solo se regresa la promesa en si
    return Promise.all(arrrayFunciones.map(e=>e()));
}
//Aqui imprimimos las promesas ya resueltas, y solo accedemos al valor del resolve de cada una. 
parallelPromises(arrayFunctions).then(values=>console.log(values))

// Ejercicio 4: Promesas en Cadena con Retraso
// Recibe un número n como argumento.
// Utiliza un bucle para crear una cadena de promesas,
// donde cada promesa se resuelve después de N segundos con el número actual en el bucle.
// Cada promesa debe imprimir el número en la consola antes de resolverse.
// Finalmente, devuelve una promesa que se resuelva después de N segundos con el mensaje "Todas las promesas se resolvieron".

const chainingPromises = (n) => {
    const promises = [];
    
    for (let i = 0; i < n; i++) {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`Resolución de promesa número: ${i + 1}`);
                resolve();
            }, (i + 1) * 1000); // Esperar i + 1 segundos antes de resolver
        });
        promises.push(promise);
    }

    return Promise.all(promises).then(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Todas las promesas se resolvieron");
                resolve();
            }, n * 1000); // Esperar n segundos antes de resolver la promesa final
        });
    });
};

chainingPromises(5)

// Ejercicio 5: Promesa con Cancelación
let cancelPromiseCalled;
const doPromise = ()=>{
    setTimeout(()=>{
        if(cancelPromiseCalled){
            cancelPromise().then(res=>console.log(res))
        }else{
            new Promise((resolve,reject)=>{
                resolve(console.log(`Resolved succesfull`));
            })
        }
    },5000);
}   

const cancelPromise = ()=>{
    cancelPromiseCalled = true;
    new Promise((resolve,reject)=>{
        reject(`Canceled promise`);
    })
}   


doPromise();
//cancelPromise()