// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

//const { remove } = require("cypress/types/lodash");

//const { fetchItem } = require("./helpers/fetchItem");

// const { fetchProducts } = require("./helpers/fetchProducts");

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
 // li.addEventListener('click', cartItemClickListener);
  return li;
};

const carregaProdutos =  async () => {
  const objetoProdutos = await fetchProducts('computador');
  objetoProdutos.results.forEach((elemento) => {
    const pai = document.querySelector('.items')
    const id = elemento.id;
    const title = elemento.title
    const thumbnail = elemento.thumbnail;
    const produto = createProductItemElement({id,title, thumbnail});
    pai.appendChild(produto);
  });
}

const adiconarCarrinho = async (event) => {
  const sectionPai = event.target.parentElement
  const ids = sectionPai.firstChild.innerText;
  const produtoId =  await fetchItem(ids);
  const id = produtoId.id;
  const title = produtoId.title;
  const price = produtoId.price
  const produto =  createCartItemElement({id, title, price});
  const pai = document.querySelector('.cart__items');
  pai.appendChild(produto);
  const items = document.getElementsByClassName('cart__item');
  const removerCarrinho = (evento) => {
    evento.target.remove();
  };
  for(let index = 0; index < items.length; index +=1){
    items[index].addEventListener('click', removerCarrinho);
  }
}




window.onload =  async () => {
  await carregaProdutos();
  const botaoes = document.getElementsByClassName('item__add');
 for(let indice = 0; indice < botaoes.length; indice  +=1){
  botaoes[indice].addEventListener('click', adiconarCarrinho);
 };
 
};
