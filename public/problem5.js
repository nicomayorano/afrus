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

function validator() {
  const pwd = document.getElementById('password').value;

  if (!pwd) {
    const lis = document.getElementsByClassName('list-elem');
    for (let elem of lis) {
      elem.style.color = 'black';
    }
    return;
  }

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
    if (charcode >= 0 )
    if (allowedSymbolsCharCodes.includes(charcode)) {
      symbolsCount++;
      if (i !== pwd.length - 1 && pwd.includes(String.fromCharCode(charcode), i + 1)) symbolNotUnique = true;
      if (i !== 0 && allowedSymbolsCharCodes.includes(pwd.charCodeAt(i - 1))) adjacentSymbols = true;
    }
    if (pwd[i] === '0') zero++;
    if (pwd[i] === ' ') spaces++;
  }
  
  pwd.length >= 16 ? document.getElementById('length').style.color = 'green' : document.getElementById('length').style.color = 'red';
  (lowercase && uppercase) ? document.getElementById('capitalization').style.color = 'green' : document.getElementById('capitalization').style.color = 'red';
  !matchingAdjacentLetters ? document.getElementById('adjacent-letters').style.color = 'green' : document.getElementById('adjacent-letters').style.color = 'red';
  numbers >= 4 ? document.getElementById('min-numbers').style.color = 'green' : document.getElementById('min-numbers').style.color = 'red';
  !matchingAdjacentNumbers ? document.getElementById('adjacent-numbers').style.color = 'green' : document.getElementById('adjacent-numbers').style.color = 'red';
  symbolsCount >= 2 ? document.getElementById('min-symbols').style.color = 'green' : document.getElementById('min-symbols').style.color = 'red';
  !symbolNotUnique && !adjacentSymbols ? document.getElementById('symbols-restraints').style.color = 'green' : document.getElementById('symbols-restraints').style.color = 'red';
  !zero ? document.getElementById('zero-restraint').style.color = 'green' : document.getElementById('zero-restraint').style.color = 'red';
  !spaces ? document.getElementById('spaces-restraint').style.color = 'green' : document.getElementById('spaces-restraint').style.color = 'red';
}


function loadPageListeners() {
  const input = document.getElementById('password');
  input.addEventListener('input', debounce(validator, 250));
}
document.addEventListener('DOMContentLoaded', loadPageListeners);