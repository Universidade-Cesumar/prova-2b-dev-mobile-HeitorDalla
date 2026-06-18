import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import {
  atualizarMaterial,
  cadastrarMaterial as enviarMaterial,
  excluirMaterial,
  listarMateriais,
} from '../services/materiaisService';
import { validarRetirada } from '../../../src/utils/validacoes';

export default function useMateriais() {
  const [materiais, setMateriais] = useState([]);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    carregarMateriais();
  }, []);

  async function carregarMateriais() {
    try {
      const materiaisCarregados = await listarMateriais();
      setMateriais(materiaisCarregados);
    } catch (error) {
      setMateriais([]);
    } finally {
      setLoading(false);
    }
  }

  async function cadastrarMaterial() {
    if (!nome.trim() || !quantidade.trim()) {
      Alert.alert('Atenção', 'Preencha o nome e a quantidade do material.');
      return;
    }

    const novoMaterial = {
      nome: nome.trim(),
      quantidade: Number(quantidade),
    };

    setSending(true);

    try {
      const criado = await enviarMaterial(novoMaterial);
      setMateriais((listaAtual) => [
        {
          id: String(criado.id ?? Date.now()),
          nome: criado.nome ?? novoMaterial.nome,
          quantidade: criado.quantidade ?? novoMaterial.quantidade,
        },
        ...listaAtual,
      ]);
      setNome('');
      setQuantidade('');
      Alert.alert('Sucesso', 'Material cadastrado com sucesso.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o material.');
    } finally {
      setSending(false);
    }
  }

  async function baixarMaterial(id, estoqueAtual, quantidadeRetirada) {
    if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {
      Alert.alert('Atenção', 'A quantidade de retirada é inválida.');
      return false;
    }

    const materialOriginal = materiais.find((material) => material.id === id);

    if (!materialOriginal) {
      Alert.alert('Erro', 'Material não encontrado para atualização.');
      return false;
    }

    const materialAtualizado = {
      ...materialOriginal,
      quantidade: Number(estoqueAtual) - Number(quantidadeRetirada),
    };
    // atualiza UI imediatamente e reverte em caso de erro
    const listaAnterior = materiais;

    setMateriais((listaAtual) =>
      listaAtual.map((material) =>
        material.id === id ? { ...material, quantidade: materialAtualizado.quantidade } : material,
      ),
    );

    setSending(true);

    try {
      await atualizarMaterial(id, materialAtualizado);
      await carregarMateriais();

      return true;
    } catch (error) {
      // reverte o estado anterior
      setMateriais(listaAnterior);
      Alert.alert('Erro', 'Não foi possível concluir a baixa do material.');
      return false;
    } finally {
      setSending(false);
    }
  }

  async function removerMaterial(id) {
    const listaAnterior = materiais;

    // Otimista: remove localmente antes de aguardar o servidor
    setMateriais((listaAtual) => listaAtual.filter((material) => material.id !== id));
    setSending(true);

    try {
      await excluirMaterial(id);
      return true;
    } catch (error) {
      // reverte a lista se falhar
      setMateriais(listaAnterior);
      Alert.alert('Erro', 'Não foi possível excluir o material.');
      return false;
    } finally {
      setSending(false);
    }
  }

  return {
    materiais,
    loading,
    nome,
    quantidade,
    sending,
    setNome,
    setQuantidade,
    cadastrarMaterial,
    baixarMaterial,
    removerMaterial,
  };
}