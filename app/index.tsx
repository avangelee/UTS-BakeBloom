import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../store/useStore';

export default function Home() {
  const router = useRouter();
  const { getCartItemCount, toggleDarkMode, darkMode } = useStore();

  const theme = {
    background: darkMode ? '#1a1a1a' : '#fdf2f8',
    text: darkMode ? '#ffffff' : '#1f2937',
    primary: '#ec4899'
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.primary }]}>BakeBloom</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Sweet Moments, Delicious Treats 🎀
        </Text>
      </View>

      

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/menu')}
        >
          <Text style={styles.buttonText}>Lihat Menu 🍰</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/cart')}
        >
          <Text style={styles.buttonText}>
            Keranjang ({getCartItemCount()}) 🛒
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/history')}
        >
          <Text style={styles.buttonText}>Riwayat Pesanan 📝</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.themeButton, { 
            backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
            borderColor: '#ec4899'
          }]}
          onPress={toggleDarkMode}
        >
          <Text style={[styles.themeButtonText, { color: '#ec4899' }]}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  buttonContainer: {
    gap: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#ec4899',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  themeButton: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    marginTop: 20,
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});