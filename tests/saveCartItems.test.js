const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('testando se passar um intem o localStorage.setItem é usado',  async () => {
    await saveCartItems() 
  });
});
