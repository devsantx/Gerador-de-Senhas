import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import useStorage from '@/src/hooks/useStorage';
import { PasswordItem } from '@/src/components/password/passworditem';
import { Feather } from '@expo/vector-icons';

export default function Password() {
  const [listPasswords, setListPasswords] = useState<string[]>([]);
  const focused = useIsFocused();
  const { getItem, removeItem, saveItem } = useStorage();

  // Carregar as senhas do AsyncStorage
  useEffect(() => {
    async function loadPasswords() {
      const passwords = await getItem('@pass');
      setListPasswords(passwords);
    }
    loadPasswords();
  }, [focused]);

  // Atualizar o uso da senha
  async function handleUpdateUsage(password: string, newUsage: string) {
    const [originalPassword] = password.split(' - ');
    const updatedPassword = `${originalPassword} - ${newUsage}`;

    const updatedList = listPasswords.map((item) =>
      item === password ? updatedPassword : item
    );

    await saveItem('@pass', updatedPassword); // Atualiza o AsyncStorage
    setListPasswords(updatedList); // Atualiza a lista local
  }

  // Remover uma senha
  async function handleRemovePassword(password: string) {
    const updatedPasswords = await removeItem('@pass', password);
    setListPasswords(updatedPasswords); // Atualiza o estado local
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: -50 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Senhas</Text>
        <Feather name="plus" size={20} />
      </View>
      <View style={styles.content}>
        <FlatList
          style={{ flex: 1, paddingTop: 14 }}
          data={listPasswords}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const [password, usage] = item.split(' - ');

            return (
              <PasswordItem
                data={item}
                removePassword={() => handleRemovePassword(item)}
                onEditUsage={(newUsage: string) =>
                  handleUpdateUsage(item, newUsage)
                }
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#392de9',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 25,
    paddingRight: 14,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
  },
});
