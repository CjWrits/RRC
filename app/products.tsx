import { Colors, Fonts, useFonts, apiService, Product } from "@/shared";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert, SafeAreaView, Dimensions, Animated } from "react-native";
import { useState, useEffect, useRef } from "react";
import { router } from "expo-router";

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2;

const sampleProducts: Product[] = [
  {id: 1, name: "Royal Red Lehenga", price: 25999, originalPrice: 35999, image: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg", rating: 5, color: "red", category: "lehenga"},
  {id: 2, name: "Golden Bridal Lehenga", price: 45999, originalPrice: 55999, image: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg", rating: 5, color: "gold", category: "lehenga"},
  {id: 3, name: "Silk Saree", price: 12999, originalPrice: 16999, image: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg", rating: 4, color: "blue", category: "saree"},
  {id: 4, name: "Cotton Kurta Set", price: 3999, originalPrice: 5999, image: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg", rating: 4, color: "green", category: "kurta"},
];

export default function Products() {
  useFonts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const categories = [
    { id: "all", name: "All" },
    { id: "lehenga", name: "Lehengas" },
    { id: "saree", name: "Sarees" },
    { id: "kurta", name: "Kurtas" },
  ];

  const applyFilters = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      let filtered = sampleProducts;
      if (selectedCategory !== "all") {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
      setFilteredProducts(filtered);
    } catch (error) {
      Alert.alert("Error", "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productId: number) => {
    Alert.alert("Success", "Product added to cart!");
  };

  const renderProduct = ({ item, index }: { item: Product; index: number }) => {
    const animValue = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
      Animated.timing(animValue, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    const scale = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    });

    return (
      <Animated.View style={[styles.productCard, {
        opacity: animValue,
        transform: [{ scale }]
      }]}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>
          {Math.round((1 - item.price/item.originalPrice) * 100)}% OFF
        </Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.stars}>{"★".repeat(item.rating)}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>₹{item.price.toLocaleString()}</Text>
          <Text style={styles.originalPrice}>₹{item.originalPrice.toLocaleString()}</Text>
        </View>
        <TouchableOpacity 
          style={styles.addToCartButton} 
          onPress={() => handleAddToCart(item.id)}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <Animated.View style={[styles.heroSection, {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }]}>
          <Text style={styles.title}>Our Products</Text>
          <Text style={styles.subtitle}>Discover authentic Rajasthani clothing</Text>
        </Animated.View>

        {/* Categories */}
        <View style={styles.categorySection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryTabs}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryTab,
                    selectedCategory === category.id && styles.activeCategoryTab
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text style={[
                    styles.categoryTabText,
                    selectedCategory === category.id && styles.activeCategoryTabText
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Apply Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.applyButton, loading && styles.disabledButton]} 
            onPress={applyFilters} 
            disabled={loading}
          >
            <Text style={styles.applyButtonText}>
              {loading ? "Loading..." : "Apply Filters"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Products Grid */}
        <View style={styles.productsSection}>
          {filteredProducts.length > 0 ? (
            <FlatList
              data={filteredProducts}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.row}
              scrollEnabled={false}
              contentContainerStyle={styles.gridContainer}
            />
          ) : (
            <View style={styles.noProducts}>
              <Text style={styles.noProductsText}>Select filters and apply to view products</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    paddingTop: 50,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: "#8B4513",
    fontFamily: Fonts.MEDIUM,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: "#8B4513",
  },
  placeholder: {
    width: 40,
  },
  heroSection: {
    backgroundColor: "#8B4513",
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: "white",
  },
  categorySection: {
    paddingVertical: 16,
  },
  categoryTabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  activeCategoryTab: {
    backgroundColor: "#8B4513",
    borderColor: "#8B4513",
  },
  categoryTabText: {
    fontFamily: Fonts.MEDIUM,
    color: "#666",
    fontSize: 14,
  },
  activeCategoryTabText: {
    color: "white",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  applyButton: {
    backgroundColor: "#8B4513",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  applyButtonText: {
    color: "white",
    fontFamily: Fonts.MEDIUM,
    fontSize: 16,
  },
  productsSection: {
    paddingHorizontal: 20,
  },
  gridContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  productCard: {
    width: ITEM_WIDTH,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#e74c3c",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: "white",
    fontSize: 10,
    fontFamily: Fonts.BOLD,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    marginBottom: 6,
    height: 36,
  },
  stars: {
    color: "#f39c12",
    fontSize: 12,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  currentPrice: {
    fontSize: 14,
    fontFamily: Fonts.BOLD,
    color: "#8B4513",
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: "#999",
    textDecorationLine: "line-through",
  },
  addToCartButton: {
    backgroundColor: "#8B4513",
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  addToCartText: {
    color: "white",
    fontFamily: Fonts.MEDIUM,
    fontSize: 12,
  },
  noProducts: {
    alignItems: "center",
    padding: 40,
  },
  noProductsText: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: "#666",
    textAlign: "center",
  },
});