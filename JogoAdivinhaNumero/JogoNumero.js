let maxTentativas = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let vozAtivada = true; // Definindo a voz como ativada por padrão

console.log(numeroSecreto);

function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 1000) + 1;
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    let opcaoVoz = document.getElementById('opcao-voz').value;

    if (opcaoVoz === 'ativado') {
        responsiveVoice.speak(texto.replace(/(<([^>]+)>)/gi, ''), 'Brazilian Portuguese Female', { rate: 1.2 });
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 1000.<p> <span class="tentativa"> Tentativas: 10</span>');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    // Converte o chute para um número inteiro
    chute = parseInt(chute);

    // Verifica se o chute não é um número ou é um número fora do intervalo permitido
    if (isNaN(chute) || chute < 1 || chute > 1000) {
        exibirTextoNaTela('p', 'Por favor, insira um número válido!<p> Entre 1 e 1000.');
        return; // Retorna para evitar que o código continue executando
    }

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto <span class="tentativa"> ${numeroSecreto}. <p>Com apenas  ${tentativas} ${palavraTentativa}! Parabéns.`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        let tentativasRestantes = maxTentativas - tentativas + 0;
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que <span class="chute"> ${chute}!<p><span class="tentativa"> Tentativas: ${tentativasRestantes}`);
        } else {
            exibirTextoNaTela('p', `O número secreto é maior que <span class="chute"> ${chute}!<p><span class="tentativa"> Tentativas: ${tentativasRestantes}`);
        }

        tentativas++;

        if (tentativas > maxTentativas) {
            exibirTextoNaTela('p', `Você excedeu o número máximo de tentativas.<p><span class="tentativa"> O número Secreto era: ${numeroSecreto}`);
            document.getElementById('reiniciar').removeAttribute('disabled');
        }
    }

    limparCampo();
}

function limparCampo() {
    let campo = document.querySelector('input');
    campo.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

// Função para ativar ou desativar a voz
function toggleVoz() {
    vozAtivada = !vozAtivada; // Inverte o estado da variável vozAtivada
    let opcaoVoz = document.getElementById('opcao-voz').value;
    if (vozAtivada && opcaoVoz === 'ativado') {
        responsiveVoice.resume();
    } else {
        responsiveVoice.pause();
    }
}
