'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const sentence = req.body.text;
      const spellWords = translator.checkSpelling(sentence);
      const capitalize = translator.capFirstLetter(sentence);

    });
};
