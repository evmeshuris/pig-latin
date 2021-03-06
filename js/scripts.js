// Utility Logic

function noInputtedWord(word, text) {
  return text.trim().length === 0 || word.trim().length === 0;
}

// Business Logic

function wordCounter(text) {
  if (text.trim().length === 0) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function (element) {
    if (!Number(element)) {
      if (element !== "") {
        wordCount++;
      }
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function (element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  console.log();
  return wordCount;
}

function threeMostCommon(text) {
  const wordArray = text.split(" ");
  let newWordArray = [];
  let wordArrayCaps = [];
  wordArray.forEach((word) => {
    wordArrayCaps.push(word.toLowerCase());
  });
  wordArrayCaps.sort();
  let previousWord;
  wordArrayCaps.forEach((element) => {
    if (element !== previousWord) {
      const wordCount = numberOfOccurrencesInText(element, text);
      newWordArray.push({ word: element, count: wordCount });
      previousWord = element;
    }
  });
  sortArray(newWordArray, "count");
  const topThree = [newWordArray[0], newWordArray[1], newWordArray[2]];
  return topThree;
}
function sortArray(arr, prop) {
  arr.sort((a, b) => {
    if (typeof a[prop] === "string") return b[prop].localeCompare(a[prop]);
    return b[prop] - a[prop];
  });
}

//UI Logic
function boldPassage(word, text) {
  if (noInputtedWord(word, text)) {
    return "";
  }
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function (element, index) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== textArray.length - 1) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}
function listTopThree(text) {
  let htmlString = "<p>";
  const values = threeMostCommon(text);
  values.forEach((value) => {
    htmlString = htmlString.concat(value.word + " ");
    htmlString = htmlString.concat(value.count + ", ");
  });
  return htmlString;
}


// THIS iS WORK in console
function totalVowels(text) {
  var vowels = 'aeiouAEIOU';
  var getVowels = 0;

  for (var x = 0; x < text.length; x++) {
    if (vowels.indexOf(text[x]) !== -1) {
      getVowels += 1;
    }
  }
  return getVowels;
}

// pig latin//
function pigLatin(text) {
  var vowels = /[aeiouAEIOU]/gi;
  var pigAddLatin = "";

    if (text[0].match(vowels)) {
      pigAddLatin = text + "way";
    }
      else if (text.match(vowels) === null) {
      pigAddLatin = text + "WOW";
    } 
      else {
      // const sliceText = text.slice(2); //all except first two// same: text.substring(2)
      // const firstTwo = text.slice(0,2);

      // var vowelIndice = text.indexOf(text.match(vowels)[0]);
      // pigAddLatin = text.substr(vowelIndice) + text.substr(0, vowelIndice) + "ay";
      pigAddLatin = text.slice(2) + text.slice(0,2) + "ay";
    }
    return pigAddLatin;
}


// function pigLatin(text) {
//   var vowels = 'aeiouAEIOU';
//   var getVowels = [];
//   let wayArray = text.split(" ");


// console.log(totalVowels("The quick brown fox"));

$(document).ready(function () {
  $("form#word-counter").submit(function (event) {
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    const vowelCount = totalVowels(passage);
    const pigAddLatin = pigLatin(passage);
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    // $("#bolded-passage").html(boldPassage(word, passage));
    // $("#top-3").html(listTopThree(passage));
    $("#total-vowels").html(vowelCount);
    $("#pig-latin").html(pigAddLatin);
  });
});
