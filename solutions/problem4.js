// Dado un arreglo de números cualesquiera sacar la siguiente información:

// Cantidad de elementos del arreglo.
// Porcentaje de números pares e impares.
// Porcentaje de números mayores a 1000.
// Cuál es el mayor y menor valor.
// Asuma los siguientes indicadores: Tome en cuenta que el mayor número representa el 100%, indique cual es el porcentaje del número mínimo y el porcentaje del promedio de todos los números.

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
    this.data.odd_pct = odd * 100 / this.data.size;
    this.data.even_pct = even * 100 / this.data.size;
    this.data.gt1000_pct = gt1000 * 100 / this.data.size;
  },

  lowestAndHighest() {
    this.data.lowest = Math.min(...this.arreglo);
    this.data.highest = Math.max(...this.arreglo);
    this.data.lowest_pct = this.data.lowest * 100 / this.data.highest;
  },

  averagePercentage() {
    this.data.avg_pct = (this.arreglo.reduce((previousValue, currentValue) => previousValue + currentValue, 0) / this.data.size) * 100 / this.data.highest;
  },

  get(arr) {
    this.arreglo = arr.map(value => Number(value));
    this.setSize();
    this.percentageOddEvenAndGT1000();
    this.lowestAndHighest();
    this.averagePercentage();
    return this.data;
  }
}
