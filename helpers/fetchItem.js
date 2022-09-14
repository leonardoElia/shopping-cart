const fetchItem = async (produto) => {
  try {
  const url = `https://api.mercadolibre.com/items/${produto}`;
  const resposta = await fetch(url);
  const objeto = await resposta.json();
  return objeto;
  } catch (erro) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
