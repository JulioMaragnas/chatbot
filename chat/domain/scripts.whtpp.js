const script = (profileName)=>([
    {
        type: 'greeting',
        coincidences: 'hola, ola, hello, hey, buenas',
        answer: (profileName)=> `¡Hola! ${profileName} 😀 Que bueno que nos visites, mi nombre es Tiffany, en que te puedo ayudar?`
    },
    {
        type: 'cv',
        coincidences: 'hoja, vida, cv, hv, compartir, cargar, monto',
        answer: (profileName)=> `Claro que sí! ${profileName} te voy a indicar las tres formas por donde nosotros recepcionamos las hv
                ** todos los métodos de carga
        `
    }, 
    {
        type: 'info',
        coincidences: 'puestos, vacantes, trabajo, quiero trabajar',
        answer: (profileName)=> `Si mira ${profileName}, tenemos esto, esto, esto y esto otro
        `
    }
]);

module.exports.script = script;