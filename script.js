const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const chamaFetch = async () => {
  const resposta = await fetchProducts('computador');
  return resposta;
};

const createListProduct = async () => {
  const objApi = await chamaFetch();
  const array = objApi.results;
  const items = document.querySelector('.items');
  array.forEach((obj) => {
    const { id, title, thumbnail } = obj;
    items.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
};

const productDetails = async (event) => {
  const idCapturado = getSkuFromProductItem(event.target.parentElement);
  console.log(idCapturado);
  const objApi = await fetchItem(idCapturado);
  console.log(objApi);
  const { id, title, price } = objApi;
  const ol = document.querySelector('.cart__items');
  ol.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
};

const clickButton = () => {
  const buttonCart = document.querySelectorAll('.item__add');
  buttonCart.forEach((button) => {
    button.addEventListener('click', (event) => productDetails(event));
  });
};

window.onload = async () => {
  await createListProduct();
  await clickButton();
};
