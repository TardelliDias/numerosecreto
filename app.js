//JOGO DO NÚMERO SECRETO

//let - palavra reservada para declaração de variável
//método querySelector - usado para selecionar a tags HTML
//método innerHTML - é um método que faz de fato a alteração, ou seja, permite modificar o conteúdo do elemento
//console.log é um método para checar o comportamento do código no navegador
//.value é um método para pegar apenas o valor que o usuário digitará na tag input do HTML e armazenar na variável chute
//método getElementById - busca o elemento HTML pelo id
//método setAttribute - aponta para o atributo pelo nome
//método removeAttribute - remove o atributo do elemento referenciado
//Math.random - gera um número aleatório entre 0(inclusivo) e 1 (exclusivo)
//parseInt - pega a parte inteira do número decimal
//length - método para obter o tamanho de uma lista
//método push - insere ítens na lista (último elemento)
//método pop - remove elementos de uma lista (último elemento)
// no código HTML tem o <script src="https://code.responsivevoice.org/responsivevoice.js"></script> ele nos permite adicionar fala ao texto. Para isso usaremos a função responsiveVoice com o método speak e passaremos como parâmetros o (texto que deverá ser lido, a voz e o idioma em que será falado, e a velocidade da fala)
//como alternativa para a api responsive voice podemos utilizar outra biblioteca,  Web Speech API, com o código abaixo:
// if ('speechSynthesis' in window) {
//        let utterance = new SpeechSynthesisUtterance(texto);
//      utterance.lang = 'pt-BR'; 
//        utterance.rate = 1.2; 
//        window.speechSynthesis.speak(utterance); 
//    } else {
//        console.log("Web Speech API não suportada neste navegador.");
//    }

let listaDeNumerosSorteados = [];
let numero = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numero}`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p',`O número secreto é menor que ${chute}`);
        } else {
            exibirTextoNaTela('p',`O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numero + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numero) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}





