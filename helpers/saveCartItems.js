const saveCartItems = (argument) => {
  if (argument === undefined) {
    return new Error('Erro');
  } localStorage.setItem('cartItems', argument);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
