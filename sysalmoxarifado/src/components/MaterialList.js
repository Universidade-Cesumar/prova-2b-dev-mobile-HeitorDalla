import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

export default function MaterialList({ materiais, loading }) {
  function renderItem({ item }) {
    return (
      <View style={styles.card}>
        <Text style={styles.materialNome}>{item.nome}</Text>
        <Text style={styles.materialQuantidade}>Quantidade: {item.quantidade}</Text>
      </View>
    );
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