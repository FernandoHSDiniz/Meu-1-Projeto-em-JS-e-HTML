// Declaração das variáveis
let xAtor1 = 225;
let yAtor1 = 366;
let xAtor2 = 225; // Posição inicial do segundo ator
let yAtor2 = 3;   // Altura do canvas - Posição inicial do segundo ator
let colisaoCarro = false;
let colisaoAtor = false;
let meusPontos = 0;
let tentativas = 0; // Contador de tentativas
let colisoes = 0; // Contador de colisões

function mostraAtor() {
  image(imagemDoAtor, xAtor1, yAtor1, 30, 30); // Mostra o primeiro ator
  image(imagemDoAtor, xAtor2, yAtor2, 30, 30); // Mostra o segundo ator
}

function movimentaAtor() {
  // Movimentação do primeiro ator (controlado pelo jogador)
  if (keyIsDown(UP_ARROW)) {
    yAtor1 -= 3;
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (podeSeMover(yAtor1)) {
      yAtor1 += 3;
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    if (xAtor1 > 0) {
      xAtor1 -= 3;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    if (xAtor1 < width - 30) {
      xAtor1 += 3;
    }
  }

  // Movimentação do segundo ator (controlado pelo programa)
  if (xAtor2 < xAtor1) {
    xAtor2 += 1;
  } else if (xAtor2 > xAtor1) {
    xAtor2 -= 1;
  }

  // Verifica colisão entre o primeiro ator e os carros
  colisaoCarro = false;
  for (let i = 0; i < imagemCarros.length; i++) {
    colisaoCarro = colisaoCarro || collideRectCircle(xCarros[i], yCarros[i], comprimentoCarro, alturaCarro, xAtor1, yAtor1, 15);
  }

  // Verifica colisão entre o primeiro ator e o segundo ator
  colisaoAtor = collideRectRect(xAtor1, yAtor1, 30, 30, xAtor2, yAtor2, 30, 30);

  if (colisaoCarro || colisaoAtor || yAtor1 <= 0) {
    // Incrementa o contador de tentativas
    tentativas++;
    // Se houver colisão entre o primeiro ator e os carros, entre o primeiro ator e o segundo ator ou se o primeiro ator colidir com a borda de cima
    // Incrementa o contador de colisões
    if (colisaoCarro || colisaoAtor) {
      colisoes++;
    }
    // Zera os pontos e volta o ator para a posição inicial
    meusPontos = 0;
    somDaColisao.play();
    voltaAtorParaPosicaoInicial();
  }
}

function verificaColisao() {
  // Não faz nada aqui
}

function voltaAtorParaPosicaoInicial() {
  yAtor1 = 366;
  xAtor2 = 225; // Posição inicial do segundo ator
  yAtor2 = 3;   // Altura do canvas - Posição inicial do segundo ator
}

function incluiPontos() {
  textAlign(CENTER);
  textSize(25);
  fill(color(255, 240, 60));
  text("Pontos: " + meusPontos, width / 9, 27);
  fill(color(255, 50, 50)); // Vermelho
  text("Tentativas: " + tentativas, width / 7, 390); // Mostra o número de tentativas
}

function marcaPonto() {
  if (yAtor1 < 15) {
    meusPontos += 1;
    somDoPonto.play();
    voltaAtorParaPosicaoInicial();
  }
}

function podeSeMover(y) {
  return y < 366;
}
