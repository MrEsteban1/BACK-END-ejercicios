const randomNumbers = (cant) => {
  return new Promise((resolve, reject) => {
    let numbersRepeated = {};
  for (let i = 0; i < cant; i++) {
    nroRandom = Math.trunc(Math.random() * 1001);
    console.log("i:" + i)
    if (numbersRepeated[nroRandom] === undefined) {
      numbersRepeated[nroRandom] = 1;
    } else {
      numbersRepeated[nroRandom]++;
    }

    
    if(cant-1===i)resolve(numbersRepeated)
  }
  console.log("hola aqui "+cant,numbersRepeated)
  
})}
  
  

process.on("message", (cant) => {
  let numbers = randomNumbers(cant);
  process.send(numbers);
});

module.exports = randomNumbers
