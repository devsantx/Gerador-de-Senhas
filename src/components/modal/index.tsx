import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import useStorage from '@/src/hooks/useStorage';

export function ModalPassword({
  password,
  handleClose,
}: {
  password: string;
  handleClose: () => void;
}) {
  const { saveItem } = useStorage();
  const [showPassword, setShowPassword] = useState(false); // Controla a visibilidade da senha

  async function handleSavePassword() {
    await Clipboard.setStringAsync(password);
    await saveItem('@pass', password); // Salva apenas a senha
    alert('Senha salva com Sucesso!');
    handleClose();
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Senha Gerada</Text>

        <Pressable style={styles.innerPassword}>
          <Text style={styles.text}>
            {showPassword ? password : '*'.repeat(password.length)}
          </Text>
        </Pressable>

        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.toggleButtonText}>
            {showPassword ? 'Esconder' : 'Mostrar'} Senha
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={handleSavePassword}
          >
            <Text style={styles.buttonSaveText}>Salvar Senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(24,24,24,0.6)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#fff',
    width: '85%',
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  innerPassword: {
    backgroundColor: '#0e0e0e',
    width: '90%',
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleButton: {
    marginBottom: 20,
  },
  toggleButtonText: {
    color: '#382de9',
    fontWeight: 'bold',
  },
  buttonArea: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 2,
    padding: 12,
  },
  buttonSave: {
    backgroundColor: '#382de9',
    borderRadius: 12,
    paddingLeft: 2,
    paddingRight: 2,
  },
  buttonSaveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
