import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useStore, MenuItem } from '../store/useStore';

const menuData: MenuItem[] = [
  {
    id: '1',
    name: 'Red Velvet Cupcake',
    category: 'food',
    price: 25000,
    description: 'Cupcake lembut dengan cream cheese frosting yang creamy dan manis. Dibuat dengan bahan-bahan premium untuk rasa yang sempurna.',
    image: '🍰',
    ingredients: ['Tepung premium', 'Coklat merah', 'Cream cheese', 'Butter', 'Telur', 'Gula']
  },
  {
    id: '2',
    name: 'Croissant Almond',
    category: 'food',
    price: 18000,
    description: 'Croissant renyah dengan isian almond yang gurih. Sempurna untuk sarapan atau camilan sore.',
    image: '🥐',
    ingredients: ['Tepung terigu', 'Almond slice', 'Butter', 'Ragi', 'Susu', 'Gula']
  },
  {
    id: '3',
    name: 'Macaroon Box',
    category: 'food',
    price: 45000,
    description: '6 buah macaroon berbagai rasa dengan tekstur yang sempurna.',
    image: '🧁',
    ingredients: ['Almond flour', 'Gula halus', 'Buttercream', 'Pewarna makanan']
  },
  {
    id: '4',
    name: 'Chocolate Brownie',
    category: 'food',
    price: 22000,
    description: 'Brownie coklat kaya rasa dengan walnut yang renyah.',
    image: '🍫',
    ingredients: ['Coklat dark', 'Walnut', 'Telur', 'Tepung', 'Butter']
  },
  {
    id: '5',
    name: 'Pink Latte',
    category: 'drink',
    price: 28000,
    description: 'Latte dengan rasa strawberry dan rose yang romantis.',
    image: '☕',
    ingredients: ['Espresso', 'Susu full cream', 'Strawberry syrup', 'Rose essence']
  },
  {
    id: '6',
    name: 'Matcha Bloom',
    category: 'drink',
    price: 32000,
    description: 'Matcha latte premium dengan honey dan milk foam yang lembut.',
    image: '🍵',
    ingredients: ['Matcha grade A', 'Susu oat', 'Madu organik', 'Milk foam']
  }
];

export default function Detail() {
  const { id } = useLocalSearchParams();
  const { addToCart, darkMode } = useStore();
  const item = menuData.find(menuItem => menuItem.id === id);

  const theme = {
    background: darkMode ? '#1a1a1a' : '#fdf2f8',
    text: darkMode ? '#ffffff' : '#1f2937',
    card: darkMode ? '#2d2d2d' : '#ffffff',
    primary: '#ec4899'
  };

  if (!item) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Menu tidak ditemukan</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(item);
    alert(`${item.name} ditambahkan ke keranjang! 🎀`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{item.image}</Text>
        <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
        <Text style={styles.price}>Rp {item.price.toLocaleString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Deskripsi</Text>
        <Text style={[styles.description, { color: theme.text }]}>{item.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Bahan-bahan</Text>
        {item.ingredients.map((ingredient, index) => (
          <Text key={index} style={[styles.ingredient, { color: theme.text }]}>
            • {ingredient}
          </Text>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addButtonText}>+ Tambah ke Pesanan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ec4899',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 6,
    lineHeight: 20,
    opacity: 0.8,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 20,
  },
  addButton: {
    backgroundColor: '#ec4899',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});