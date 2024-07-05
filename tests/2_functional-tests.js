const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const string = 'Mangoes are my favorite fruit.';
const locale = 'american-to-british';
const translation = ''

suite('Functional Tests', () => {
    test("Solve puzzle with valid puzzle string", function (done) {
        chai
            .request(server)
            .post("/api/translate")
            .set("content-type", "application/json")
            .send({
                text: string,
                locale: locale
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.locale, locale);
                assert.equal(res.body.translation, 'Mangoes are my favourite fruit.')
                done();
            });
    })

});
