import { generateFiniteAutomata, resetStateQ, getAutomata, validateSentence } from "./AutomatoFinito.js";

document
  .getElementById("bt-insert-word")
  .addEventListener("click", btInsertWord);
document
  .getElementById("bt-reset-language")
  .addEventListener("click", btResetAutomataLanguage);

document
  .getElementById("tx-word-to-valide")
  .addEventListener("input", txInputLetter)


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
  createTableAutomata();
}

function btResetAutomataLanguage() {
  resetStateQ();
  createTableAutomata();
  wordList.innerHTML = "";
  currentWords = [];
}

// Cria a tabela para visualização do automato
function createTableAutomata(){
  const alphabet = Array.from({length: 27}, (_, i) => String.fromCharCode(97 + i));
  alphabet[26] = "EPSILON";
  const table = document.getElementById('table-automata');
  table.replaceChildren();

  // Adicionando o cabeçalho
  const thead = document.createElement("thead")
  const headerRow = document.createElement("tr");

  const qX = document.createElement("th");
  qX.textContent = "qX";
  headerRow.appendChild(qX);

  // Adicionando o alfabeto
  alphabet.forEach(letter => {
    const th = document.createElement("th");
    th.textContent = letter;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Dados da tabela
  const automata = getAutomata();

  const tbody = document.createElement("tbody");

  for (let i = 0; i < automata.length; i++) {
    const ruleState = automata[i]
    const row = document.createElement("tr");
    const tdQX = document.createElement("td");
    tdQX.textContent = `q${i}`
    row.appendChild(tdQX);

    alphabet.forEach(letter => {
      const td = document.createElement("td");

      const nextState = letter == "EPSILON" ? "X" : `q${ruleState[letter]}`;
      const fieldValue = (letter in ruleState) ?  nextState : '-';
      
      td.textContent = fieldValue;
      row.appendChild(td);
    });

    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  
}


function txInputLetter(){
  const word = document.getElementById("tx-word-to-valide").value;
  const lastLetter = word[word.length-1];

  if (lastLetter == " "){
    const isSetenceValid = validateSentence(word);
    console.log(isSetenceValid)
    document.getElementById("tx-word-to-valide").value = "";
  }

}