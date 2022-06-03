function multiplicacion() {
  let acc = Number(0);
  const a = document.getElementById('factor1');
  const b = document.getElementById('factor2');
  const producto = document.getElementById('producto');

  for (let i = 0; i < Math.abs(b.value); i++) {
    acc += Math.abs(a.value);
  }

  if (a.value < 0 && b.value < 0) {
    producto.innerHTML = acc;
  } else if (a.value < 0 || b.value < 0) {
    producto.innerHTML = -acc;
  } else {
    producto.innerHTML = acc;
  }
}

function loadPageListeners() {
  const factor1 = document.getElementById('factor1');
  factor1.addEventListener('input', multiplicacion);
  const factor2 = document.getElementById('factor2');
  factor2.addEventListener('input', multiplicacion);
}
document.addEventListener('DOMContentLoaded', loadPageListeners);
