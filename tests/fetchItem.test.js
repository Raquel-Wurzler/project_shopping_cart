require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Verifca se "fetchItem" é uma função', () => {
    expect(typeof(fetchItem)).toBe('function')
  });

  it('Verifica se ao chamar a função "fetchItem" com o argumento "MLB1615760527" o fetch é chamado', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Verifica se ao chamar a função "fetchItem" com o argumento "MLB1615760527" a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    const endpointUtilizado = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(endpointUtilizado);
  });

  it('Verifica se ao executar a função "fetchItem" com o argumento "MLB1615760527" a função retorna o objeto esperado', async () => {
    expect.assertions(1);
    const func = await fetchItem('MLB1615760527')
    expect(func).toBe(item);
  });

  it('Verifica se ao executar a função sem argumento retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect.assertions(1);
    const funcSemParametro = await fetchItem();
    const expectedError = 'You must provide an url';
    expect(funcSemParametro).toBe(expectedError);
  });
});
