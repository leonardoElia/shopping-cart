// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const saveCartItems = require("./helpers/saveCartItems");

// const { remove } = require("cypress/types/lodash");

// const { fetchItem } = require("./helpers/fetchItem");

// const { fetchProducts } = require("./helpers/fetchProducts");

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const olDoCarrinho = document.querySelector('.cart__items');

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
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

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

const carregaProdutos = async () => {
  const objetoProdutos = await fetchProducts('computador');
  objetoProdutos.results.forEach((elemento) => {
    const pai = document.querySelector('.items');
    const { id, title, thumbnail } = elemento;
    const produto = createProductItemElement({ id, title, thumbnail });
    pai.appendChild(produto);
  });
};
const controleDoCarrinho = async (event) => {
  const sectionPai = event.target.parentElement;
  const ids = sectionPai.firstChild.innerText;
  const produtoId = await fetchItem(ids);
  const { id, title, price } = produtoId;
  const produto = createCartItemElement({ id, title, price });
  olDoCarrinho.appendChild(produto); // mandando o produto para o carrinho
  saveCartItems(olDoCarrinho.innerHTML); // salvando o local storage
  const items = document.getElementsByClassName('cart__item');
  const removerCarrinho = (evento) => {
    evento.target.remove();
    localStorage.clear();
  };
  for (let index = 0; index < items.length; index += 1) {
    items[index].addEventListener('click', removerCarrinho);
  }
};
const limparCarrinho = () => {
   olDoCarrinho.innerText = '';
   localStorage.clear();
};

const botaoLimpar = document.querySelector('.empty-cart');
botaoLimpar.addEventListener('click', limparCarrinho);

const carregaLocalStorage = () => {
  const itemLocalStorage = getSavedCartItems('cartItems');
  olDoCarrinho.innerHTML = itemLocalStorage;
}

const removeLocalStorage = (eve) => {
  eve.target.remove();
  const texto = localStorage.getItem('cartItems');
  const textoLi = eve.target.innerHTML;
  const novoValor = texto.replace(`<li class="cart__item">${textoLi}</li>`, '');
  localStorage.clear();
  localStorage.setItem('cartItems', novoValor);
}

window.onload = async () => {
  await carregaProdutos();
  carregaLocalStorage();
  const liLocalStorage = document.getElementsByTagName('li');
  for (let contadora = 0; contadora < liLocalStorage.length; contadora += 1) {
    liLocalStorage[contadora].addEventListener('click', removeLocalStorage);
  }
const botaoes = document.getElementsByClassName('item__add');
 for (let indice = 0; indice < botaoes.length; indice += 1) {
  botaoes[indice].addEventListener('click', controleDoCarrinho);
 }
};
