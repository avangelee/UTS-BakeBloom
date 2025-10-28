import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore, MenuItem } from '../store/useStore';

const menuData: MenuItem[] = [
  {
    id: '1',
    name: 'Red Velvet Cupcake',
    category: 'food',
    price: 25000,
    description: 'Cupcake lembut dengan cream cheese frosting',
    image: '🍰',
    ingredients: ['Tepung', 'Coklat', 'Cream Cheese']
  },
  {
    id: '2',
    name: 'Croissant Almond',
    category: 'food',
    price: 18000,
    description: 'Croissant renyah dengan isian almond',
    image: '🥐',
    ingredients: ['Tepung', 'Almond', 'Butter']
  },
  {
    id: '3',
    name: 'Macaroon Box',
    category: 'food',
    price: 45000,
    description: '6 buah macaroon berbagai rasa',
    image: '🧁',
    ingredients: ['Almond', 'Gula', 'Buttercream']
  },
  {
    id: '4',
    name: 'Chocolate Brownie',
    category: 'food',
    price: 22000,
    description: 'Brownie coklat kaya rasa dengan walnut',
    image: '🍫',
    ingredients: ['Coklat', 'Walnut', 'Telur']
  },
  {
    id: '5',
    name: 'Pink Latte',
    category: 'drink',
    price: 28000,
    description: 'Latte dengan rasa strawberry dan rose',
    image: '☕',
    ingredients: ['Espresso', 'Susu', 'Strawberry']
  },
  {
    id: '6',
    name: 'Matcha Bloom',
    category: 'drink',
    price: 32000,
    description: 'Matcha latte dengan honey dan milk foam',
    image: '🍵',
    ingredients: ['Matcha', 'Susu', 'Madu']
  },
  {
    id: '7',
    name: 'Berry Smoothie',
    category: 'drink',
    price: 25000,
    description: 'Smoothie segar campuran berry',
    image: '🥤',
    ingredients: ['Strawberry', 'Blueberry', 'Yogurt']
  },
  {
    id: '8',
    name: 'Choco Mint',
    category: 'drink',
    price: 27000,
    description: 'Minuman coklat dengan sensasi mint',
    image: '🧃',
    ingredients: ['Coklat', 'Mint', 'Susu']
  }
];

const categories = [
  { id: 'all', name: 'Semua Menu' },
  { id: 'food', name: 'Makanan' },
  { id: 'drink', name: 'Minuman' }
];

export default function Menu() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart, darkMode } = useStore();

  const filteredMenu = selectedCategory === 'all' 
    ? menuData 
    : menuData.filter(item => item.category === selectedCategory);

  const theme = {
    background: darkMode ? '#1a1a1a' : '#fdf2f8',
    text: darkMode ? '#ffffff' : '#1f2937',
    card: darkMode ? '#2d2d2d' : '#ffffff',
    primary: '#ec4899',
    border: darkMode ? '#374151' : '#e5e7eb'
  };

  const renderCategory = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item.id)}
      style={[
        styles.categoryButton,
        { 
          backgroundColor: selectedCategory === item.id ? theme.primary : theme.card,
          borderColor: theme.primary
        }
      ]}
    >
      <Text style={[
        styles.categoryText,
        { color: selectedCategory === item.id ? '#ffffff' : theme.primary }
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: theme.card }]}
      onPress={() => router.push(`/detail?id=${item.id}`)}
    >
      <View style={styles.menuHeader}>
        <Text style={styles.menuEmoji}>{item.image}</Text>
        <View style={styles.menuInfo}>
          <Text style={[styles.menuName, { color: theme.text }]}>{item.name}</Text>
          <Text style={[styles.menuPrice, { color: theme.primary }]}>
            Rp {item.price.toLocaleString()}
          </Text>
        </View>
      </View>
      <Text style={[styles.menuDescription, { color: theme.text }]} numberOfLines={2}>
        {item.description}
      </Text>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.primary }]}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.addButtonText}>+ Tambah</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={[styles.backButtonText, { color: theme.primary }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Menu</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContent}
        />
      </View>
      
      <FlatList
        data={filteredMenu}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              Tidak ada menu untuk kategori ini
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryContent: {
    gap: 12,
    paddingHorizontal: 4,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 2,
    marginHorizontal: 4,
    minWidth: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontWeight: '600',
    fontSize: 14,
  },
  menuList: {
    gap: 12,
    paddingBottom: 20,
  },
  menuItem: {
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  menuInfo: {
    flex: 1,
  },
  menuName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
    lineHeight: 20,
  },
  addButton: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.7,
  },
});