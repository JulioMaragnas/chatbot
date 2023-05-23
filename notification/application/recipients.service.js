const recipients = async (areaToNotify, personToNotify)=>{
  const defaultRecipient = {
    recipient: 'julioalbertocano@gmail.com', 
    subject: 'Not found', 
    header: 'not found'
  };
  const recipients = {
    ['recruiting']: (person) => ({
      recipient: 'julioalbertocano@gmail.com',
      subject: 'Hola profesional de selección, alguien está interezado en una vacante!',
      header: `Candidato: ${person}`
    }),
    ['comercial']: (person) => ({
      recipient: 'julioalbertocano@gmail.com',
      subject: 'Hola líder comercial, alguien está interezado en nuestros servicios!',
      header: `Aliado ${person}`
    }),
    ['experience']: () => ({
      recipient: 'julioalbertocano@gmail.com',
      subject: 'Hola profesional de experiencias, un usuario calificó nuestra experiencia!',
      header: 'Calificación de experiencia'
    }),
  };
  
  if(['recruiting', 'comercial'].some(x => x === areaToNotify)){
    return (typeof recipients[areaToNotify] === 'function' && recipients[areaToNotify](personToNotify)) || defaultRecipient;  
 
  }
  return (typeof recipients[areaToNotify] === 'function' && recipients[areaToNotify]()) || defaultRecipient;  
};

module.exports.recipients = recipients