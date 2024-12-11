import AsyncStorage from '@react-native-async-storage/async-storage';

type StorageKey = string; // Define o tipo para a chave
type StoredValue = any; // Ajuste para o tipo do valor que será salvo (string, objeto, etc.)

const useStorage = () => {
  // Buscar itens salvos
  const getItem = async (key: StorageKey): Promise<StoredValue[]> => {
    try {
      const passwords = await AsyncStorage.getItem(key);
      return passwords ? JSON.parse(passwords) : [];
    } catch (error) {
      console.error('Erro ao buscar: ', error);
      return [];
    }
  };

  // Salvar Item
  const saveItem = async (
    key: StorageKey,
    value: StoredValue
  ): Promise<void> => {
    try {
      const passwords = await getItem(key);
      passwords.push(value);
      await AsyncStorage.setItem(key, JSON.stringify(passwords));
    } catch (error) {
      console.error('Erro ao salvar: ', error);
    }
  };

  // Apagar Item
  const removeItem = async (
    key: StorageKey,
    item: StoredValue
  ): Promise<StoredValue[]> => {
    try {
      const passwords = await getItem(key);
      const myPasswords = passwords.filter((password: StoredValue) => {
        // Ajuste conforme o tipo do valor; ex. comparação por ID em objetos
        return password !== item;
      });
      await AsyncStorage.setItem(key, JSON.stringify(myPasswords));
      return myPasswords;
    } catch (error) {
      console.error('Erro ao deletar: ', error);
      return [];
    }
  };

  return {
    getItem,
    saveItem,
    removeItem,
  };
};

export default useStorage;
