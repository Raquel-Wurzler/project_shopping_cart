const fetchProducts = async (nameProduct) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${nameProduct}`;

    const resposta = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => 'You must provide an url');
    return resposta;
  };

  fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
