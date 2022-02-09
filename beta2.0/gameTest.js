  
  // arquivos importados
  let spriteDoGuerreiro = "https://i.pinimg.com/originals/30/d4/9b/30d49b65ee7bf655a4bfbfa957d02d68.gif";
  let spriteDoMago = "https://i.pinimg.com/originals/b6/40/30/b64030bf5b203da3e619dedfa0180f33.gif";
  let spriteDaDeusa = 'https://c.tenor.com/T5Z2YpZMti0AAAAC/libra-pixels.gif';

  // DADOS
  const d6 = () => {
    const rolagem = Math.floor(Math.random()*6) + 1;
    return rolagem;
   };

  const d8 = () => {
    const rolagem = Math.floor(Math.random()*8) + 1;
    return rolagem;
   };
    
  const d10 = () => {
    const rolagem = Math.floor(Math.random()*10) + 1;
    return rolagem;
  };
    
  const d20 = () => {
    const rolagem = Math.floor(Math.random()*20) + 1;
    return rolagem;
  };

  //ARQUIVOS DO GAME
  const magoBase = {
    nome: 'mago',
    vida: 22,
    constituicao: 10,
    energia: 3,
    dadoDeAtaque: 'd8',
    forca: 5,
  };
  const guerreiroBase = {
    nome: 'guerreiro',
    vida: 28,
    constituicao: 12,
    energia: 3,
    dadoDeAtaque: 'd6',
    forca: 3,
  };
  let player1;
  let player2;

  //LOGICA DO GAME
  const selecionaGif = () => {
    if (player1.nome === 'guerreiro') {
      gif1img.src = spriteDoGuerreiro;
      gif2img.src = spriteDoMago;
    }
    if (player1.nome === 'mago') {
      gif2img.src = spriteDoGuerreiro;
      gif1img.src = spriteDoMago;
    }
  };
  
// CAPTURA ITENS DO HTML
  const imgDaDeusa = document.getElementsByClassName('sprite-deusa')[0];
  imgDaDeusa.src = spriteDaDeusa;

  const main = document.getElementsByClassName('main')[0];
  const arena = document.getElementsByClassName('arena')[0];

  const fraseBeta = document.getElementsByClassName('frase-beta')[0];
  const fraseDaDeusa = document.getElementsByClassName('frase-da-deusa')[0];

  const botaoStart = document.getElementsByClassName('botao-start')[0];
  const boxStart = document.getElementsByClassName('start-content')[0];

  const botaoGuerreiro = document.getElementsByClassName('btn-guerreiro')[0];
  const botaoMago = document.getElementsByClassName('btn-mago')[0];
  const boxEscolhaDeDuelista = document.getElementsByClassName('escolha-de-duelista')[0];

  const guerreiroSelect = document.getElementsByClassName('guerreiro-select')[0];
  const magoSelect = document.getElementsByClassName('mago-select')[0];

  const continueGuerreiro = document.getElementsByClassName('continue-guerreiro')[0]; 
  const continueMago = document.getElementsByClassName('continue-mago')[0];

  const gif1img = document.getElementsByClassName('gif1-img')[0];
  const gif2img = document.getElementsByClassName('gif2-img')[0];

  const vida1 = document.getElementsByClassName('vd1')[0];
  const constituicao1 = document.getElementsByClassName('cnt1')[0];
  const mana1 = document.getElementsByClassName('mn1')[0];

  const vida2 = document.getElementsByClassName('vd2')[0];
  const constituicao2 = document.getElementsByClassName('cnt2')[0];
  const mana2 = document.getElementsByClassName('mn2')[0];

// LINHA DO TEMPO
// ATO 0
// ATO 1 - FRASE DE BOAS VINDAS
  const comecar = () => {
    fraseBeta.innerHTML = '';
    boxStart.style.display = 'none';
    boxEscolhaDeDuelista.style.display = 'flex';
    fraseDaDeusa.innerHTML = 'Para começar, escolha seu duelista!';
  };

