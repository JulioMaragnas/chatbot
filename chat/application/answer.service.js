const { script } = require('../domain/scripts.whtpp');
const { cache } = require('../infraestructure/cache/cache.config');
const { notificationCommand: { sendEmail } }  = require('../../notification/infraestructure/commands.infraestructure');

const answerScript = async (incomingMessage, profileName, key) => {

  if (/^(hola|ola|hey|hello|buen|buenas|hi|inicio|(de nuevo))/.test(incomingMessage)) {
    const responseMessage = script().find(message => message.order === 0 && message.type === 'greeting');
    const {order, type, category, answerResponse} = responseMessage;
    
    cache.set(`$incoming${key}`, {order, type, category});
    cache.set(`user-${key}`,[{question: buildObjectResponse('approval', 'greeting', 0), incomingMessage}])
    
    return answerResponse()
  }

  if (cache.has(`$incoming${key}`)) {
    const { order:orderRequested, type:typeRequested, category:categoryRequested } = cache.get(`$incoming${key}`);
    const value = await validateNextMessage(categoryRequested, typeRequested, orderRequested, incomingMessage);    
    const {answerResponse, finishScript} = script().find(message => message.order === value.order && message.type === value.type && message.category === value.category);
    
    const infoUser = cache.get(`user-${key}`);
    cache.set(`user-${key}`,[...infoUser, {question: buildObjectResponse(categoryRequested, typeRequested, orderRequested), incomingMessage}])
    cache.set(`$incoming${key}`, {order: value.order, type: value.type, category: value.category});
    
    finishScript && sendNotification(key).then(()=> {
      console.log('notification sent');
      cache.take(`user-${key}`);
      cache.take(`$incoming${key}`);
    });
    
    return answerResponse(profileName);
  }
  
  return `${profileName.split(' ')[0]} por favor repite tu pregunta.`     
};

const validateNextMessage = async (category, type, order, answerRequest)=> {
  const nextMessage = {
    ['approval-greeting-0']: ()=> {
      const { expectedAnswer } = script().find(message => message.category === category && message.type === type && message.order === order);
      return expectedAnswer.findIndex(answer => answer == answerRequest) === 0 ? buildObjectResponse('menu', 'informative', 1): buildObjectResponse('approval', 'authorization', 11)
    },
    ['approval-authorization-11']: ()=> {
      const { expectedAnswer } = script().find(message => message.category === category && message.type === type && message.order === order);
      return expectedAnswer.findIndex(answer => answer == answerRequest) === 0 ? buildObjectResponse('menu', 'informative', 1): buildObjectResponse('approval', 'authorization', 11)
    },
    ['approval-greeting-11']: ()=> {
      const { expectedAnswer } = script().find(message => message.category === category && message.type === type && message.order === order);
      return expectedAnswer.findIndex(answer => answer == answerRequest) === 0 ? buildObjectResponse('menu', 'informative', 1): buildObjectResponse('approval', 'authorization', 11)
    },
    ['menu-informative-1']: ()=> buildObjectResponse('menu', 'services', 2),
    ['menu-services-2']: ()=> {
      const { expectedAnswer } = script().find(message => message.category === category && message.type === type && message.order === order);
      return expectedAnswer.findIndex(answer => answer == answerRequest) === 0 ? buildObjectResponse('recruiting', 'servicesnominee', 1): buildObjectResponse('commercial', 'servicescustomer', 1)
    },
    ['recruiting-servicesnominee-1']: ()=> buildObjectResponse('recruiting', 'servicesnominee', 11),
    ['recruiting-servicesnominee-11']: ()=> buildObjectResponse('recruiting', 'servicesnominee', 12),
    ['recruiting-servicesnominee-12']: ()=> buildObjectResponse('recruiting', 'servicesnominee', 13),
    ['recruiting-servicesnominee-13']: ()=> buildObjectResponse('recruiting', 'servicesnominee', 14),
    ['recruiting-servicesnominee-14']: ()=> buildObjectResponse('recruiting', 'servicesnominee', 15),
    ['recruiting-servicesnominee-15']: ()=> buildObjectResponse('recruiting', 'servicesnominee', 16),
    ['recruiting-servicesnominee-16']: ()=> {
      const { expectedAnswer } = script().find(message => message.category === category && message.type === type && message.order === order);
      return expectedAnswer.findIndex(answer => answer == answerRequest) === 0 ? buildObjectResponse('expericence', 'survey', 1): buildObjectResponse('expericence', 'survey', 6)
    },
    ['commercial-servicescustomer-1']: ()=> buildObjectResponse('commercial', 'servicescustomer', 11),
    ['commercial-servicescustomer-11']: ()=> buildObjectResponse('commercial', 'servicescustomer', 12),
    ['commercial-servicescustomer-12']: ()=> buildObjectResponse('commercial', 'servicescustomer', 13),
    ['commercial-servicescustomer-13']: ()=> buildObjectResponse('commercial', 'servicescustomer', 14),
    ['commercial-servicescustomer-14']: ()=> buildObjectResponse('commercial', 'servicescustomer', 15),
    ['commercial-servicescustomer-15']: ()=> buildObjectResponse('commercial', 'servicescustomer', 16),
    ['commercial-servicescustomer-16']: ()=> {
      const { expectedAnswer } = script().find(message => message.category === category && message.type === type && message.order === order);
      return expectedAnswer.findIndex(answer => answer == answerRequest) === 0 ? buildObjectResponse('expericence', 'survey', 1): buildObjectResponse('expericence', 'survey', 6)
    },
    ['expericence-survey-1']: ()=> buildObjectResponse('expericence', 'survey', 2),
    ['expericence-survey-2']: ()=> buildObjectResponse('expericence', 'survey', 3),
    ['expericence-survey-3']: ()=> buildObjectResponse('expericence', 'survey', 4)
  }
  
  return (typeof nextMessage[`${category}-${type}-${order}`] === 'function' && nextMessage[`${category}-${type}-${order}`]())
}

