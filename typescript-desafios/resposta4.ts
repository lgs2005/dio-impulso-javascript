// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction

let username = '';
let password = '';
let apikey = '';

type Filme = {
	poster_path?: string,
	adult: boolean,
	overview: string,
	release_date: string,
	genre_ids: number[],
	id: number,
	original_title: string,
	original_language: string,
	title: string,
	backdrop_path?: string,
	popularity: number,
	vote_count: number,
	video: boolean,
	vote_average: number,
};

type Lista = {
	created_by: string,
	description: string,
	favorite_count: number,
	id: string,
	items: Filme[],
	item_count: number,
	iso_639_1: string,
	name: string,
	poster_path?: string,
};

class MovieDBHttpClient {
	static sessionID?: string;

	static getBaseURL() {
		let base = new URL('https://api.themoviedb.org/3/');
		base.searchParams.append('api_key', apikey);

		if (this.sessionID) {
			base.searchParams.append('session_id', this.sessionID);
		}

		return base;
	}

	static getURLFor(path: string) {
		return new URL(path, this.getBaseURL());
	}

	static async send<T = any>(url: string | URL, method: 'GET' | 'POST', body?: any): Promise<T> {
		return new Promise((resolve, reject) => {
			let request = new XMLHttpRequest();
			let onRequestRejected = () => {
				reject({
					status: request.status,
					statusText: request.statusText,
				})
			};

			if (typeof url == "string") {
				url = this.getURLFor(url);
			}

			request.open(method, url, true);
			request.onerror = () => onRequestRejected();
			request.onload = () => {
				if (request.status >= 200 && request.status < 300) {
					resolve(JSON.parse(request.responseText));
				} else {
					onRequestRejected();
				}
					
			};
			
			if (body) {
				request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
				body = JSON.stringify(body);
			}
			
			request.send(body);
		});
	}

	static async login() {	
		let token = await this.send<string>('/authentication/token/new', 'GET');

		await this.send('/authentication/token/validate_with_login', 'POST', {
			username: username,
			password: password,
			request_token: token,
		});
	
		let sessionURL = new URL('/session/new', this.getBaseURL());
		sessionURL.searchParams.append('request_token', token);
		this.sessionID = await this.send(sessionURL, 'GET');
	}
	
	static async procurarFilmes(query: string) {
		let url = this.getURLFor('/search/movie');
		url.searchParams.append('query', query);
		return await this.send<{results: Filme[]}>(url, 'GET');
	}

	static async pegarFilme(id: string) {
		let url = this.getURLFor(`/movie/${id}`);
		url.searchParams.append('language', 'en-US');
		return this.send<Filme>(url, 'GET');
	}

	static async criarLista(nome: string, descricao: string) {
		return await this.send('/list', 'POST', {
			name: nome,
			description: descricao,
			language: 'pt-br',
		});
	}

	static async pegarLista(id: string) {
		return await this.send<Lista>(`/list/${id}`, 'GET');
	}

	static async adicionarFilmeNaLista(idFilme: string, idLista: string) {
		return await this.send(`/list/${idLista}/add_item`, 'POST', {
			media_id: idFilme,
		});
	}
}

const LOGIN_BUTTON = document.getElementById('login-button') as HTMLButtonElement;
const LOGIN_INPUT = document.getElementById('login') as HTMLInputElement;
const PASSWORD_INPUT = document.getElementById('senha') as HTMLInputElement;
const APIKEY_INPUT = document.getElementById('api-key') as HTMLInputElement;

const SEARCH_BUTTON = document.getElementById('search-button') as HTMLButtonElement;
const SEARCH_INPUT = document.getElementById('search') as HTMLInputElement;
const SEARCH_CONTAINER = document.getElementById('search-container')!;


function validateLoginButton() {
	if (password != '' && username != '' && apikey != '') {
		LOGIN_BUTTON.disabled = false;
	} else {
		LOGIN_BUTTON.disabled = true;
	}
}

LOGIN_INPUT.addEventListener('change', function() {
	username = this.value;
	validateLoginButton();
});

PASSWORD_INPUT.addEventListener('change', function() {
	password = this.value;
	validateLoginButton();
})

APIKEY_INPUT.addEventListener('change', function() {
	apikey = this.value;
	validateLoginButton();
})

LOGIN_BUTTON.addEventListener('click', () => MovieDBHttpClient.login())

SEARCH_BUTTON.addEventListener('click', async function() {
	let listaAntiga = document.getElementById('lista');
	if (listaAntiga) {
		listaAntiga.outerHTML = '';
	}

	let query = SEARCH_INPUT.value;
	let filmes = await MovieDBHttpClient.procurarFilmes(query);
	
	let lista = document.createElement('ul');
	lista.id = 'lista';

	for (let filme of filmes.results) {
		let item = document.createElement('li');
		item.appendChild(document.createTextNode(filme.original_title));
		lista.appendChild(item);
	}

	console.log(filmes);
	SEARCH_CONTAINER.appendChild(lista);
})

/*
<div style="display: flex;">
  <div style="display: flex; width: 300px; height: 100px; justify-content: space-between; flex-direction: column;">
      <input id="login" placeholder="Login" onchange="preencherLogin(event)">
      <input id="senha" placeholder="Senha" type="password" onchange="preencherSenha(event)">
      <input id="api-key" placeholder="Api Key" onchange="preencherApi()">
      <button id="login-button" disabled>Login</button>
  </div>
  <div id="search-container" style="margin-left: 20px">
      <input id="search" placeholder="Escreva...">
      <button id="search-button">Pesquisar Filme</button>
  </div>
</div>
*/