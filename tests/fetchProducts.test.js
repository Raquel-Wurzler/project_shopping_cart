require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('Verifica se "fetchProducts" é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Verifica se ao executar a função "fetchProducts" com o argumento "computador" o fetch é chamado', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Verifica se ao executar a função "fetchProducts" com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    expect.assertions(1);
  await fetchProducts('computador');
  const endpointUtilizado = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  expect(fetch).toHaveBeenCalledWith(endpointUtilizado);
  });

  it('Verifica se ao executar a função "fetchProducts" com o argumento "computador" a função retorna o objeto esperado', async () => {
    expect.assertions(1);
    expect(await fetchProducts('computador')).toBe(computadorSearch);
  });

  it('Verifica se ao executar a função sem argumento retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect.assertions(1);
    const funcSemParametro = await fetchProducts();
    const expectedError ='You must provide an url';
    expect(funcSemParametro).toBe(expectedError);
  });
});
