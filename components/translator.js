const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    translate(sentence, locale) {
        if (locale == "american-to-british") {
            console.log(sentence);
            for (let key in americanOnly) {
                const regex = new RegExp(key)
                if (sentence.toLowerCase().match(regex, americanOnly[key])) {
                    sentence = sentence.toLowerCase().replace(regex, americanOnly[key]);
                }
            }
            sentence = this.changeTime(sentence, locale);
            sentence = this.title(sentence, locale);
            sentence = this.changeSpelling(sentence, locale);
            sentence = this.capFirstLetter(sentence);
            console.log(sentence);
            return sentence;
        }

    }

    changeTime(sentence, locale) {
        if (locale = "american-to=british") {
            const timeRegex = /[0-1]?[0-9]:[0-5][0-9]/;
            if (sentence.match(timeRegex)) {
                const amTime = sentence.match(timeRegex);
                const britTime = amTime[0].replace(":", ".");
                console.log(amTime[0], britTime);
                return sentence.replace(amTime[0], britTime);
            }
            return sentence;
        }
        if (locale = "british-to-american") {
            const timeRegex = /[0-1]?[0-9].[0-5][0-9]/;
            if (sentence.match(timeRegex)) {
                const britTime = sentence.match(timeRegex);
                const amTime = amTime[0].replace(".", ":");
                return sentence.replace(britTime[0], amTime);
            }
            return sentence;
        }
    }

    title(sentence, locale) {
        if (locale == "american-to-british") {
            for (let key in americanToBritishTitles) {
                const regex = new RegExp(key, "i")
                sentence = sentence.replace(regex, americanToBritishTitles[key].charAt(0).toUpperCase() + americanToBritishTitles[key].slice(1));
            }
        }
        return sentence;
    }

    changeSpelling(sentence, locale) {
        if (locale == "american-to-british") {
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
            return newSentence;
        }
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