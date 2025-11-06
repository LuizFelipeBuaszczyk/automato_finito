let stateQ = []; // Estados q0, q1, q2...

// Recebe uma string e adiciona ao autômato existente
export async function generateFiniteAutomata(word) {
  word = word.toLowerCase();
  let posStateQ = 0;

  for (let i = 0; i < word.length; i++) {
    let char = word[i];
    let nextChar = word.length - 1 == i ? "EPSILON" : word[i + 1];

    // Se o autômato ainda está vazio, cria o primeiro estado
    if (stateQ.length == 0) {
      let init_rule = {
        [char]: 1,
      };
      stateQ.push(init_rule);
      posStateQ = 1;
      continue;
    }

    let rules = stateQ[posStateQ];

    if (!rules) {
      posStateQ = stateQ.length + 1;
      let not_rule = {
        [char]: posStateQ,
      };
      stateQ.push(not_rule);
    } else {
      if (!(char in rules)) {
        rules[char] = stateQ.length;
        stateQ[posStateQ] = rules;
        posStateQ = stateQ.length;
      } else {
        posStateQ = rules[char];
      }
    }
    if (nextChar == "EPSILON") {
      if (!stateQ[posStateQ]) {
        stateQ.push({});
      }
      stateQ[posStateQ][nextChar] = -1;
    }
  }
}

export async function resetStateQ() {
  stateQ = [];
}

export function getAutomata() {
  return stateQ;
}

export function validatePrefix(prefix) {
  if (stateQ.length == 0) return { q: 0, valid: false };
  let q = 0;

  for (let i = 0; i < prefix.length; i++) {
    const symbol = prefix[i].toLowerCase();
    const rules = stateQ[q];

    if (!rules || !(symbol in rules)) {
      return { q: q, valid: false };
    }
    q = rules[symbol];
  }
  return { q: q, valid: true };
}

export function validateWord(word) {
  const result = validatePrefix(word.toLowerCase());
  if (!result.valid) return false;

  const finalStateRules = stateQ[result.q];
  return (
    finalStateRules &&
    "EPSILON" in finalStateRules &&
    finalStateRules["EPSILON"] == -1
  );
}
