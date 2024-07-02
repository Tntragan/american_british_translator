'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const locale = req.body.locale;
      const sentence = req.body.text;
      console.log(locale);
      if (!sentence) {
        return res.json({ error: 'No text to translate' });
      }
      if (locale !== "american-to-british") {
        if (locale !== "british-to-american") {
          return res.json({ error: 'Invalid value for locale field' })
        }
        return res.json({ error: 'Invalid value for locale field' })
      }
      const translateSentence = translator.translate({ text: sentence, locale: locale });
      if (sentence == translateSentence) {
        return res.json({ text: sentence, translation: "Everything looks good to me!" });
      }

      return res.json({ text: sentence, translation: translateSentence });
    });
};
