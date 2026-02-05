import { Colors, Fonts, Header, useFonts } from "@/shared";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

interface Collection {
  id: number;
  name: string;
  description: string;
  itemCount: string;
  image: string;
}

const collections: Collection[] = [
  {
    id: 1,
    name: "Bridal Collection",
    description: "Exquisite lehengas and sarees for your special day",
    itemCount: "150+ Items",
    image: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg"
  },
  {
    id: 2,
    name: "Festive Wear",
    description: "Celebrate in style with our festive collection",
    itemCount: "200+ Items",
    image: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg"
  },
  {
    id: 3,
    name: "Casual Wear",
    description: "Comfortable kurtas and everyday ethnic wear",
    itemCount: "120+ Items",
    image: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg"
  },
  {
    id: 4,
    name: "Accessories",
    description: "Complete your look with traditional jewelry",
    itemCount: "80+ Items",
    image: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg"
  }
];

export default function Collections() {
  useFonts();

  const renderCollection = (collection: Collection) => (
    <View key={collection.id} style={styles.collectionCard}>
      <Image source={{ uri: collection.image }} style={styles.collectionImage} />
      <View style={styles.collectionOverlay}>
        <View style={styles.collectionContent}>
          <Text style={styles.collectionName}>{collection.name}</Text>
          <Text style={styles.collectionDescription}>{collection.description}</Text>
          <Text style={styles.itemCount}>{collection.itemCount}</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Collection</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroSection}>
          <Text style={styles.title}>Our Collections</Text>
          <Text style={styles.subtitle}>
            Discover the finest traditional Rajasthani clothing crafted with love and heritage
          </Text>
        </View>

        <View style={styles.collectionsGrid}>
          {collections.map(renderCollection)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  heroSection: {
    backgroundColor: Colors.PRIMARY,
    padding: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.BOLD,
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: "white",
    textAlign: "center",
    lineHeight: 24,
  },
  collectionsGrid: {
    padding: 16,
    gap: 16,
  },
  collectionCard: {
    height: 300,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    position: "relative",
  },
  collectionImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  collectionOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  collectionContent: {
    alignItems: "center",
    padding: 24,
  },
  collectionName: {
    fontSize: 28,
    fontFamily: Fonts.BOLD,
    color: "white",
    marginBottom: 12,
    textAlign: "center",
  },
  collectionDescription: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: "white",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 24,
  },
  itemCount: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: Colors.SECONDARY,
    marginBottom: 20,
  },
  viewButton: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  viewButtonText: {
    color: "white",
    fontFamily: Fonts.MEDIUM,
    fontSize: 16,
  },
});