var timerId = null; //variavel que armazena a chamada da funcao timeOut

function iniciaJogo(){

//Buscando o valor da dificuldade que foi passado da pagina anterior pela url
// usamos o serach no final para pegar apenas o que vem depois do ? da url
	var url = window.location.search;

//Substituindo o "?" por nada, uso do metodo replace
	var nivel_jogo = url.replace('?','');

	var tempo_segundos = 0;


	if (nivel_jogo == 'facil') {

		tempo_segundos = 120;
	}
	if (nivel_jogo == 'normal') {

		tempo_segundos = 90;
	}

	if (nivel_jogo == 'dificil') {

		tempo_segundos = 60;
	}	
	//escrevendo um texto(neste caso a variavel tempo_segundo) em uma tag com o comando inner.HTML
	document.getElementById('tempo').innerHTML = tempo_segundos;

	//quantidade de baloes na tela

	var qtd_baloes = 60;

	criar_baloes(qtd_baloes);

	//imprimindo a qtd de baloes inteiros no menu a esquerda
	document.getElementById('baloes-inteiros').innerHTML = qtd_baloes;
	document.getElementById('baloes-estourados').innerHTML = 0;

	contagem_regressiva(tempo_segundos + 1);
}

function contagem_regressiva(segundos){

	segundos = segundos -1;

	if (segundos == - 1) {
		clearTimeout(timerId); //para a chamada da funcao do setTimeout
		alert('O tempo acabou!!! \n' + 'Você estourou: ' +  document.getElementById('baloes-estourados').innerHTML + ' Baloes');
		//voltando para a tela inicial
		window.location.replace("file:index.html");
		return false
	}

	document.getElementById('tempo').innerHTML = segundos;

	timerId = setTimeout("contagem_regressiva("+segundos+")", 1000);

}

function criar_baloes(qtd_baloes){

	for (var i = 1; i <= qtd_baloes; i++){

		// criando elemento img
		var balao = document.createElement('img');
		//colocando atributo na tag que acabamos de criar
		balao.src='imagens/balao_azul_pequeno.png';
		//mexendo no estilo do elemento no ato que ele esta sendo criado
		balao.style.margin = '10px';
		//dando um id para o elemento balao que esta sendo criado
		balao.id = 'balao' + i;
		//chamando a funcao de estouro caso o elemento balao seja clicado
		balao.onclick = function(){ estourar(this); };

		//adicionando elemento na div como se fosse um filho da tag div

		document.getElementById('cenario').appendChild(balao);
	}
}

function estourar(e){

	//alterando a imagem do objeto que esta sendo passado como parametro
	e.src='imagens/balao_azul_pequeno_estourado.png';

	//alterando o atributo do balao, para ele nao poder ser clicado varias vezes
	//de outra forma, estamos removendo o evento 'onclick' do balao que foi clicado
	e.setAttribute('onclick',"");

	pontuacao();
}

function pontuacao(){

	var baloes_inteiros = parseInt(document.getElementById('baloes-inteiros').innerHTML);
	var baloes_estourados = parseInt(document.getElementById('baloes-estourados').innerHTML);

	baloes_inteiros = baloes_inteiros - 1;
	baloes_estourados = baloes_estourados + 1;

	document.getElementById('baloes-estourados').innerHTML = baloes_estourados;
	document.getElementById('baloes-inteiros').innerHTML = baloes_inteiros;

	if (baloes_inteiros ==0) {

		alert('Parabens, voce ganhou!!!');
		//Congela o cronometro, para a chamada da função de rodar o relogio
		clearTimeout(timerId);
	}

}