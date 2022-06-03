// Helpers
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}


// Problem 1
function getPokeCountByType() {
  const input = document.getElementById('p1');
  const result = document.getElementById('r1');
  fetch(`https://pokeapi.co/api/v2/type/${input.value}`)
  .then(res => res.json())
  .then(cantidad => {
    result.innerHTML = cantidad.pokemon.length;
  })
  .catch(err => console.error(err));
}


// Problem 2
async function getPokeByTwoTypes() {
  const input1 = document.getElementById('p2-1');
  const input2 = document.getElementById('p2-2');
  const result = document.getElementById('r2');
  let acc = []
  if (input1.value && input2.value) {
    let typeA, typeB;
    fetch(`https://pokeapi.co/api/v2/type/${input1.value}`)
    .then(res => res.json())
    .then(data => {
      typeA = data.pokemon;
    })
    .catch(err => console.error(err));

    fetch(`https://pokeapi.co/api/v2/type/${input2.value}`)
    .then(res => res.json())
    .then(data => {
      typeB = data.pokemon;
      for (let i = 0; i < typeA.length; i++) {
        for (let j = 0; j < typeB.length; j++) {
          if (typeA[i].pokemon.name === typeB[j].pokemon.name) {
            acc.push(typeA[i].pokemon.name);
          }
        }
      }
      result.innerHTML = acc.concat();
    })
    .catch(err => console.error(err));    
  }
}


// Problem 3
async function getPokeId() {
  const input = document.getElementById('p3');
  const result = document.getElementById('r3');
  fetch(`https://pokeapi.co/api/v2/pokemon/${input.value}`)
    .then(res => res.json())
    .then(poke => {
      result.innerHTML = poke.id;
    })
    .catch(err => console.error(err));
}


// Problem 4
async function getPokeStats() {
  const input = document.getElementById('p4');
  const result = document.getElementById('r4');
  let acc = {};
  fetch(`https://pokeapi.co/api/v2/pokemon/${input.value}`)
    .then(res => res.json())
    .then(poke => {
      for (let i = 0; i < poke.stats.length; i++) {    
        Object.defineProperty(acc, poke.stats[i].stat.name, {
          value: poke.stats[i].base_stat,
          enumerable: true,
        });
      }
      result.innerHTML = JSON.stringify(acc);

    })
    .catch(err => console.error(err));
}


// Problem 5
async function orderBy() {
  const input = document.getElementById('p5-ids');
  const ordenador = document.getElementById('p5-order');
  const result = document.getElementById('r5');
  let strInput = String(input.value);
  let arr = strInput.split(' ');
  const acc = [];
  for (let i = 0; i < arr.length; i++) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${arr[i]}`)
      .then(res => res.json())
      .then(poke => acc.push({ name: poke.name, weight: poke.weight, height: poke.height }))
      .catch(err => console.error(err));        
  }
  if (String(ordenador.value) === 'name') {
    result.innerHTML = JSON.stringify(acc.sort((a, b) => String(a[ordenador.value]).localeCompare(String(b[ordenador.value]))));
  } else {
    result.innerHTML = JSON.stringify(acc.sort((a, b) => a[ordenador.value] - b[ordenador.value]));
  }
}


// Problem 6
async function isType() {
  const id = document.getElementById('p6-id');
  const type = document.getElementById('p6-type');
  const result = document.getElementById('r6');
  if (id.value && type.value) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id.value}`)
    .then(res => res.json())
    .then(poke => {
      result.innerHTML = poke.types.find(t => String(t.type.name) === type.value) ? 'true' : 'false';
    })
    .catch(err => console.error(err));
  } else {
    result.innerHTML = 'completar campos';
  }
}

function loadPageListeners() {
  // Problem 1
  const p1 = document.getElementById('p1');
  p1.addEventListener('input', debounce(getPokeCountByType, 500));

  // Problem 2
  const p2_1 = document.getElementById('p2-1');
  const p2_2 = document.getElementById('p2-2');
  p2_1.addEventListener('input', debounce(getPokeByTwoTypes, 500));  
  p2_2.addEventListener('input', debounce(getPokeByTwoTypes, 500));

  // Problem 3
  const p3 = document.getElementById('p3');
  p3.addEventListener('input', debounce(getPokeId, 500));

  // Problem 4
  const p4 = document.getElementById('p4');
  p4.addEventListener('input', debounce(getPokeStats, 500));

  // Problem 5
  const p5_ids = document.getElementById('p5-ids');
  p5_ids.addEventListener('input', debounce(orderBy, 500));
  const p5_order = document.getElementById('p5-order');
  p5_order.addEventListener('change', debounce(orderBy, 500));

  // Problem 6
  const p6_id = document.getElementById('p6-id');
  const p6_type = document.getElementById('p6-type');
  p6_id.addEventListener('input', debounce(isType, 500));  
  p6_type.addEventListener('input', debounce(isType, 500));
}
document.addEventListener('DOMContentLoaded', loadPageListeners);
