'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      // const locale = req.body.locale;
      // const sentence = req.body.text;
      const { text, locale } = req.body;
      console.log(locale);
      if (!locale || text == undefined) {
        return res.json({ error: "Required field(s) missing" });
      }
      if (!text) {
        return res.json({ error: "No text to translate" });
      }
      if (locale !== "american-to-british" && locale !== "british-to-american") {
        return res.json({ error: 'Invalid value for locale field' })
      }
      const translateText = translator.translate(text, locale);
      if (text == translateText) {
        return res.json({ text: text, translation: "Everything looks good to me!" });
      }
      console.log();
      return res.json({ text: text, translation: translateText });
    });
};
