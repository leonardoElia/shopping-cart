const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
//const { expect } = require('chai');
// const { expect } = require('chai');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('testando se ao passar um item o localStorage.setItem é usado', () => {
    saveCartItems();
    expect(localStorage.setItem).toHaveBeenCalled() ;
  });

  it('testando de a função saveCartItem é executada de maneira correta', () => {
    const item = 'carrinhoItem';
    saveCartItems('carrinhoItem');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', item);
  });
});
