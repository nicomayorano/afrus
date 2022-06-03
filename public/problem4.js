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

const arrayData = {
  arreglo: undefined,
  data: {
    size: undefined,
    odd_pct: undefined,
    even_pct: undefined,
    gt1000_pct: undefined,
    lowest: undefined,
    lowest_pct: undefined,
    highest: undefined,
    avg_pct: undefined,
  },  

  setSize() {
    this.data.size = this.arreglo.length;
  },

  percentageOddEvenAndGT1000() {
    let odd = 0, even = 0, gt1000 = 0;
    for (let i = 0; i < this.data.size; i++) {
      if (this.arreglo[i] % 2 === 0) {
        even++;
      } else {
        odd++;
      }
      if (this.arreglo[i] > 1000) {
        gt1000++;
      }
    }
    this.data.odd_pct = Number((odd * 100 / this.data.size).toFixed(2));
    this.data.even_pct = Number((even * 100 / this.data.size).toFixed(2));
    this.data.gt1000_pct = Number((gt1000 * 100 / this.data.size).toFixed(2));
  },

  lowestAndHighest() {
    this.data.lowest = Math.min(...this.arreglo);
    this.data.highest = Math.max(...this.arreglo);
    this.data.lowest_pct = Number((this.data.lowest * 100 / this.data.highest).toFixed(2));
  },

  averagePercentage() {
    this.data.avg_pct = Number(((this.arreglo.reduce((previousValue, currentValue) => previousValue + currentValue, 0) / this.data.size) * 100 / this.data.highest).toFixed(2));
  },

  get(numbers) {
    this.arreglo = numbers.split(' ').map(value => Number(value));
    this.setSize();
    this.percentageOddEvenAndGT1000();
    this.lowestAndHighest();
    this.averagePercentage();
    return this.data;
  }
}

function createList() {
  const input = document.getElementById('numbers');
  const data = arrayData.get(input.value);
  const list = document.getElementById('list');
  if (input.value) {
    list.replaceChildren();
    for (let key in data) {
      let elem = document.createElement('li');
      list.appendChild(elem);
      elem.innerHTML = `${key}: ${data[key]}`;
    } 
  } else {
    list.replaceChildren();
  }
  
}

function loadPageListeners() {
  const input = document.getElementById('numbers');
  input.addEventListener('input', debounce(createList, 1000));
}
document.addEventListener('DOMContentLoaded', loadPageListeners);