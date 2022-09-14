const input = document.querySelector('.login-input');
const button = document.querySelector('.btn-login');
const form = document.querySelector('.login-form');

const validaInput = ({ target }) =>{
  if (target.value.length >= 2) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', '');
  }
}

const salvaJogador = (event) => {
  event.preventDefault();

  localStorage.setItem('player', input.value);
  window.location = 'pages/game.html'
}

input.addEventListener('input', validaInput);
form.addEventListener('submit', salvaJogador);
