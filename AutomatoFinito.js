let stateQ = [] // Estados q0, q1, q2...

/*
    stateQ[0] = [['a', 'b'], ['b','c']]

*/

// Recebe uma string e gera o novo autômato
export async function generateFiniteAutomata(word){
    word = word.toLowerCase();
    let posStateQ = 0    

    for (let i = 0; i < word.length; i++){
        let char = word[i];
        console.log(char, posStateQ)

        // Se o vetor das regras não for inciciado ainda, ele apenas inicia com a letra
        if (stateQ.length == 0){
            let next_char = word.length - 1 == i ? 'EPSILON' : word[i+1]; 
            stateQ.push([[char, next_char]]);
            posStateQ = 1;
            continue
        }
        // Verifica se é o último caracter, se sim, adiciona condição de parada
        let next_char = i == word.length-1 ? "EPSILON" : word[i+1];
        

        // Verificar se a regra já existe
        const rules = stateQ[posStateQ]

        if (!rules){
            console.log("Não esta na regra")
            stateQ.push([[char, next_char]])
            posStateQ = stateQ.length;
            continue;
        }

        let found = false
        console.log(rules)
        for (let j = 0; j < rules.length; j++){
            // Verifica se tem uma regra para aquela letra
            if (rules[j][0] == char){
                found = true
                if (rules[j][1] == next_char){
                    posStateQ++;
                    continue;
                }
                else{
                    let uploaded_rules = rules
                    uploaded_rules.push([char, next_char])
                    posStateQ = stateQ.length;
                    continue;
                }
            }
        }

        if (!found){
            stateQ.push([[char, next_char]]);
            posStateQ = stateQ.length;
        }
    }

    console.log(stateQ)
}

export async function resetStateQ(params) {
    stateQ = []
}