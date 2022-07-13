const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Verifica se "saveCartItems" é uma função', () => {
    expect(typeof(saveCartItems)).toBe('function');
  });

  it('Verifica se ao executar a função "saveCartItems" com o argumento "<ol><li>Item</li></ol>" o método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>'),
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('Verifica se ao executar a função "saveCartItems" com o argumento "<ol><li>Item</li></ol>" o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo o argumento passado', () => {
    saveCartItems('<ol><li>Item</li></ol>'),
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });

  it('Verifica se ao executar a função "saveCartItems" com o argumento "<ol><li>Item</li></ol>" o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo o argumento passado', () => {
    saveCartItems('<ol><li>Item</li></ol>'),
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });

  it('Verifica se ao executar a função "saveCartItems" sem parâmetro retorma um erro', () => {
    expect(saveCartItems()).toEqual(new Error('Erro'));
  });
});
