import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { cadastrarMaterial as enviarMaterial, listarMateriais } from '../services/materiaisService';

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

  return {
    materiais,
    loading,
    nome,
    quantidade,
    sending,
    setNome,
    setQuantidade,
    cadastrarMaterial,
  };
}