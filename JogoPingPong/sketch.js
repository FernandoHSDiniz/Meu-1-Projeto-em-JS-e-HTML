// Variáveis da bolinha

let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

// Velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 7;
let raqueteAltura = 75;

// Variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let raqueteOponenteComprimento = 7;
let raqueteOponenteAltura = 75;

// Colisão
let colidiu = false;

// Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// Sons do jogo
let raquetada;
let ponto;
let trilha;

// Oponente errar
let chanceDeErrar = 0;

// Variável para controlar se o jogo está ativo
let jogoAtivo = false;

// Variável para controlar se as instruções devem ser exibidas
let exibirInstrucoes = true;



function bolinhaNaoFicaPresa() {
    if (xBolinha - raio < 0) {
        xBolinha = 23;
    }
}

function keyPressed() {
    if (!jogoAtivo) {
        if (key === 'r' || key === 'R') {  
            reiniciarJogo();
        }
    }
}

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(0);
    
    if (exibirInstrucoes) {
        exibeInstrucoes();
    } else {
        jogo();
    }
}

function jogo() {
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    incluiPlacar();
    marcaPonto();
    bolinhaNaoFicaPresa();
    fimjogo();
   
    // Linha centro
    stroke(255); 
    line(width / 2, 0, width / 2, height);
}

function exibeInstrucoes() {
    textSize(16);
    fill(255);
    textAlign(CENTER);
    text("Regra do Jogo Ping Pong.", width/2, height/2 - 150);
    text("Seu único objetivo é tentar fazer a bola passar pela raquete do seu oponente.", width/2, height/2 - 100);
    text("O primeiro jogador a marcar 10 pontos ganha o jogo.", width/2, height/2- 75);
    text("", width/2, height/2 + 20); // Linha em branco
    text("Controle:", width/2, height/2 -40);
    text("- Seta para cima (↑) para mover a raquete para cima.", width/2, height/2 - 0);
    text("- Seta para baixo (↓) para mover a raquete para baixo.", width/2, height/2 +30);
    text("", width/2, height/2 + 100); // Linha em branco
    text("Pressione 'R' para começar", width/2, height/2 + 120);
}


function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
    }
    if (yBolinha + raio > height || yBolinha - raio < 0) {
        velocidadeYBolinha *= -1;
    }
}

function mostraRaquete(x, y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
      
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
    if (yRaquete > height - raqueteAltura) {
        yRaquete = height - raqueteAltura;   
    } else if (yRaquete < 0) {
        yRaquete = 0;
    }
}

function movimentaRaqueteOponente() {
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteOponenteComprimento / 2 - chanceDeErrar;
  
    yRaqueteOponente += velocidadeYOponente;

    if (pontosDoOponente >= meusPontos) {
        chanceDeErrar = 100;
    }
    if (pontosDoOponente < meusPontos && chanceDeErrar > 50) {
        chanceDeErrar -= 3;
    }

    if (yRaqueteOponente > height - raqueteOponenteAltura) {
        yRaqueteOponente = height - raqueteOponenteAltura;   
    } else if (yRaqueteOponente < 0) {
        yRaqueteOponente = 0;
    }

    if (xBolinha - raio > width) {
        xBolinha = width - raio;
    }
}

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(20);
    fill(color(255, 140, 0));
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    fill(255);
    text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
        ponto.play();
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
        ponto.play();
    }
}

function fimjogo() {
    if (meusPontos >= 10) {
        textSize(16);
        fill(255);
        
        textAlign(CENTER);
        text("GANHOU", width/2, height/2 - 80);
        text("", width/2, height/2 + 100); // Linha em branco
        text("Pressione 'R' para começar", width/2, height/2 + 0);
        jogoAtivo = false;
        noLoop();
        trilha.stop(); // Parar música
    } else if (pontosDoOponente >= 10) {
        textSize(16);
        fill(255);
        textAlign(CENTER);
        text("PERDEU", width/2, height/2 + 0);
        text("Pressione 'R' para começar", width/2, height/2 + 30);
        jogoAtivo = false; 
        noLoop(); 
        trilha.stop(); // Parar música
    }
}

function reiniciarJogo() {
    jogoAtivo = true; 
    loop(); 
    meusPontos = 0; 
    pontosDoOponente = 0; 
    xBolinha = 300; 
    yBolinha = 200; 
    velocidadeXBolinha = 6; 
    velocidadeYBolinha = 6; 
    yRaquete = 150; 
    yRaqueteOponente = 150; 
    chanceDeErrar = 0; 
    exibirInstrucoes = false; // Desativar instruções ao reiniciar o jogo
    
    // Verifica se o jogo está prestes a começar para iniciar a música
    if (!trilha.isPlaying()) {
        trilha.play(); // Iniciar música
    }
}