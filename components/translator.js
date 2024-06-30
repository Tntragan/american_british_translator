const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    checkSpelling(sentence) {
        const sentenceArray = sentence.split(/(\b)/g);
        // console.log(sentenceArray);
        // console.log(sentenceArray.join(''));
        //console.log(sentenceArray);
        for (let i = 0; i < sentenceArray.length; i++) {
            for (let key in americanToBritishSpelling) {
                const word = sentenceArray[i];
                if (word.toLowerCase() == key) {
                    sentenceArray[i] = americanToBritishSpelling[key];
                }
            }

        }
        const newSentence = sentenceArray.join('');
        console.log(sentence);
        console.log(this.capFirstLetter(newSentence));
    }

    capFirstLetter(sentence) {
        const sentenceArray = sentence.split(/[!.?]/g)
        let newArray = [];
        for (let i = 0; i < sentenceArray.length; i++) {
            if (sentenceArray[i].charAt(0) == " ") {
                newArray.push(sentenceArray[i].charAt(1).toUpperCase() + sentenceArray[i].slice(2));
            } else {
                newArray.push(sentenceArray[i].charAt(0).toUpperCase() + sentenceArray[i].slice(1));
            }
        }
        return newArray.join('');
        //console.log((sentence.charAt(0).toUpperCase() + sentence.slice(1)));
        //console.log(newArray);
    }

}

module.exports = Translator;