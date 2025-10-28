import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useStore } from '../store/useStore';

export default function History() {
  const { orders, darkMode } = useStore();

  const theme = {
    background: darkMode ? '#1a1a1a' : '#fdf2f8',
    text: darkMode ? '#ffffff' : '#1f2937',
    card: darkMode ? '#2d2d2d' : '#ffffff',
    primary: '#ec4899',
    border: darkMode ? '#374151' : '#e5e7eb'
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' ? '#10b981' : '#f59e0b';
  };

  const getStatusBackground = (status: string) => {
    return status === 'completed' ? '#d1fae5' : '#fef3c7';
  };

  const getStatusText = (status: string) => {
    return status === 'completed' ? 'Selesai' : 'Pending';
  };

  const renderHistoryItem = ({ item }: { item: any }) => (
    <View style={[styles.historyItem, { backgroundColor: theme.card }]}>
      <View style={styles.historyHeader}>
        <Text style={[styles.date, { color: theme.text }]}>
          {formatDate(item.date)}
        </Text>
        <View style={[
          styles.statusBadge, 
          { 
            backgroundColor: getStatusBackground(item.status),
            borderColor: getStatusColor(item.status)
          }
        ]}>
          <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.itemsContainer}>
        {item.items.map((orderItem: any, index: number) => (
          <View key={index} style={styles.orderItem}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemEmoji}>{orderItem.image}</Text>
              <View>
                <Text style={[styles.itemName, { color: theme.text }]}>
                  {orderItem.name}
                </Text>
                <Text style={[styles.itemQuantity, { color: theme.text }]}>
                  {orderItem.quantity}x @ Rp {orderItem.price.toLocaleString()}
                </Text>
              </View>
            </View>
            <Text style={[styles.itemTotal, { color: theme.text }]}>
              Rp {(orderItem.price * orderItem.quantity).toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
      
      <View style={[styles.totalContainer, { borderTopColor: theme.border }]}>
        <Text style={[styles.totalLabel, { color: theme.text }]}>Total:</Text>
        <Text style={styles.totalAmount}>Rp {item.total.toLocaleString()}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.reorderButton}>
          <Text style={styles.reorderButtonText}>Pesan Lagi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailButton}>
          <Text style={styles.detailButtonText}>Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (orders.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyEmoji, { color: theme.text }]}>📝</Text>
          <Text style={[styles.emptyText, { color: theme.text }]}>
            Belum ada riwayat pesanan
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.text }]}>
            Pesan menu favoritmu dan lihat riwayatnya di sini!
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => {}}
          >
            <Text style={styles.browseButtonText}>Lihat Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Riwayat Pesanan ({orders.length})
        </Text>
      </View>

      <FlatList
        data={orders}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.historyList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  historyList: {
    gap: 16,
    paddingBottom: 20,
  },
  historyItem: {
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
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  date: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
  },
  itemsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemQuantity: {
    fontSize: 12,
    opacity: 0.7,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ec4899',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  reorderButton: {
    flex: 1,
    backgroundColor: '#ec4899',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  reorderButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  detailButton: {
    flex: 1,
    backgroundColor: '#fdf2f8',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ec4899',
  },
  detailButtonText: {
    color: '#ec4899',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 24,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: '#ec4899',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  browseButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});