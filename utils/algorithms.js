export function generateWithCongruencial(seed, k, mod, add) {
  let constant = add + (8 * k)
  let numbers = [];
  while(numbers.length < 1001) {
    let xi = (constant * seed) % mod;
    let ri = xi / (mod - 1);
    if ((numbers.indexOf(ri) != -1)) break;
    numbers.push(ri);
    seed = xi;
  }
  return numbers;
}

export function generateWithCuadrados(seed) {
  let digits = seed.toString().length;
  console.log("Cantidad de digitos:  " + digits);
  let x1 = seed;
  let numbers = [];

  while(numbers.length < 1001) {
    let y1 = Math.pow(x1, 2);
    let y1Digits = y1.toString().length;
    let temp = (y1Digits - digits) / 2;
    x2 = y1.toString().substring(temp, temp + digits);
    if ((numbers.indexOf(x2) != -1)) break;
    numbers.push(x2);
    x1 = x2;
  }
  return numbers;
}

export function generateWithMultiplicador(seed, a) {
  let digits = seed.toString().length;
  let numbers = [];

  let x1 = 0;

  while(numbers.length < 1001) {
    let y0 = seed * a;
    let y0Digits = y0.toString().length;
    let temp = (y0Digits - digits) / 2;
    x1 = y0.toString().substring(temp, temp + digits);
    if ((numbers.indexOf(x1) != -1)) break;
    numbers.push(x1);
    seed = x1;
  } 
  return numbers;
}