const buildObjectResponse = (category, type, order)=> ({ category, type, order });

const nextMessageIfAnswer = async (category, type, order,ifYes, ifNo, answerRequest)=>{
  const { expectedAnswer } = script().find(message => message.category === category && message.type === type && message.order === order);
  return expectedAnswer.findIndex(answer => answer == answerRequest) === 0 ? ifYes: ifNo;

}

const sendNotification = async (key)=>{
  const answers = cache.get(`user-${key}`);
  const answersCommercial = answers.filter(({question: { category }}) => category === 'commercial');
  const answersRecruiting = answers.filter(({question: { category }}) => category === 'recruiting');
  const answersExperiences = answers.filter(({question: { category }}) => category === 'expericence');
  const answersMenu = answers.filter(({question: { category }}) => category === 'menu' || category === 'approval');
  
  answersCommercial.length && (await sendEmail({ text: await buildBodyNotification([...answersMenu, ...answersCommercial]), person: 'Julio Alberto Cano López' }, 'commercial', (info)=> console.log('Sent')));
  answersRecruiting.length && (await sendEmail({ text: await buildBodyNotification([...answersMenu, ...answersRecruiting]), person: 'Julio Alberto Cano López' }, 'recruiting', (info)=> console.log('Sent')));
  answersExperiences.length && (await sendEmail({ text: await buildBodyNotification([...answersMenu, ...answersExperiences]), person: 'Julio Alberto Cano López' }, 'experience', (info)=> console.log('Sent')));
}

const buildBodyNotification = async ( answers )=> (`<ul>${
  answers.reduce((body, answerUser)=>{
    const { question : { category, order, type }, incomingMessage } = answerUser;
    const { answerResponse } = script().find(message => message.category === category && message.type === type && message.order === order);
    return `${body}<li> <span class="bold"> ${answerResponse()} :</span> <p> ${incomingMessage} </p>`
  },'')
}</ul>`) 

const answerService = {
  answerScript,
};

module.exports.answerService = answerService;
