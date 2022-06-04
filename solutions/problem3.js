import { body } from 'express-validator';

export default [
  body('password')
    .custom(pwd => {
      let lowercase = 0, uppercase = 0, matchingAdjacentLetters = false, numbers = 0, matchingAdjacentNumbers = false;
      let symbolsCount = 0, symbolNotUnique = false, adjacentSymbols = false, zero = 0, spaces = 0;    
      let allowedSymbolsCharCodes = [33, 35, 36, 37, 38, 42, 43, 45, 61, 63, 64, 94, 95];

      for (let i = 0; i < pwd.length; i++) {
        let charcode = pwd.charCodeAt(i);

        if (charcode >= 97 && charcode <= 122) lowercase++;

        if (charcode >= 65 && charcode <= 90) uppercase++;

        if (i !== 0 && (charcode >= 97 && charcode <= 122 || charcode >= 65 && charcode <= 90) && pwd[i] === pwd[i-1]) matchingAdjacentLetters = true;

        if (charcode >= 48 && charcode <= 57) numbers++;

        if (i !== 0 && charcode >= 48 && charcode <= 57 && pwd[i] === pwd[i-1]) matchingAdjacentNumbers = true;

        if (allowedSymbolsCharCodes.includes(charcode)) {
          symbolsCount++;
          if (i !== pwd.length - 1 && pwd.includes(String.fromCharCode(charcode), i + 1)) symbolNotUnique = true;
          if (i !== 0 && allowedSymbolsCharCodes.includes(pwd.charCodeAt(i - 1))) adjacentSymbols = true;
        }

        if (pwd[i] === '0') zero++;

        if (pwd[i] === ' ') spaces++;
      }

      // const errors = [];
      // if (pwd.length < 16) errors.push(new Error('Debe tener al menos 16 caracteres'));
      // if (!lowercase) errors.push(new Error('Debe tener letras minúsculas'));
      // if (!uppercase) errors.push(new Error('Debe tener letras mayúsculas'));
      // if (matchingAdjacentLetters) errors.push(new Error('No puede tener 2 letras iguales consecutivas'));
      // if (numbers < 4) errors.push(new Error('Debe contener al menos 4 números'));
      // if (matchingAdjacentNumbers) errors.push(new Error('No puede tener 2 números iguales consecutivos'));
      // if (symbolsCount < 2) errors.push(new Error('Debe tener al menos 2 caracteres especiales (!@#$%^&*-_+=?)'));
      // if (symbolNotUnique || adjacentSymbols) errors.push(new Error('Los símbolos no pueden repetirse en ninguna posición ni pueden estar juntos'));
      // if (zero) errors.push(new Error('No se puede usar el número 0'));
      // if (spaces) errors.push(new Error('No se puede colocar espacios'));
      // if (errors.length) throw errors;

      return pwd.length >= 16 && lowercase && uppercase && !matchingAdjacentLetters && numbers >= 4 && !matchingAdjacentNumbers
        && symbolsCount >= 2 && !symbolNotUnique && !adjacentSymbols && !zero && !spaces;
    }),

  //   .isStrongPassword({
  //     minLength: 16,
  //     minLowercase: 1,
  //     minUppercase: 1,
  //     minNumbers: 4,
  //     minSymbols: 2,
  //   })
]

function strongPasswordValidator(pwd) {
  let lowercase = 0, uppercase = 0, matchingAdjacentLetters = false, numbers = 0, matchingAdjacentNumbers = false;
  let symbolsCount = 0, symbolNotUnique = false, adjacentSymbols = false, zero = 0, spaces = 0;    
  let allowedSymbolsCharCodes = [33, 35, 36, 37, 38, 42, 43, 45, 61, 63, 64, 94, 95];

  for (let i = 0; i < pwd.length; i++) {
    let charcode = pwd.charCodeAt(i);

    if (charcode >= 97 && charcode <= 122) lowercase++;

    if (charcode >= 65 && charcode <= 90) uppercase++;

    if (i !== 0 && (charcode >= 97 && charcode <= 122 || charcode >= 65 && charcode <= 90) && pwd[i] === pwd[i-1]) matchingAdjacentLetters = true;

    if (charcode >= 48 && charcode <= 57) numbers++;

    if (i !== 0 && charcode >= 48 && charcode <= 57 && pwd[i] === pwd[i-1]) matchingAdjacentNumbers = true;

    if (allowedSymbolsCharCodes.includes(charcode)) {
      symbolsCount++;
      if (i !== pwd.length - 1 && pwd.includes(String.fromCharCode(charcode), i + 1)) symbolNotUnique = true;
      if (i !== 0 && allowedSymbolsCharCodes.includes(pwd.charCodeAt(i - 1))) adjacentSymbols = true;
    }

    if (pwd[i] === '0') zero++;

    if (pwd[i] === ' ') spaces++;
  }
  
  return pwd.length >= 16 && lowercase && uppercase && !matchingAdjacentLetters && numbers >= 4 && !matchingAdjacentNumbers
    && symbolsCount >= 2 && !symbolNotUnique && !adjacentSymbols && !zero && !spaces;
}

// console.log(strongPasswordValidator('@AguanteJavascript1234#'))
// node solutions/problem3.js
