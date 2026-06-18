export function validarRetirada(estoqueAtual, quantidadeRetirada) {
  const estoque = Number(estoqueAtual);
  const retirada = Number(quantidadeRetirada);

  if (!Number.isFinite(estoque) || !Number.isFinite(retirada)) {
    return false;
  }

  if (!Number.isInteger(retirada) || retirada <= 0) {
    return false;
  }

  return retirada <= estoque;
}