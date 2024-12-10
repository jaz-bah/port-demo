function splitText(element, options = { words: 1, chars: 1, spacing: 5 }) {
    options.words = options.hasOwnProperty("words") ? options.words : 1;
    options.chars = options.hasOwnProperty("chars") ? options.chars : 1;
    options.spacing = options.hasOwnProperty("spacing") ? options.spacing : 5;

    function searchTextNodes(element) {
        let foundTextNodes = [];
        if (!element) return foundTextNodes; // Simplified null/undefined check
        element.childNodes.forEach((node) => {
            if (node.nodeName === "#text") {
                foundTextNodes.push(node);
            } else {
                foundTextNodes = foundTextNodes.concat(searchTextNodes(node));
            }
        });
        return foundTextNodes;
    }

    function createElement(text, relatedNode, className = "") {
        const node = document.createElement("span"); // Create span element
        const nodeText = document.createTextNode(text);
        node.appendChild(nodeText);
        node.style.display = "inline-block";
        node.style.position = "relative";

        if (className) {
            node.classList.add(className); // Add the class if provided
        }

        relatedNode.parentNode.insertBefore(node, relatedNode);
        return node;
    }

    function splitCharacters(textNode) {
        const characters = textNode.nodeValue;
        const chars = [];
        if (characters.trim() !== "") {
            for (let c = 0; c < characters.length; c++) {
                const character = characters[c];
                if (character.trim() !== "") { // Ignore spaces
                    const char = createElement(character, textNode, "split_char"); // Add class "split_char"
                    chars.push(char);
                }
            }
            textNode.parentNode.removeChild(textNode);
        }
        return chars;
    }

    function splitWords(textNode) {
        const textWords = textNode.nodeValue.split(" ");
        const words = [];
        for (let w = 0; w < textWords.length; w++) {
            const textWord = textWords[w].trim(); // Trim spaces around words
            if (textWord !== "") { // Only create elements for non-empty words
                const word = createElement(textWord, textNode, "split_word"); // Add class "split_word"
                words.push(word);
            }
            // Always append a space after a word, unless it's the last word
            if (w < textWords.length - 1) {
                const spaceNode = document.createTextNode(" "); // Create a text node for space
                textNode.parentNode.insertBefore(spaceNode, textNode); // Insert space before the textNode
            }
        }
        textNode.parentNode.removeChild(textNode); // Remove the original text node after processing
        return words;
    }

    function splitTextNodes(textNodes) {
        const splitText = { words: [], chars: [] };

        textNodes.forEach((textNode) => {
            if (options.words === 0) {
                splitText.chars = splitText.chars.concat(splitCharacters(textNode));
            } else {
                const words = splitWords(textNode);
                if (options.chars === 1) {
                    words.forEach((word) => {
                        const chars = splitCharacters(word.firstChild);
                        splitText.chars = splitText.chars.concat(chars);
                    });
                }
                splitText.words = splitText.words.concat(words);
            }
        });

        return splitText;
    }

    const textNodes = searchTextNodes(element);
    return splitTextNodes(textNodes);
}
