/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Dog Facts';
const GET_FACT_MESSAGE = '';
const HELP_MESSAGE = 'You can say tell me a dog fact, or, you can say exit... What can I help you with? woof woof!';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
  '<voice name="Amy"><lang xml:lang="en-US">Cooper is a <prosody rate="x-slow">gooood boy</prosody></lang></voice>',
  '<voice name="Brian"><s>Finnly eats poop</s> eeee you</voice>',
  '<voice name="Raveena">Finnly like to milk cooper</voice>',
  '<voice name="Geraint">Cooper was raised by James</voice>',
  '<voice name="Joanna">Finnly likes to poop in Kaylie\'s room</voice>',
  '<voice name="Ivy">Neeee Neeee was a smart dog, smarter than Kobe</voice>',
  '<voice name="Matthew">Kobe was a bully</voice>',
  '<voice name="Justin">Kimo was very high class and an angel</voice>',
  '<voice name="Joey">James is a great dog trainer<audio src="soundbank://soundlibrary/animals/amzn_sfx_dog_med_woof_1x_01"/><audio src="soundbank://soundlibrary/animals/amzn_sfx_dog_med_woof_1x_01"/></voice>',
  '<voice name="Salli">I have a secret to tell you! <amazon:effect name="whispered"><prosody rate="x-slow"> <prosody volume="loud">Finnly stinks</prosody></prosody></amazon:effect></voice>',
  '<voice name="Salli"><prosody pitch="high">Neeee Neeee</prosody> had flees</voice>',
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
