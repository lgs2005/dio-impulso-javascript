let botaoAtualizar = document.getElementById('atualizar-saldo')!;
let botaoLimpar = document.getElementById('limpar-saldo')!;
let campoSaldo = document.getElementById('campo-saldo')!;
let soma = document.getElementById('soma') as HTMLInputElement;

let saldoTotal = 0;
atualizarSaldo();

function atualizarSaldo() {
	campoSaldo.innerHTML = saldoTotal.toString();
}

function somarAoSaldo(soma: number) {
	saldoTotal += soma;
	atualizarSaldo();
}

function limparSaldo() {
	saldoTotal = 0;
	atualizarSaldo();
}

botaoAtualizar.addEventListener('click', function () {
    somarAoSaldo(parseInt(soma.value));
});

botaoLimpar.addEventListener('click', function () {
    limparSaldo();
});

/**
    <h4>Valor a ser adicionado: <input id="soma"> </h4>
    <button id="atualizar-saldo">Atualizar saldo</button>
    <button id="limpar-saldo">Limpar seu saldo</button>
    <h1>"Seu saldo é: " <span id="campo-saldo"></span></h1>
 */