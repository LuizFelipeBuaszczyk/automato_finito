import { generateFiniteAutomata, resetStateQ } from './AutomatoFinito.js';

document.getElementById('bt-insert-word').addEventListener('click', btInsertWord);
document.getElementById('bt-reset-language').addEventListener('click', btResetAutomataLanguage);

function btInsertWord() {
    var word = document.getElementById('tx-word').value;

    generateFiniteAutomata(word);
} 

function btResetAutomataLanguage(){
    resetStateQ();
}