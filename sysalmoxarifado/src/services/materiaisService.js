import { API_URL } from '../config/api';

export function normalizarMaterial(item, index) {
  return {
    id: String(item.id ?? item._id ?? index),
    nome: item.nome ?? item.name ?? item.title ?? 'Material sem nome',
    quantidade: item.quantidade ?? item.quantity ?? 0,
  };
}

export async function listarMateriais() {
  try {
    if (!API_URL) {
      return [];
    }

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Falha ao carregar a lista de materiais.');
    }

    const data = await response.json();

    return Array.isArray(data) ? data.map(normalizarMaterial) : [];
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Não foi possível acessar o estoque no momento.');
  }
}

export async function cadastrarMaterial(novoMaterial) {
  try {
    if (!API_URL) {
      throw new Error('Configure a MockAPI antes de cadastrar materiais.');
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoMaterial),
    });

    if (!response.ok) {
      throw new Error('Falha ao cadastrar o material.');
    }

    return response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Não foi possível cadastrar o material.');
  }
}

export async function atualizarMaterial(id, dadosAtualizados) {
  try {
    if (!API_URL) {
      throw new Error('Configure a MockAPI antes de atualizar materiais.');
    }

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosAtualizados),
    });

    if (!response.ok) {
      throw new Error('Falha ao atualizar o material.');
    }

    return response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Não foi possível atualizar o material.');
  }
}

export async function excluirMaterial(id) {
  try {
    if (!API_URL) {
      throw new Error('Configure a MockAPI antes de excluir materiais.');
    }

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Falha ao excluir o material.');
    }

    return true;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Não foi possível excluir o material.');
  }
}