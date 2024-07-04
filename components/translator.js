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
                if (sentence.toLowerCase().match(regex)) {
                    sentence = sentence.toLowerCase().replace(regex, `<span class='highlight'>${americanOnly[key]}</span>`); //americanOnly[key]);
                }
            }
            sentence = this.changeTime(sentence, locale);
            sentence = this.title(sentence, locale);
            sentence = this.changeSpelling(sentence, locale);
            sentence = this.capFirstLetter(sentence);
            console.log(sentence);
            return sentence;
        }
        if (locale == "british-to-american") {
            console.log(sentence);
            for (let key in britishOnly) {
                const regex = new RegExp(key + '\\s')
                if (sentence.toLowerCase().match(regex)) {
                    console.log(regex);
                    sentence = sentence.toLowerCase().replace(regex, `<span class='highlight'>${britishOnly[key]} </span>`);
                }
            }
            console.log(sentence);
            sentence = this.changeTime(sentence, locale);
            sentence = this.title(sentence, locale);
            sentence = this.changeSpelling(sentence, locale);
            sentence = this.capFirstLetter(sentence);
            console.log(sentence);
            return sentence;
        }

    }

    changeTime(sentence, locale) {
        if (locale == "american-to-british") {
            const timeRegex = /[0-1]?[0-9]:[0-5][0-9]/;
            if (sentence.match(timeRegex)) {
                const amTime = sentence.match(timeRegex);
                const britTime = amTime[0].replace(":", ".");
                return sentence.replace(amTime[0], `<span class='highlight'>${britTime}</span>`);
            }
            return sentence;
        }
        if (locale == "british-to-american") {
            const timeRegex = /[0-1]?[0-9].[0-5][0-9]/;
            if (sentence.match(timeRegex)) {
                const britTime = sentence.match(timeRegex);
                const amTime = britTime[0].replace(".", ":");
                return sentence.replace(britTime[0], `<span class='highlight'>${amTime}</span>`);
            }
            return sentence;
        }
    }

    title(sentence, locale) {
        if (locale == "american-to-british") {
            for (let key in americanToBritishTitles) {
                const regex = new RegExp(key, "gi")
                if (sentence.match(regex)) {
                    const newTitle = americanToBritishTitles[key].charAt(0).toUpperCase() + americanToBritishTitles[key].slice(1);
                    sentence = sentence.replace(regex, `<span class='highlight'>${newTitle}</span>`); // americanToBritishTitles[key].charAt(0).toUpperCase() + americanToBritishTitles[key].slice(1) + " ");
                }
            }
            return sentence;
        }
        if (locale == "british-to-american") {
            for (let key in americanToBritishTitles) {
                const regex = new RegExp(americanToBritishTitles[key] + '\\s', "gi")
                if (sentence.match(regex)) {
                    const newTitle = key.charAt(0).toUpperCase() + key.slice(1) + " ";
                    sentence = sentence.replace(regex, `<span class='highlight'>${newTitle}</span>`); //key.charAt(0).toUpperCase() + key.slice(1) + " ");
                }

            }
            return sentence;
        }
    }

    changeSpelling(sentence, locale) {
        console.log("Sentence coming into changeSpelling:", sentence);
        if (locale == "american-to-british") {
            const sentenceArray = sentence.split(/(\b)/g);
            for (let i = 0; i < sentenceArray.length; i++) {
                for (let key in americanToBritishSpelling) {
                    const word = sentenceArray[i];
                    if (word.toLowerCase() == key) {
                        if (word.charCodeAt(0) > 64 && word.charCodeAt(0) < 91) {
                            const newSpelling = americanToBritishSpelling[key].charAt(0).toUpperCase() + americanToBritishSpelling[key].slice(1);
                            sentenceArray[i] = `<span class='highlight'>${newSpelling}</span>`;
                        } else {
                            sentenceArray[i] = `<span class='highlight'>${americanToBritishSpelling[key]}</span>`;
                        }
                    }
                }
            }
            const newSentence = sentenceArray.join('');
            return newSentence;
        }
        if (locale == "british-to-american") {
            const sentenceArray = sentence.split(/(\b)/g);
            for (let i = 0; i < sentenceArray.length; i++) {
                for (let key in americanToBritishSpelling) {
                    const word = sentenceArray[i];
                    if (word.toLowerCase() == americanToBritishSpelling[key]) {
                        if (word.charCodeAt(0) > 64 && word.charCodeAt(0) < 91) {
                            const newSpelling = key.charAt(0).toUpperCase() + key.slice(1);
                            sentenceArray[i] = `<span class='highlight'>${newSpelling}</span>`;
                        } else {
                            sentenceArray[i] = `<span class='highlight'>${key}</span>`;
                        }
                    }
                }
            }
            const newSentence = sentenceArray.join('');
            return newSentence;
        }
    }

    capFirstLetter(sentence) {
        console.log("Sentence in capFirstLetter:", sentence)
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