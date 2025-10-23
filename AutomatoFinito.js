let stateQ = [] // Estados q0, q1, q2...


// Recebe uma string e adiciona ao autômato existente
export async function generateFiniteAutomata(word) {
    word = word.toLowerCase();
    let posStateQ = 0;

    for (let i = 0; i < word.length; i++) {
        let char = word[i];
        let nextChar = word.length - 1 == i ? "EPSILON" : word[i+1];
        console.log(char, posStateQ)

        // Se o autômato ainda está vazio, cria o primeiro estado
        if (stateQ.length == 0) {
            let init_rule = {
                [char] : 1
            } 
            stateQ.push(init_rule);
            posStateQ = 1;
            continue;
        }

        let rules = stateQ[posStateQ]

        if (!rules){
            posStateQ = stateQ.length + 1
            let not_rule = {
                [char]: posStateQ
            }
            stateQ.push(not_rule);
        }
        else{

            if(!(char in rules)){
                rules[char] = stateQ.length;
                stateQ[posStateQ] = rules;
                posStateQ = stateQ.length;
            }
            else{
                posStateQ = rules[char];
            }
        }
        if (nextChar == "EPSILON"){
            stateQ.push({[nextChar]: -1})
        }

    }
            
}

export async function resetStateQ() {
    stateQ = [];
}

export function getAutomata() {
    return stateQ;
}
