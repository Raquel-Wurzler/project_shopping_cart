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
  return `R$ ${sumPrices}`;
};

const printTotal = async () => {
  const subtotal = document.querySelector('.total-price');
  const valueSum = await sumProducts();
  subtotal.innerHTML = valueSum;
};

const cartItemClickListener = (event) => {
  event.target.remove();
  printTotal();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = `<p><strong>SKU:</strong> ${sku}</p>
  <p><strong>NAME:</strong> ${name}</p>
  <p><strong>PRICE:</strong> ${salePrice}</p>`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const chamaFetch = async () => {
  const resposta = await fetchProducts('computador');
  return resposta;
};

const createLoadingApi = () => {
  const divLoading = document.createElement('div');
  divLoading.className = 'loading';
  divLoading.innerHTML = 'carregando...';
  const containerItems = document.querySelector('.items');
  containerItems.appendChild(divLoading);
};

const removeLoadingApi = () => {
  const containerItems = document.querySelector('.items');
  containerItems.innerHTML = '';
};

const createListProduct = async () => {
  await createLoadingApi();
  const objApi = await chamaFetch();
  await removeLoadingApi();
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

const cleanCart = () => {
  const cleanButton = document.querySelector('.empty-cart');
  cleanButton.addEventListener('click', () => {
  const parentItem = document.querySelector('.cart__items');
  const totalPrice = document.querySelector('.total-price');
  parentItem.innerHTML = '';
  totalPrice.innerHTML = 'R$ 0';
  localStorage.clear();
});
};

window.onload = async () => {
  await createListProduct();
  clickButton();
  savingInLocalStorage();
  await sumProducts();
  await printTotal();
  cleanCart();
};
