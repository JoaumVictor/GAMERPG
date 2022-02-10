/* eslint-disable no-alert */
/* eslint-disable import/extensions */
import HTML from './src/HTML/HtmlDados.js';
import PERSONAGENS from './src/Personagens/Personagens.js';

// DADO
const dado = (number) => Math.floor((Math.random() * number) + 1);

// ARQUIVOS DO GAME
let player1;
let player2;

// LOGICA DO GAME
const selecionaGif = () => {
  if (player1.nome === 'guerreiro') {
    HTML.gif1img.src = PERSONAGENS.guerreiroBase.image;
    HTML.gif2img.src = PERSONAGENS.magoBase.image;
    return
  }
    HTML.gif2img.src = PERSONAGENS.guerreiroBase.image;
    HTML.gif1img.src = PERSONAGENS.magoBase.image;
};

// LINHA DO TEMPO
// ATO 0
// ATO 1 - FRASE DE BOAS VINDAS
const comecar = () => {
  HTML.fraseBeta.innerHTML = '';
  HTML.boxStart.style.display = 'none';
  HTML.boxEscolhaDeDuelista.style.display = 'flex';
  HTML.fraseDaDeusa.innerHTML = 'Para começar, escolha seu duelista!';
};

const selecionaPersonagem = (personagem, inimigo) => {
  HTML.fraseDaDeusa.innerHTML = `Você escolheu o ${PERSONAGENS[personagem].dados.nome}! ${PERSONAGENS[personagem].message}`;
  HTML.boxEscolhaDeDuelista.style.display = 'none';
  player1 = PERSONAGENS[personagem].dados;
  player2 = PERSONAGENS[inimigo].dados;
  HTML.guerreiroSelect.style.display = 'flex';
};

// ATO 2 - ESCOLHE GUERREIRO
const selecionaGuerreiro = () => {
  selecionaPersonagem('guerreiroBase', 'magoBase', PERSONAGENS)
};

// ATO 2 - ESCOLHE MAGO
const selecionaMago = () => {
  selecionaPersonagem('magoBase', 'guerreiroBase')
};

// ATO 3 - implementa arena
const mudaDisplay = () => {
  HTML.guerreiroSelect.style.display = 'none';
  HTML.magoSelect.style.display = 'none';
  HTML.fraseDaDeusa.innerHTML = '';
  HTML.imgDaDeusa.style.width = '200px';
  HTML.main.style.justifyContent = 'flex-start';
  selecionaGif();
  atualizarFaseDeCombate();
  HTML.arena.style.display = 'flex';
};

// INICIA HUB DE COMBATE
const atualizarFaseDeCombate = () => {
  // player1
  HTML.vida1.innerText = player1.vida;
  HTML.constituicao1.innerText = player1.constituicao;
  HTML.mana1.innerText = player1.energia;
  // player2
  HTML.vida2.innerText = player2.vida;
  HTML.constituicao2.innerText = player2.constituicao;
  HTML.mana2.innerText = player2.energia;
};

// FUNÇÕES DE COMBATE
const calculaDano1 = () => dado(player1.dadoDeAtaque)

const tentativaDeAcerto1 = () => {
  const resultado = dado(20);
  const resistenciaDoOponente = player2.constituicao;
  let danoCalculado = 0;
  if (resultado < resistenciaDoOponente) alert(`Você tirou ${resultado}, e a constituição do oponente é ${resistenciaDoOponente}, você errou!`);
  danoCalculado = calculaDano1() + player1.forca;
  if (resultado === 20) { danoCalculado *= 2 }
  player2.vida -= danoCalculado;
  atualizarFaseDeCombate();
  if (player2.vida <= 0) {
    player2.vida = 0;
    atualizarFaseDeCombate();
    return alert('Você Venceu!');
  }
  return alert(`Você tirou ${resultado}, e seu ataque deu ${danoCalculado} de dano!`);
};

// CRIAR BOTOES SEMPRE DEPOIS DO CÓDIGO
HTML.botaoGuerreiro.addEventListener('click', selecionaGuerreiro);
HTML.botaoMago.addEventListener('click', selecionaMago);
HTML.botaoStart.addEventListener('click', comecar);
HTML.continueGuerreiro.addEventListener('click', mudaDisplay);
HTML.continueMago.addEventListener('click', mudaDisplay);
HTML.ataqueBasico.addEventListener('click', tentativaDeAcerto1);
