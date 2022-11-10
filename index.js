const variablesString = (length) => {
  const characters = "PQRSTUVWXYZ";
  return characters.slice(0, length);
};

const stringifyBoolean = (bool) => {
  return bool ? "T" : "F";
};

// P → R
const implication = (...args) => {
  let result = true;
  for (let i = 0; i < args.length; i++) {
    if (i === 0) {
      result = args[i];
    } else {
      result = result ? args[i] : true;
    }
  }
  return result;
};

// P ∧ R
const conjuction = (...args) => {
  return [...args].every((arg) => arg);
};

// P V R
const disjunction = (...args) => {
  return [...args].some((arg) => arg);
};

// !P
const negation = (...args) => {
  return [...args].every((arg) => !arg);
};

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

let P;
let Q;
let R;
let S;

// example (P∨Q) → R
const exec1 = (P, Q, R) => {
  return implication(disjunction(P, Q), R);
};

console.log(findLogic(exec1, 3));
//[
//  { HCZ: [ 'F', 'F', 'F' ], result: 'T' },
//  { HCZ: [ 'F', 'F', 'T' ], result: 'T' },
//  { HCZ: [ 'F', 'T', 'F' ], result: 'F' },
//  { HCZ: [ 'F', 'T', 'T' ], result: 'T' },
//  { HCZ: [ 'T', 'F', 'F' ], result: 'F' },
//  { HCZ: [ 'T', 'F', 'T' ], result: 'T' },
//  { HCZ: [ 'T', 'T', 'F' ], result: 'F' },
//  { HCZ: [ 'T', 'T', 'T' ], result: 'T' }
//]
