const { script } = require('../domain/scripts.whtpp');
const { cache } = require('../infraestructure/cache/cache.config');

const answerScript = (incomingMessage, profileName, key) => {
  console.log('incomingMessage', incomingMessage);
  console.log('***************************')
  if (/^(hola|ola|hey|hello|buen|buenas|hi)/.test(incomingMessage.toLowerCase())) {
    const responseMessage = script().find(message => message.order === 0 && message.type === 'greeting');
    const {order, type, category, answerResponse} = responseMessage;
    
    cache.set(`$incoming${key}`, {order, type, category});
    
    return answerResponse()
  }
  console.log('no entra')
  if (cache.has(`$incoming${key}`)) {
    const { order:orderRequested, type:typeRequested, category:categoryRequested } = cache.get(`$incoming${key}`);
    // const message = script().find(message => message.order === orderRequested && message.type === typeRequested && message.category === categoryRequested);
    const value = validateNextMessage(typeRequested, categoryRequested, incomingMessage);
    console.log(`${categoryRequested}-${typeRequested}-${incomingMessage}`)
    console.log('^^^^^^^^^^^^^^^^^^^^^^')
    console.log(value)
    console.log('??????????????????????????')
    const {answerResponse} = script().find(message => message.order === value.order && message.type === value.type && message.category === value.category);
    return answerResponse(profileName)
    if (message.answer.some(answer => answer === incomingMessage)) {
    }
  }
  
  return `${profileName.split(' ')[0]} por favor repite tu pregunta.`
  
  // const { answerResponse } = script().find(({ coincidences }) => 
  //   coincidences.toLowerCase().includes('')
  // ) || { 
  //   answerResponse: () => `${profileName.split(' ')[0]} por favor repite tu pregunta.`,
  // };
  // cache.set(`$incoming${key}`, )
  // return answerResponse(incomingMessage, profileName);
};

const validateNextMessage = (type, category, answer)=> {
  const nextMessage = {
    ['approval-greeting-si']: ()=> ({ category: 'menu', type: 'informative', order: 1 }),
    ['approval-greeting-no']: ()=> ({ category: 'approval', type: 'authorization', order: 11 }),
    ['approval-authorization-no']: ()=> ({ category: 'approval', type: 'authorization', order: 11 }),
    [`menu-informative-${answer}`]: ()=> ({ category: 'menu', type: 'services', order: 2 }),
    ['menu-services-1']: ()=> ({ category: 'recruiting', type: 'servicesnominee', order: 1 }),
    ['recruiting-servicesnominee-1']: ()=> ({ category: 'recruiting', type: 'servicesnominee', order: 11 }),
    ['recruiting-servicesnominee-2']: ()=> ({ category: 'recruiting', type: 'servicesnominee', order: 11 }),
    ['recruiting-servicesnominee-3']: ()=> ({ category: 'recruiting', type: 'servicesnominee', order: 11 }),
    [`recruiting-servicesnominee-${answer}`]: ()=> ({ category: 'recruiting', type: 'servicesnominee', order: 12 }),
    ['recruiting-servicesnominee-c']: ()=> ({ category: 'recruiting', type: 'servicesnominee', order: 13 }),
    ['recruiting-servicesnominee-d']: ()=> ({ category: 'recruiting', type: 'servicesnominee', order: 14 }),
    ['recruiting-servicesnominee-e']: ()=> ({ category: 'recruiting', type: 'servicesnominee', order: 15 }),
    ['recruiting-servicesnominee-f']: ()=> ({ category: 'recruiting', type: 'servicesnominee', order: 16 })
  }
  
  return (typeof nextMessage[`${category}-${type}-${answer}`] === 'function' && nextMessage[`${category}-${type}-${answer}`]())
}

const answerService = {
  answerScript,
};

module.exports.answerService = answerService;