// ATO 2 - ESCOLHE GUERREIRO
  const selecionaGuerreiro = () => {
    fraseDaDeusa.innerHTML = "Você escolheu o Guerreiro! Um duelista que usará sua força e constituição para vencer a batalha!";
    boxEscolhaDeDuelista.style.display = 'none';
    player1 = Object.assign({}, guerreiroBase);
    player2 = Object.assign({}, magoBase);
    guerreiroSelect.style.display = 'flex';
  };

// ATO 2 - ESCOLHE MAGO
  const selecionaMago = () => {
    fraseDaDeusa.innerHTML = "Você escolheu o Mago! Um duelista que usará sua inteligência e sabedoria para vencer a batalha!";
    boxEscolhaDeDuelista.style.display = 'none';
    player1 = Object.assign({}, magoBase);
    player2 = Object.assign({}, guerreiroBase);
    magoSelect.style.display = 'flex';
  };

//ATO 3 - implementa arena
  const mudaDisplay = () => {
    guerreiroSelect.style.display = 'none';
    magoSelect.style.display = 'none';
    fraseDaDeusa.innerHTML = '';
    imgDaDeusa.style.width = '200px';
    main.style.justifyContent = 'flex-start';
    selecionaGif();
    atualizarFaseDeCombate();
    arena.style.display = 'flex'
};;

// CRIAR BOTOES SEMPRE DEPOIS DO CÓDIGO
  botaoGuerreiro.addEventListener("click", selecionaGuerreiro);
  botaoMago.addEventListener("click", selecionaMago);
  botaoStart.addEventListener("click", comecar);
  continueGuerreiro.addEventListener("click", mudaDisplay);
  continueMago.addEventListener("click", mudaDisplay);

  // INICIA HUB DE COMBATE

  const atualizarFaseDeCombate = () => {
    // player1
    // player2
    vida1.innerText = player1.vida;
    constituicao1.innerText = player1.constituicao;
    mana1.innerText = player1.energia;

    vida2.innerText = player2.vida;
    constituicao2.innerText = player2.constituicao;
    mana2.innerText = player2.energia;
  };

  // CAPTURA BOTÕES
  const ataqueBasico = document.getElementsByClassName('btn-ataque')[0];
  const habilidadeBasica = document.getElementsByClassName('btn-habilidade')[0];

  // FUNÇÕES DE COMBATE

  const calculaDano1 = () => {
    if (player1.dadoDeAtaque === 'd6') {
      let dano = d6();
      return dano;
    }
    if (player1.dadoDeAtaque === 'd8') {
      let dano = d8();
      return dano;
    }
  };

  const checagemDeVida = () => {
    if (vida2.innerText <= 0) {
      return 0;
    }
  };

  let contador = 0;

  const tentativaDeAcerto1 = () => {
    let danoTotal;
    contador += 1;
    // console.log(contador);
    const resultado = d20();
    const resistenciaDoOponente = player2.constituicao;
    let danoCalculado = 0;

    if (resultado >= resistenciaDoOponente) {
      danoCalculado = calculaDano1() + player1.forca;
      if (resultado === 20) {
        player2.vida += -(danoCalculado * 2);
        danoTotal = danoCalculado * 2;
      } else {
        player2.vida += (-danoCalculado);
        danoTotal = danoCalculado
      };
      atualizarFaseDeCombate();
      if (checagemDeVida() === 0) {
        player2.vida = 0;
        atualizarFaseDeCombate();
        return alert(`Você Venceu!`);
      }
      return alert(`Você tirou ${resultado}, e seu ataque deu ${danoTotal} de dano!`);
    }
      alert(`Você tirou ${resultado}, e a constituição do oponente é ${resistenciaDoOponente}, você errou!`);
    };

   ataqueBasico.addEventListener('click', tentativaDeAcerto1);
