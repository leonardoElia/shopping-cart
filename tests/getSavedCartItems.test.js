const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');
//const { expect } = require('chai');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
 it('Testando se o metodo localStorage.getItem é executado ao chamar a função', () =>{
  getSavedCartItems();
  expect(localStorage.getItem).toHaveBeenCalled();
 });

 it('Testando se ao executar getSavedCartItems, o método localStorage.getItem é chamado com o cartItems como parâmetro.', () =>{
  getSavedCartItems('cartItems');
  expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
 });
});
