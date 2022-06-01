/**
 * Multiplicación
 * @param {Number} a 
 * @param {Number} b 
 * @returns a * b
 */

function multiplicacion(a, b) {
  let acc = 0;
  for (let i = 0; i < Math.abs(b); i++) {
    acc += Math.abs(a);
  }
  if (a < 0 && b < 0) return acc;
  if (a < 0 || b < 0) return -acc;
  return acc;
}