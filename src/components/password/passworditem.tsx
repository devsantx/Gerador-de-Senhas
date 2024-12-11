import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PasswordItemProps {
  data: string; // Formato: "senha - anotação" ou apenas "senha"
  removePassword: () => void;
  onEditUsage: (newUsage: string) => void;
}

export function PasswordItem({
  data,
  removePassword,
  onEditUsage,
}: PasswordItemProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, usage] = data.split(' - ');
  const [currentUsage, setCurrentUsage] = useState(usage || '');

  const handleSaveUsage = () => {
    onEditUsage(currentUsage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoArea}>
        <Text style={styles.passwordText}>
          {passwordVisible ? password : '*'.repeat(password.length)}
        </Text>
        <View style={styles.usageArea}>
          <TextInput
            style={styles.input}
            value={currentUsage}
            onChangeText={setCurrentUsage}
            placeholder="Adicionar uso"
            onBlur={handleSaveUsage} // Salva ao perder o foco
          />
        </View>
      </View>

      <View style={styles.actionArea}>
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={removePassword} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={24} color="#ff0000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e0e0e',
    padding: 18,
    width: '100%',
    marginBottom: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoArea: {
    flex: 1,
  },
  passwordText: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  usageArea: {
    marginTop: 8,
  },
  input: {
    color: '#bbb',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 14,
    paddingVertical: 4,
  },
  actionArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 12,
  },
});
