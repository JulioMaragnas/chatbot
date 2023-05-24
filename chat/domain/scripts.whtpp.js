const script = (profileName) => [
  {
    type: 'greeting',
    coincidences: 'Hola, ola, hey, ., hello, buen, buenas',
    category: 'approval',
    order: 0,
    answer: ['si', 'no'],
    answerResponse: ()=> `Bienvenido a la atención virtual de GOLDTALENT SOLUCIONES

    *En cumplimiento de las disposiciones de la Ley 1581 de 2012 y del Decreto reglamentario 1377, Goldtalent solicita la autorización para almacenar y tratar tus datos personales para ponernos en contacto contigo acerca de nuestros procesos, productos y servicios.*
    
    Nos autorizas? Si/No`
  },
  {
    type: 'authorization',
    coincidences: '',
    category: 'approval',
    order: 11,
    answer: ['si', 'no'],
    answerResponse: ()=> `Para poder continuar con el proceso debes autorizarnos para tratar tus datos personales
    Nos autorizas? Si/No`
  },
  {
    type: 'informative',
    coincidences: '',
    category: 'menu',
    order: 1,
    answerResponse: ()=> `Gracias por aceptar, para personalizar tu atención cuéntanos ¿cómo te llamas?`
  },
  {
    type: 'services',
    coincidences: '',
    category: 'menu',
    order: 2,
    answer: [1,2],
    answerResponse: ()=> `Hola! Soy Goldie, para saber cómo podemos ayudarte el día de hoy cuéntanos si eres:
    1. Un candidato interesado en procesos de selección.
    2. Una empresa interesada en nuestros servicios.`
  },
  {
    type: 'regards',
    coincidences: '', 
    category: 'menu',
    order: 13,
    answerResponse: (person)=> `Gracias ${person}, toda la información fue recogida en nuestra base de datos y será revisada para nuestros procesos.`
  },
  {
    type: 'servicesnominee',
    coincidences: '',
    category: 'recruiting',
    order: 1,
    answer:[1,2,3],
    answerResponse: (person)=> `Hola ${person}, es un gusto saludarte, soy Goldi tu asistente virtual 😁, te haré preguntas para entender que necesitas y redireccionarte de manera adecuada a nuestro equipo o encargados de los procesos.📌
    Te interesa:
    1. Conocer el estado de un proceso de selección en el que estás participando
    2. Tener información más detallada de una vacante
    3. Enviarnos tu hoja de vida`
  },
  {
    type: 'servicesnominee',
    coincidences: '',
    category: 'recruiting',
    order: 11,
    answerResponse: ()=> `Perfecto, ¿Cuál es tu número de cédula?`
  },
  {
    type: 'servicesnominee',
    coincidences: '',
    category: 'recruiting',
    order: 12,
    answerResponse: ()=> `¿Cuál es tu correo electrónico?`
  },
  {
    type: 'servicesnominee',
    coincidences: '',
    category: 'recruiting',
    order: 13,
    answerResponse: ()=> `¿A qué número de celular podemos contactarte?`
  },
  {
    type: 'servicesnominee',
    coincidences: '',
    category: 'recruiting',
    order: 14,
    answerResponse: ()=> `¿Por qué buscas empleo actualmente?
    1. Nuevos retos
    2. Mejorar salario
    3. Desempleo
    4. Otros`
  },
  {
    type: 'servicesnominee',
    coincidences: '',
    category: 'recruiting',
    order: 15,
    answerResponse: ()=> `Por último, envianos tu hoja de vida en pdf con el siguiente nombre  HDV_Nombre completo`
  },
  {
    type: 'servicesnominee',
    coincidences: '',
    category: 'recruiting',
    order: 16,
    answerResponse: (person)=> `Gracias ${person}, toda la información fue recogida en nuestra base de datos y será revisada para nuestros procesos de selección, si aplicas a alguna de nuestras vacantes te estaremos contactando.`
  },
  {
    type: 'servicescustomer',
    coincidences: '',
    category: 'commercial',
    order: 1,
    answerResponse: ()=> `Te interesan nuestros servicios de:
    1. Pruebas psicotécnicas
    2. Levantamiento de perfil
    3. Formación a medida
    4. Atracción y selección
    5. Pago por hojas de vida
    6. Filtro + Bases de datos
    7. Otros`
  },
  {
    type: 'servicescustomer',
    coincidences: '',
    category: 'commercial',
    order: 11,
    answerResponse: ()=> `¿Cómo se llama tu empresa?`
  },
  {
    type: 'servicescustomer',
    coincidences: '',
    category: 'commercial',
    order: 12,
    answerResponse: ()=> `¿Cuál es la necesidad de tu organización actualmente?`
  },
  {
    type: 'servicescustomer',
    coincidences: '',
    category: 'commercial',
    order: 13,
    answerResponse: ()=> `¿A qué correo podemos contactarte?`
  },
  {
    type: 'servicescustomer',
    coincidences: '',
    category: 'commercial',
    order: 13,
    answerResponse: ()=> `¿A cuál número de celular podemos contactarte?`
  },
  {
    type: 'servicescustomer',
    coincidences: '',
    category: 'commercial',
    order: 13,
    answerResponse: ()=> `¿A cuál número de celular podemos contactarte?`
  },
];

module.exports.script = script;
