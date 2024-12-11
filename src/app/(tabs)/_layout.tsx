import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#f1f1fa',
          borderTopColor: '#f3f3ff',
          height: 60, // Ajuste conforme necessário
        },
        tabBarIconStyle: {
          marginBottom: -8, // Ajuste negativo para aproximar os ícones do bottom
          marginTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="password"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="lock" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
