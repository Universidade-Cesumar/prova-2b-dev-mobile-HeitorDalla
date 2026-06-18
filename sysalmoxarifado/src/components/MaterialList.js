import { useState } from 'react';

import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

function MaterialCard({ item, onBaixar, onExcluir }) {
  const [quantidadeRetirada, setQuantidadeRetirada] = useState('');

  async function handleBaixar() {
    const sucesso = await onBaixar(item.id, item.quantidade, quantidadeRetirada);

    if (sucesso) {
      setQuantidadeRetirada('');
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.materialNome}>{item.nome}</Text>
      <Text style={styles.materialQuantidade}>Quantidade: {item.quantidade}</Text>

      <TextInput
        testID="input-retirada"
        value={quantidadeRetirada}
        onChangeText={setQuantidadeRetirada}
        placeholder="Quantidade para retirada"
        placeholderTextColor="#6c7a89"
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.actionsRow}>
        <TouchableOpacity testID="btn-baixar" style={styles.primaryButton} onPress={handleBaixar}>
          <Text style={styles.buttonText}>Baixar</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="btn-excluir" style={styles.dangerButton} onPress={() => onExcluir(item.id)}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function MaterialList({ materiais, loading, onBaixar, onExcluir }) {
  function renderItem({ item }) {
    return <MaterialCard item={item} onBaixar={onBaixar} onExcluir={onExcluir} />;
  }

  return (
    <View style={styles.container} testID="lista-materials">
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#d9a441" />
          <Text style={styles.loadingText}>Carregando materiais...</Text>
        </View>
      ) : null}

      <FlatList
        testID="lista-materiais"
        data={loading ? [] : materiais}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={materiais.length === 0 ? styles.emptyList : styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum material cadastrado ainda.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    gap: 12,
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
  input: {
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#d9a441',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  dangerButton: {
    flex: 1,
    backgroundColor: '#ef4444',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '800',
  },
});