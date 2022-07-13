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

const sumProducts = async () => {
  const pricesProducts = [];
  const listCartProducts = document.querySelectorAll('.cart__item'); // Todos os itens do carrinho
  listCartProducts.forEach((item) => {
    const numbers = item.innerText.match(/[\d,.]+/g);
    const valuesString = numbers[numbers.length - 1];
    const valuesNumbers = Number(valuesString);
    pricesProducts.push(valuesNumbers);
  });
  const sumPrices = pricesProducts.reduce((acc, price) => acc + price, 0);
  return sumPrices;
};

const printTotal = async () => {
  const subtotal = document.querySelector('.total-price');
  const valueSum = await sumProducts();
  subtotal.innerHTML = `R$ ${valueSum}`;
};

const cartItemClickListener = (event) => {
  event.target.remove();
  printTotal();
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

const ol = document.querySelector('.cart__items');

const productDetails = async (event) => {
  const idCapturado = getSkuFromProductItem(event.target.parentElement);
  const objApi = await fetchItem(idCapturado);
  const { id, title, price } = objApi;
  ol.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  saveCartItems(ol.innerHTML); // Salva o item que foi adicionado ao carrinho no localStorage
  printTotal();
};

const clickButton = () => {
  const buttonCart = document.querySelectorAll('.item__add');
  buttonCart.forEach((button) => {
    button.addEventListener('click', (event) => productDetails(event));
  });
};

const savingInLocalStorage = () => {
  if (localStorage.length === 0) {
    ol.innerHTML = '';
  }
  ol.innerHTML = getSavedCartItems(); // Retorna valor salvo no localStorage
  const liItem = document.querySelectorAll('.cart__item'); // Todos os itens do carrinho
  liItem.forEach((li) => li.addEventListener('click', cartItemClickListener));
  // Adiciono o evento de click em cada item do carrinho
};

window.onload = async () => {
  await createListProduct();
  clickButton();
  savingInLocalStorage();
  await sumProducts();
  await printTotal();
};
