// Solución 1

function suma(a, b) {
  let acc = 0;
  for (let i = 0; i < b; i++) {
    acc += a;
  }
  return acc;
}