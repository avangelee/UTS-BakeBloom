import { Stack } from 'expo-router';
import { useStore } from '../store/useStore';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function RootLayout() {
  const { darkMode } = useStore();

  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? '#1a1a1a' : '#fdf2f8' }}>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ec4899',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: darkMode ? '#1a1a1a' : '#fdf2f8',
          },
          headerBackTitle: 'Kembali',
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'BakeBloom',
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="menu" 
          options={{ 
            title: 'Menu',
            headerShown: true
          }} 
        />
        <Stack.Screen 
          name="detail" 
          options={{ 
            title: 'Detail Menu',
            headerShown: true
          }} 
        />
        <Stack.Screen 
          name="cart" 
          options={{ 
            title: 'Keranjang',
            headerShown: true
          }} 
        />
        <Stack.Screen 
          name="history" 
          options={{ 
            title: 'Riwayat Pesanan',
            headerShown: true
          }} 
        />
      </Stack>
    </View>
  );
}