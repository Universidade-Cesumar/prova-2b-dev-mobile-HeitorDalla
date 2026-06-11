import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

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
  } = useMateriais();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

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

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Estoque atual</Text>
        <MaterialList materiais={materiais} loading={loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingHorizontal: 20,
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
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#d9a441',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800',
  },
  listContainer: {
    flex: 1,
    marginTop: 18,
  },
  listContent: {
    paddingBottom: 24,
    gap: 12,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyText: {
    color: '#cbd5e1',
    textAlign: 'center',
    fontSize: 15,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#cbd5e1',
  },
  card: {
    backgroundColor: '#16243f',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#243455',
  },
  materialNome: {
    color: '#f8fafc',
    fontSize: 17,
    fontWeight: '700',
  },
  materialQuantidade: {
    color: '#cbd5e1',
    marginTop: 6,
    fontSize: 14,
  },
});