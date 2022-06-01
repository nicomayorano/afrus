// Solución 1

function multiplicacion(a, b) {
  let acc = 0;
  for (let i = 0; i < Math.abs(b); i++) {
    acc += Math.abs(a);
  }
  if (a < 0 && b < 0) return acc;
  if (a < 0 || b < 0) return -acc;
  return acc;
}

console.log(multiplicacion(5,5))