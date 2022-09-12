require('../mocks/fetchSimulator');
// const { expect } = require('chai');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Testando se o tipo de fetchProducts é uma função', () => {
   expect(typeof fetchProducts).toEqual('function');
  });

  it('Testando se a url está correta ao passar o parametro computador',  async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Testando o retorno da função com o parametro computador', async () => {
   await expect(fetchProducts('computador')).resolves.toEqual(computadorSearch);
  });

  it('Testando se chamar a função sem argumento retorna erro de mensagem',  async () => {
   await expect(fetchProducts()).rejects.toThrow('You must provide an url');
  });
  
});
