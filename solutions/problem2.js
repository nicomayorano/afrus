import fetch from 'node-fetch';

// Suma total de pokemones por tipo, debe recibir el tipo en string.
async function getPokeCountByType(type) {
  const rawData = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await rawData.json();
  return data.pokemon.length;
}

// console.log(await getPokeCountByType('fire'))
// node solutions/problem2.js


// Dado 2 tipos de pokémon retornar todos los pokemones que cumplen con esos 2 tipos.
async function getPokeByTwoTypes(a, b) {
  let rawData = await fetch(`https://pokeapi.co/api/v2/type/${a}`);
  let data = await rawData.json();
  const typeA = data.pokemon;

  rawData = await fetch(`https://pokeapi.co/api/v2/type/${b}`);
  data = await rawData.json();
  const typeB = data.pokemon;
  
  const acc = [];
  for (let i = 0; i < typeA.length; i++) {
    for (let j = 0; j < typeB.length; j++) {
      if (typeA[i].pokemon.name === typeB[j].pokemon.name) {
        acc.push(typeA[i].pokemon.name);
      }
    }
  }
  return acc;
}

// console.log(await getPokeByTwoTypes('flying', 'electric'))
// node solutions/problem2.js


// Dado el nombre de un pokémon retornar el número del mismo.
async function getPokeId(name) {
  let rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  let data = await rawData.json();
  return data.id;
}

// console.log(await getPokeId('pikachu'))
// node solutions/problem2.js


// Dado el número de un pokémon retornar un objeto con sus 6 stats base.
async function getPokeStats(id) {
  let rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let data = await rawData.json();
  const acc = {};
  for (let i = 0; i < data.stats.length; i++) {    
    Object.defineProperty(acc, data.stats[i].stat.name, {
      value: data.stats[i].base_stat,
      enumerable: true,
    });
  }
  return acc;
}

// console.log(await getPokeStats(25))
// node solutions/problem2.js


// Realizar una función que reciba un arreglo de números (Ids de pokémon) y un ordenador y retorne los pokémon en un arreglo con su nombre,
// tipo y peso ordenados según se indique por la función por uno de estos 3 indicadores.
async function orderBy(arr, ordenador) {
  const acc = [];
  for (let i = 0; i < arr.length; i++) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${arr[i]}`)
      .then(res => res.json())
      .then(poke => acc.push({ name: poke.name, weight: poke.weight, height: poke.height }));
  }
  if (ordenador === 'name') {
    return acc.sort((a, b) => String(a[ordenador]).localeCompare(String(b[ordenador])));
  }
  return acc.sort((a, b) => a[ordenador] - b[ordenador]);
}

// console.log(await orderBy([5, 15, 25, 35, 45], 'name'))
// node solutions/problem2.js


// Recibir un número y un tipo (de pokémon) y retornar un true o false si el pokémon de ese número posee este tipo
async function isType(id, type) {
  let rawData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let data = await rawData.json();
  return data.types.find(t => String(t.type.name) === type) ? true : false;
}

// console.log(await isType(25, 'fire'))
// console.log(await isType(25, 'electric'))
// node solutions/problem2.js
