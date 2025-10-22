let stateQ = [] // Estados q0, q1, q2...

// TOFIX: A lógica ainda está meio confusa e bagunçada
// Quando recebe uma nova letra ele deve criar uma nova regra
// TESTE e TESTES   || A regra 4 deve ser (E, -1) e (E, 5) -- Cria uma nova regra
// TESTE e TESTANDO || A regra 3 deve ser (T,4) e (T,5), onde a regra 5 tem (A, 6)

// Recebe uma string e adiciona ao autômato existente
export async function generateFiniteAutomata(word) {
    word = word.toLowerCase();
    let posStateQ = 0;

    for (let i = 0; i < word.length; i++) {
        let char = word[i];

        let nextState = i === word.length - 1 ? -1 : posStateQ + 1;

        // Se o autômato ainda está vazio, cria o primeiro estado
        if (stateQ.length === 0) {
            stateQ.push([[char, nextState]]);
            posStateQ = nextState === -1 ? 0 : nextState;
            continue;
        }

        // Pega as regras do estado atual
        const rules = stateQ[posStateQ] || [];
        let found = false;

        for (let j = 0; j < rules.length; j++) {
            if (rules[j][0] === char) {
                found = true;

                // Se a transição já está correta -> apenas segue para o próximo estado
                if (rules[j][1] === nextState) {
                    posStateQ = nextState === -1 ? 0 : nextState;
                } else {
                    rules.push([char, nextState]);
                    posStateQ = nextState === -1 ? 0 : nextState;
                }
                break;
            }
        }

        // Se não encontrou nenhuma transição, cria nova
        if (!found) {
            stateQ[posStateQ] = rules; 
            rules.push([char, nextState]);

            // Se o próximo estado não é final, cria o array do estado
            if (nextState !== -1 && !stateQ[nextState]) {
                stateQ[nextState] = [];
            }

            posStateQ = nextState === -1 ? 0 : nextState;
        }
    }

    console.log(stateQ);
}

export async function resetStateQ() {
    stateQ = [];
}
