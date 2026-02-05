import { Colors, Fonts, useFonts } from "@/shared";
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, SafeAreaView, Animated, TouchableOpacity } from "react-native";
import { useEffect, useRef } from "react";
import { router } from "expo-router";

const { width, height } = Dimensions.get('window');

export default function About() {
  useFonts();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.contactInfo}>📞 +91-78789-39493 | ✉️ info@royalrajasthan.com</Text>
        </View>
        <View style={styles.navbar}>
          <View style={styles.logo}>
            <Text style={styles.logoTitle}>Royal Rajasthan</Text>
            <Text style={styles.logoSubtitle}>Collection</Text>
          </View>
          <View style={styles.navMenu}>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={styles.navLink}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/collections')}>
              <Text style={styles.navLink}>Collections</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/products')}>
              <Text style={styles.navLink}>Products</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/about')}>
              <Text style={[styles.navLink, styles.activeLink]}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/contact')}>
              <Text style={styles.navLink}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1609619385002-f40bc7e1b53e?w=800" }} 
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Animated.Text style={[styles.heroTitle, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              Our Story
            </Animated.Text>
            <Animated.Text style={[styles.heroSubtitle, { opacity: fadeAnim }]}>
              Celebrating Rajasthani Heritage Since 2010
            </Animated.Text>
          </View>
        </View>

        {/* Story Section */}
        <View style={styles.storySection}>
          <Text style={styles.sectionTitle}>The Royal Journey</Text>
          <Text style={styles.storyText}>
            Royal Rajasthan Collection was born from a passion to preserve and celebrate the rich textile heritage of Rajasthan. 
            Founded in 2010, we began our journey in the heart of Jaipur, working closely with local artisans who have been 
            perfecting their craft for generations.
          </Text>
          <Text style={styles.storyText}>
            Each piece in our collection tells a story of tradition, craftsmanship, and timeless elegance. We believe in 
            sustainable fashion that honors our cultural roots while embracing contemporary designs.
          </Text>
        </View>

        {/* Values Grid */}
        <View style={styles.valuesSection}>
          <Text style={styles.sectionTitle}>Our Values</Text>
          <View style={styles.valuesGrid}>
            <View style={styles.valueCard}>
              <Text style={styles.valueIcon}>🎨</Text>
              <Text style={styles.valueTitle}>Authentic Craftsmanship</Text>
              <Text style={styles.valueText}>Every piece handcrafted by skilled artisans</Text>
            </View>
            <View style={styles.valueCard}>
              <Text style={styles.valueIcon}>🌿</Text>
              <Text style={styles.valueTitle}>Sustainable Fashion</Text>
              <Text style={styles.valueText}>Eco-friendly materials and ethical practices</Text>
            </View>
            <View style={styles.valueCard}>
              <Text style={styles.valueIcon}>👑</Text>
              <Text style={styles.valueTitle}>Premium Quality</Text>
              <Text style={styles.valueText}>Finest fabrics and attention to detail</Text>
            </View>
            <View style={styles.valueCard}>
              <Text style={styles.valueIcon}>❤️</Text>
              <Text style={styles.valueTitle}>Customer First</Text>
              <Text style={styles.valueText}>Dedicated to your satisfaction</Text>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>13+</Text>
            <Text style={styles.statLabel}>Years Experience</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5000+</Text>
            <Text style={styles.statLabel}>Happy Customers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>200+</Text>
            <Text style={styles.statLabel}>Artisan Partners</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Authentic Products</Text>
          </View>
        </View>

        {/* Team Section */}
        <View style={styles.teamSection}>
          <Text style={styles.sectionTitle}>Meet Our Artisans</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.teamScroll}>
            <View style={styles.teamCard}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" }} style={styles.teamImage} />
              <Text style={styles.teamName}>Rajesh Kumar</Text>
              <Text style={styles.teamRole}>Master Embroiderer</Text>
            </View>
            <View style={styles.teamCard}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300" }} style={styles.teamImage} />
              <Text style={styles.teamName}>Priya Sharma</Text>
              <Text style={styles.teamRole}>Textile Designer</Text>
            </View>
            <View style={styles.teamCard}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300" }} style={styles.teamImage} />
              <Text style={styles.teamName}>Anil Verma</Text>
              <Text style={styles.teamRole}>Block Print Expert</Text>
            </View>
          </ScrollView>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Experience Royal Elegance</Text>
          <Text style={styles.ctaText}>Discover our exclusive collection of handcrafted traditional wear</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/collections')}>
            <Text style={styles.ctaButtonText}>Explore Collections</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Royal Rajasthan Collection</Text>
          <Text style={styles.footerText}>Preserving heritage through authentic craftsmanship and timeless designs.</Text>
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
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTop: {
    backgroundColor: "#8B4513",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  contactInfo: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    fontFamily: Fonts.REGULAR,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  logo: {
    alignItems: "flex-start",
  },
  logoTitle: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    color: "#8B4513",
  },
  logoSubtitle: {
    fontSize: 12,
    color: Colors.SECONDARY,
    fontFamily: Fonts.REGULAR,
  },
  navMenu: {
    flexDirection: "row",
    gap: 24,
  },
  navLink: {
    fontSize: 15,
    fontFamily: Fonts.MEDIUM,
    color: "#8B4513",
  },
  activeLink: {
    color: "#FFD700",
    fontFamily: Fonts.BOLD,
  },
  heroBanner: {
    height: height * 0.4,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(139, 69, 19, 0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 48,
    fontFamily: Fonts.BOLD,
    color: "#FFD700",
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 18,
    fontFamily: Fonts.REGULAR,
    color: "#F5F5DC",
  },
  storySection: {
    padding: 40,
    backgroundColor: "white",
  },
  sectionTitle: {
    fontSize: 32,
    fontFamily: Fonts.BOLD,
    color: "#8B4513",
    marginBottom: 24,
    textAlign: "center",
  },
  storyText: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: "#666",
    lineHeight: 28,
    marginBottom: 20,
    textAlign: "center",
  },
  valuesSection: {
    padding: 40,
    backgroundColor: "#F5F5DC",
  },
  valuesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "space-between",
  },
  valueCard: {
    width: (width - 100) / 2,
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  valueIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  valueTitle: {
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: "#8B4513",
    marginBottom: 8,
    textAlign: "center",
  },
  valueText: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: "#666",
    textAlign: "center",
  },
  statsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 40,
    backgroundColor: "#8B4513",
    justifyContent: "space-around",
  },
  statBox: {
    alignItems: "center",
    minWidth: (width - 100) / 2,
    marginBottom: 20,
  },
  statNumber: {
    fontSize: 48,
    fontFamily: Fonts.BOLD,
    color: "#FFD700",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: "white",
  },
  teamSection: {
    padding: 40,
    backgroundColor: "white",
  },
  teamScroll: {
    marginTop: 20,
  },
  teamCard: {
    width: 200,
    marginRight: 20,
    alignItems: "center",
  },
  teamImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: "#FFD700",
  },
  teamName: {
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: "#8B4513",
    marginBottom: 4,
  },
  teamRole: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: "#666",
  },
  ctaSection: {
    padding: 60,
    backgroundColor: "#F5F5DC",
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 36,
    fontFamily: Fonts.BOLD,
    color: "#8B4513",
    marginBottom: 16,
    textAlign: "center",
  },
  ctaText: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: "#666",
    marginBottom: 32,
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  ctaButtonText: {
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: "#8B4513",
  },
  footer: {
    backgroundColor: "#2C2C2C",
    padding: 24,
    alignItems: "center",
  },
  footerTitle: {
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: "#FFD700",
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
  },
});
