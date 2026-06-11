import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function MaterialForm({
  nome,
  quantidade,
  sending,
  onChangeNome,
  onChangeQuantidade,
  onSubmit,
}) {
  return (
    <>
      <TextInput
        testID="input-nome"
        value={nome}
        onChangeText={onChangeNome}
        placeholder="Nome do material"
        placeholderTextColor="#6c7a89"
        style={styles.input}
      />

      <TextInput
        testID="input-quantidade"
        value={quantidade}
        onChangeText={onChangeQuantidade}
        placeholder="Quantidade"
        placeholderTextColor="#6c7a89"
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity
        testID="btn-cadastrar"
        style={[styles.button, sending && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={sending}
      >
        <Text style={styles.buttonText}>{sending ? 'Cadastrando...' : 'Cadastrar'}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
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
});