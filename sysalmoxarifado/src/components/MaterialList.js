import { useState } from 'react';

import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

function MaterialCard({ item, onBaixar, onExcluir }) {
  const [quantidadeRetirada, setQuantidadeRetirada] = useState('');
  const estoqueCritico = Number(item.quantidade) < 10;

  async function handleBaixar() {
    const sucesso = await onBaixar(item.id, item.quantidade, quantidadeRetirada);

    if (sucesso) {
      setQuantidadeRetirada('');
    }
  }

  return (
    <View
      accessibilityLabel={estoqueCritico ? 'estoque-critico' : undefined}
      style={[styles.card, estoqueCritico && styles.cardCritico]}
    >
      <Text style={styles.materialNome}>{item.nome}</Text>
      <Text style={styles.materialQuantidade}>Quantidade: {item.quantidade}</Text>

      {estoqueCritico ? <Text style={styles.alertaTexto}>Estoque crítico</Text> : null}

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
  return (
    <View style={styles.container} testID="lista-materials">
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#d9a441" />
          <Text style={styles.loadingText}>Carregando materiais...</Text>
        </View>
      ) : null}

      <View testID="lista-materiais" style={materiais.length === 0 ? styles.emptyList : styles.listContent}>
        {loading ? null : materiais.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum material cadastrado ainda.</Text>
        ) : (
          materiais.map((item) => <MaterialCard key={item.id} item={item} onBaixar={onBaixar} onExcluir={onExcluir} />)
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  listContent: {
    gap: 12,
  },
  emptyList: {
    justifyContent: 'center',
  },
  emptyText: {
    color: '#cbd5e1',
    textAlign: 'center',
    fontSize: 15,
  },
  loadingContainer: {
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
  cardCritico: {
    backgroundColor: '#3b1717',
    borderColor: '#ef4444',
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
  alertaTexto: {
    color: '#fca5a5',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
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