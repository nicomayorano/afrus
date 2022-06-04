function validator() {
  const lis = document.getElementsByClassName('list-elem');
  if (input.value){
    
    




    
  } else {
    for (let elem of lis) {
      elem.style.color = 'black';
    }
  }
}




function loadPageListeners() {
  const input = document.getElementById('password');
  input.addEventListener('input', validator);
}
document.addEventListener('DOMContentLoaded', loadPageListeners);