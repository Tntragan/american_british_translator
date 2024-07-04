const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translate = new Translator();

suite('Unit Tests', () => {
    test('Translate "Mangoes are my favorite fruit." to British English', () => {
        let sentence = "Mangoes are my favorite fruit.";
        let locale = "american-to-british"
        assert.equal(translate.translate(sentence, locale), "Mangoes are my <span class='highlight'>favourite</span> fruit.");
    });

    test('Translate "I ate yogurt for breakfast." to British English', () => {
        let sentence = "I ate yogurt for breakfast.";
        let locale = "american-to-british"
        assert.equal(translate.translate(sentence, locale), "I ate <span class='highlight'>yoghurt</span> for breakfast.");
    });

    test("Translate 'We had a party at my friend's condo.' to British English", () => {
        let sentence = "We had a party at my friend's condo.";
        let locale = "american-to-british"
        assert.equal(translate.translate(sentence, locale), "We had a party at my friend's <span class='highlight'>flat</span>.");
    });

    test('Translate "Can you toss this in the trashcan for me?" to British English', () => {
        let sentence = "Can you toss this in the trash can for me?";
        let locale = "american-to-british"
        assert.equal(translate.translate(sentence, locale), "Can you toss this in the <span class='highlight'>rubbish</span> can for me?");
    });

    test('Translate "The parking lot was full." to British English', () => {
        let sentence = "The parking lot was full.";
        let locale = "american-to-british"
        assert.equal(translate.translate(sentence, locale), "The <span class='highlight'>car park</span> was full.");
    });

    test('Translate "Like a high tech Rube Goldberg machine." to British English', () => {
        let sentence = "Like a high tech Rube Goldberg machine.";
        let locale = "american-to-british"
        assert.equal(translate.translate(sentence, locale), "Like a high tech <span class='highlight'>Heath Robinson device</span>.");
    });

    test('Translate "To play hooky means to skip class or work." to British English', () => {
        let sentence = "To play hooky means to skip class or work.";
        let locale = "american-to-british"
        assert.equal(translate.translate(sentence, locale), "To <span class='highlight'>bunk off</span> means to skip class or work.");
    });

    test('Translate "No Mr. Bond, I expect you to die." to British English', () => {
        let sentence = "No Mr. Bond, I expect you to die.";
        let locale = "american-to-british"
        assert.equal(translate.translate(sentence, locale), "No <span class='highlight'>Mr</span> Bond, I expect you to die.");
    });

    test('Translate "I ate yogurt for breakfast." to British English', () => {
        let sentence = "I ate yogurt for breakfast.";
        let locale = "american-to-british"
        assert.equal(translate.translate(sentence, locale), "I ate <span class='highlight'>yoghurt</span> for breakfast.");
    });

    test('Translate "I ate yogurt for breakfast." to British English', () => {
        let sentence = "I ate yogurt for breakfast.";
        let locale = "american-to-british"
        assert.equal(translate.translate(sentence, locale), "I ate <span class='highlight'>yoghurt</span> for breakfast.");
    });

});
