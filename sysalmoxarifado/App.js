import { useMemo, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import MaterialForm from './src/components/MaterialForm';
import MaterialList from './src/components/MaterialList';
import useMateriais from './src/hooks/useMateriais';

export default function App() {
  const {
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
  } = useMateriais();
  const [busca, setBusca] = useState('');

  const materiaisFiltrados = useMemo(() => {
    const termoBusca = busca.trim().toLowerCase();

    if (!termoBusca) {
      return materiais;
    }

    return materiais.filter((material) => material.nome.toLowerCase().includes(termoBusca));
  }, [busca, materiais]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Almoxarifado</Text>
          <Text style={styles.subtitulo}>Controle simples de entrada de materiais</Text>
        </View>

        <View style={styles.formulario}>
          <Text style={styles.sectionTitle}>Novo insumo</Text>
          <MaterialForm
            nome={nome}
            quantidade={quantidade}
            sending={sending}
            onChangeNome={setNome}
            onChangeQuantidade={setQuantidade}
            onSubmit={cadastrarMaterial}
          />
        </View>

        <View style={styles.filtroCard}>
          <Text style={styles.sectionTitle}>Pesquisa em tempo real</Text>
          <TextInput
            testID="input-busca"
            value={busca}
            onChangeText={setBusca}
            placeholder="Buscar material"
            placeholderTextColor="#6c7a89"
            style={styles.inputBusca}
          />
          <Text testID="total-itens" style={styles.totalItens}>
            Total de itens: {materiaisFiltrados.length}
          </Text>
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>Estoque atual</Text>
          <MaterialList
            materiais={materiaisFiltrados}
            loading={loading}
            onBaixar={baixarMaterial}
            onExcluir={removerMaterial}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 18,
  },
  titulo: {
    color: '#f8fafc',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitulo: {
    color: '#cbd5e1',
    marginTop: 6,
    fontSize: 15,
  },
  formulario: {
    backgroundColor: '#111c33',
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  filtroCard: {
    marginTop: 18,
    backgroundColor: '#111c33',
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
  },
  inputBusca: {
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  totalItens: {
    color: '#cbd5e1',
    fontSize: 15,
    fontWeight: '600',
  },
  listContainer: {
    marginTop: 18,
  },
});