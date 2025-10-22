import { generateFiniteAutomata, resetStateQ } from "./AutomatoFinito.js";

document
  .getElementById("bt-insert-word")
  .addEventListener("click", btInsertWord);
document
  .getElementById("bt-reset-language")
  .addEventListener("click", btResetAutomataLanguage);

const wordList = document.getElementById("word-list");

// Dicionario para sincronizar o autmato com a UI
let currentWords = [];

function btInsertWord() {
  const txWord = document.getElementById("tx-word");
  const word = txWord.value;

  if (!word || word.trim() === "") {
    alert("Por favor, digite uma palavra.");
    return;
  }

  if (currentWords.includes(word)) {
    alert("Essa palavra já foi adicionada.");
    txWord.value = "";
    return;
  }

  // Adiciona no dicionário interno
  currentWords.push(word);

  // Cria os elementos da lista na tela
  const listItem = document.createElement("li");
  const wordText = document.createElement("span");
  const deleteButton = document.createElement("button");

  wordText.textContent = word;
  deleteButton.textContent = "x";
  deleteButton.title = "Excluir esta palavra";

  // Evento para remover a palvra do dicionario
  deleteButton.addEventListener("click", function () {
    wordList.removeChild(listItem);

    const index = currentWords.indexOf(word);
    if (index > -1) {
      currentWords.splice(index, 1);
    }

    // Sincroniza o autômato com o dicionario
    rebuildAutomata();
  });

  listItem.appendChild(wordText);
  listItem.appendChild(deleteButton);
  wordList.appendChild(listItem);

  // Reconstroi o autômato com a nova palavra
  rebuildAutomata();

  txWord.value = "";
  txWord.focus();
}

function rebuildAutomata() {
  resetStateQ();

  for (const w of currentWords) {
    generateFiniteAutomata(w);
  }
}

function btResetAutomataLanguage() {
  resetStateQ();
  wordList.innerHTML = "";
  currentWords = [];
}
