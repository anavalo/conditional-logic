const variablesString = (length) => {
  const characters = "PQRSTUVWXYZ";
  return characters.slice(0, length);
};

// object equality function
const isEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

const stringifyBoolean = (bool) => {
  return bool ? "T" : "F";
};

// P <-> Q
const bicondition = (a, b) => a === b;

// P → R
const implication = (a, b) => (a ? b : true);

// P ∧ R
const conjuction = (a, b) => a && b;

// P V R
const disjunction = (a, b) => a || b;

// !P
const negation = (a) => !a;

const findLogic = (fn, numberOfArguments) => {
  const name = variablesString(numberOfArguments);
  let combimation = [];
  let hash = {
    [`${name}`]: [
      ...Array.from(Array(numberOfArguments).keys()).map((x) => true),
    ],
  };

  for (let i = 0; i < 2 ** numberOfArguments; i++) {
    let bin = i.toString(2).padStart(numberOfArguments, "0");
    let arr = bin.split("").map((x) => x === "1");
    hash = {
      ...hash,
      [`${name}`]: arr.map((x) => stringifyBoolean(x)),
      result: stringifyBoolean(fn(...arr)),
    };
    combimation.push(hash);
  }

  return combimation;
};

// (P∨Q) → R
const e1 = (P, Q, R) => {
  return implication(disjunction(P, Q), R);
};

//  (!P ∧ !Q)
const e2 = (P, Q) => {
  return conjuction(negation(P), negation(Q));
};

// (!P V !Q)
const e3 = (P, Q) => {
  return disjunction(negation(P), negation(Q));
};

// (P ∧ Q) V (!P ∧ !Q) equals to P ↔ Q
const e4 = (P, Q) => {
  return disjunction(conjuction(P, Q), e2(P, Q));
};

// P V (P ∧ Q)
const e5 = (P, Q) => {
  return disjunction(P, conjuction(P, Q));
};

// an alternative way to write  P → Q is !P V Q

// console.log(isEqual(findLogic(e4, 2), findLogic(bicondition, 2)));
console.log(findLogic(e5, 2));
