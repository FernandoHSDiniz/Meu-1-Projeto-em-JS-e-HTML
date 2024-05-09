let jogoAtivo = false;
let musicaIniciada = false;

function setup() {
  createCanvas(500, 400);
}

function draw() {
  if (!jogoAtivo) {
    background(0); // Tela preta
    exibeInstrucoes();
  } else {
    if (!musicaIniciada) {
      somDaTrilha.loop();
      musicaIniciada = true;
    }
    background(imagemDaEstrada);
    mostraAtor();
    mostraCarro();
    movimentaCarro();
    movimentaAtor();
    voltaPosicaoInicialDoCarro();
    verificaColisao();
    incluiPontos();
    marcaPonto();
  }
}

function exibeInstrucoes() {
  textSize(16);
  fill(255);
  textAlign(CENTER);
  text("Regra do Jogo .", width/2, height/2 - 150);
  text("Seu único objetivo é tentar chegar do outro lado.", width/2, height/2 - 100);
  text("Se for atingido pelo carros e a vaquinha zera os pontos", width/2, height/2 - 75);
  text("", width/2, height/2 + 20); // Linha em branco
  text("Controle:", width/2, height/2 - 40);
  text("- Seta para a esquerda (←) para mover o ator para a esquerda.", width/2, height/2 - 0);
  text("- Seta para a direita (→) para mover o ator para a direita.", width/2, height/2 + 30);
  text("- Seta para cima (↑) para mover o ator para cima.", width/2, height/2 + 60);
  text("- Seta para baixo (↓) para mover o ator para baixo.", width/2, height/2 + 90);
  text("", width/2, height/2 + 100); // Linha em branco
  text("Pressione 'R' para começar", width/2, height/2 + 140);
}

function keyPressed() {
  if (!jogoAtivo) {
    if (key === 'r' || key === 'R') {
      jogoAtivo = true;
      reiniciarJogo();
    }
  }
}
