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


