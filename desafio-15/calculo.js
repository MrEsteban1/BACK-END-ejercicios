const randomNumbers = (cant) => {
  let numbersRepeated = {};
  for (let i = 0; i < cant; i++) {
    nroRandom = Math.trunc(Math.random() * 1001);
    if (numbersRepeated[nroRandom] === undefined) {
      numbersRepeated[nroRandom] = 1;
    } else {
      numbersRepeated[nroRandom]++;
    }
  }
  return numbersRepeated;
};

process.on("message", (cant) => {
  let numbers = randomNumbers(cant);
  process.send(numbers);
});

module.exports = randomNumbers
