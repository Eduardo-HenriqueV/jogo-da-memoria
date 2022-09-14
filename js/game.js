const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');


const personagens = [
  'bart',
  'lisa',
  'homer',
  'marge',
  'maggie',
  'moe',
  'burns',
  'nelson',
  'duff',
  'krusty',
];

const createElement = (tag, className) =>{
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let primeiroCard = '';
let segundoCard = '';

const checarFimJogo = ()=>{
  const desabilitaCards = document.querySelectorAll('.desabilita-card');

  if(desabilitaCards.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}: seu tempo foi : ${timer.innerHTML} segundos`);
  }
}


const checarCards = () =>{
  const primeiroPersonagem = primeiroCard.getAttribute('data-personagem');
  const segundoPersonagem = segundoCard.getAttribute('data-personagem');

  if(primeiroPersonagem === segundoPersonagem) {
    primeiroCard.firstChild.classList.add('desabilita-card');
    segundoCard.firstChild.classList.add('desabilita-card');

    primeiroCard = '';
    segundoCard = '';

    checarFimJogo();

  } else {
    setTimeout(() =>{
      primeiroCard.classList.remove('revela-card');
      segundoCard.classList.remove('revela-card');

      primeiroCard = '';
      segundoCard = '';
    }, 500);

  }

}

const revelaCard = ({ target }) => {

  if(target.parentNode.className.includes('revela-card')) {
    return;
  }

  if(primeiroCard === '') {
    target.parentNode.classList.add('revela-card');
    primeiroCard = target.parentNode;
  } else if (segundoCard === '') {
    target.parentNode.classList.add('revela-card');
    segundoCard = target.parentNode;
  
    checarCards();
  }
}

const criaCard = (personagem) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../img/${personagem}.png')`

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revelaCard);
  card.setAttribute('data-personagem', personagem)

  return card;
}

const carregaJogo = () => {

  const duplicaPersonagem = [ ... personagens, ... personagens ];

  const cardsEmbaralhados = duplicaPersonagem.sort(() => Math.random() - 0.5)


  cardsEmbaralhados.forEach((personagem)=>{
    const card = criaCard(personagem);
    grid.appendChild(card);
  });
}

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = Number(timer.innerHTML);
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  carregaJogo();
}
