const fetchItem = async (item) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${item}`;

  const resposta = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => 'You must provide an url');

    return resposta;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
