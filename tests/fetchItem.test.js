require('../mocks/fetchSimulator');
// const { expect } = require('chai');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
it('Testando se fetchItem é uma função',  async () => {
  expect(typeof fetchItem).toEqual('function')
});

it('testando se o fetch é adiconado com o parametro MLB1615760527',  async () => {
  await fetchItem('MLB1615760527');
  expect(fetch).toHaveBeenCalled();
});  

it('testando se a url esta certa ao usar o argumento MLB1615760527', async () => {
 const url = 'https://api.mercadolibre.com/items/MLB1615760527';
 await fetchItem('MLB1615760527');
 expect(fetch).toHaveBeenCalledWith(url)
});

it('Testando se o objeto retornado está correto ao passar MLB1615760527', async () => {
  await expect(fetchItem('MLB1615760527')).resolves.toEqual(item);
});

it('Testando se retorna mensagem de erro', async () => {
  await expect(fetchItem()).rejects.toThrow('You must provide an url');
});
});
