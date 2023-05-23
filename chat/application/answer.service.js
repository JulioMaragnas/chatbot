const { script } = require('../domain/scripts.whtpp');

const answerScript = (incomingMessage, profileName) => {
  const [splittedMessage] = incomingMessage.split(' ');
  console.log('incoming message', incomingMessage);
  const { answer } = script().find(({ coincidences }) =>
    coincidences.toLowerCase().includes(splittedMessage)
  ) || {
    answer: () => `${profileName.split(' ')[0]} por favor repite tu pregunta.`,
  };
  return answer(incomingMessage, profileName);
};

const answerService = {
  answerScript,
};

module.exports.answerService = answerService;
