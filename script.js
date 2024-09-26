let sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "In the middle of difficulty lies opportunity."
];

let currentSentenceIndex = 0;
let correctWords = 0;
let startTime = null;

document.addEventListener("DOMContentLoaded", function () {
    const sentenceElement = document.getElementById("sentence");
    const inputElement = document.getElementById("input");
    const speedElement = document.getElementById("speed");
    const modeSwitch = document.getElementById("mode-switch");

    // Initialize the first sentence
    updateSentence();

    inputElement.addEventListener("input", function () {
        const typedText = inputElement.value.trim();
        const sentence = sentences[currentSentenceIndex];

        if (typedText.length === 0) {
            startTime = null;
            correctWords = 0;
            updateSentence(); // Re-update the sentence when input is cleared
        }

        if (!startTime) {
            startTime = new Date(); // Start the timer on first input
        }

        const highlightedSentence = highlightTypedText(sentence, typedText);
        sentenceElement.innerHTML = highlightedSentence;

        const words = sentence.split(' ');
        const typedWords = typedText.split(' ');

        // Check each word typed so far
        let allCorrect = true;
        for (let i = 0; i < typedWords.length; i++) {
            if (typedWords[i] !== words[i]) {
                allCorrect = false;
                break;
            }
        }

        if (allCorrect && typedWords.length === words.length) {
            correctWords++; // Increment correctly typed words
            inputElement.value = ""; // Clear input for the next word
            currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length; // Move to the next sentence
            updateSentence(); // Update the sentence displayed
        }

        const timeDiff = (new Date() - startTime) / 60000; // Time in minutes
        const wpm = Math.round((correctWords / timeDiff)); // Calculate WPM
        speedElement.textContent = wpm || 0; // Update speed
    });

    modeSwitch.addEventListener("change", function () {
        toggleMode();
    });
});

function updateSentence() {
    const sentenceElement = document.getElementById("sentence");
    sentenceElement.textContent = sentences[currentSentenceIndex];
}

function highlightTypedText(sentence, typedText) {
    let highlighted = '';
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === sentence[i]) {
            highlighted += `<span style="color: green;">${typedText[i]}</span>`;
        } else {
            highlighted += `<span style="color: red;">${typedText[i]}</span>`;
        }
    }
    highlighted += sentence.slice(typedText.length); // Append the rest of the sentence
    return highlighted;
}

function setBackgroundColor(color) {
    const body = document.body;
    body.classList.remove('red-mode', 'green-mode', 'blue-mode', 'dark-mode');
    if (color === 'red') {
        body.classList.add('red-mode');
    } else if (color === 'green') {
        body.classList.add('green-mode');
    } else if (color === 'blue') {
        body.classList.add('blue-mode');
    } else {
        body.classList.add('default-mode'); // Default state (light gradient)
    }
}