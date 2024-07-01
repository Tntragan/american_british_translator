const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    translate({ text: sentence, locale: locale }) {
        if (locale == "american-to-british") {
            for (let key in americanOnly) {
                const regex = new RegExp(key)
                if (sentence.toLowerCase().match(regex, americanOnly[key])) {
                    sentence = sentence.toLowerCase().replace(regex, americanOnly[key]);
                }
            }
            sentence = this.title(sentence, locale);
            console.log(sentence);
            sentence = this.amToBritSpelling(sentence);
            return sentence;
        }

    }

    title(sentence, locale) {
        if (locale == "american-to-british") {
            for (let key in americanToBritishTitles) {
                const regex = new RegExp(key)
                if (sentence.toLowerCase().match(regex, americanToBritishTitles[key])) {
                    sentence = sentence.toLowerCase().replace(regex, americanToBritishTitles[key]);
                }
            }
            return sentence;
        }
    }

    amToBritSpelling(sentence) {
        const sentenceArray = sentence.split(/(\b)/g);
        for (let i = 0; i < sentenceArray.length; i++) {
            for (let key in americanToBritishSpelling) {
                const word = sentenceArray[i];
                if (word.toLowerCase() == key) {
                    if (word.charCodeAt(0) > 64 && word.charCodeAt(0) < 91) {
                        sentenceArray[i] = americanToBritishSpelling[key].charAt(0).toUpperCase() + americanToBritishSpelling[key].slice(1);
                    } else {
                        sentenceArray[i] = americanToBritishSpelling[key];
                    }
                }
            }
        }
        const newSentence = sentenceArray.join('');
        const capSentence = this.capFirstLetter(newSentence);
        return capSentence;
    }

    capFirstLetter(sentence) {
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
        for (let i = 0; i < sentence.length; i++) {
            if (sentence[i].match(/[!.?]/g) && i != sentence.length - 1) {
                sentence = sentence.slice(0, i + 2) + sentence.charAt(i + 2).toUpperCase() + sentence.slice(i + 3);
            }
        }
        return sentence;
    }
}

module.exports = Translator;