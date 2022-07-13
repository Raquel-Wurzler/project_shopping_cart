const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Verifica se "getSavedCartItems" é uma função', () => {
    expect(typeof(getSavedCartItems)).toBe('function');
  });

  it('Verifica se ao executar a função "getSavedCartItems" o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('Verifica se ao executar a função "getSavedCartItems" o método localStorage.getItem é chamado com o parâmetro, "cartItems"', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
