import { Colors, Fonts, useFonts, AnimatedButton } from "@/shared";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, SafeAreaView, Animated } from "react-native";
import { useState, useEffect, useRef } from "react";
import { router } from "expo-router";

const { width, height } = Dimensions.get('window');

export default function Home() {
  useFonts();
  const [showGreeting, setShowGreeting] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const greeting1 = useRef(new Animated.Value(0)).current;
  const greeting2 = useRef(new Animated.Value(0)).current;
  const greeting3 = useRef(new Animated.Value(0)).current;
  const greeting4 = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const leftBoxAnim = useRef(new Animated.Value(0)).current;
  const rightBoxAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Continuous pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 2000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    ).start();

    // Quick staggered greeting animations
    Animated.sequence([
      Animated.timing(greeting1, { toValue: 1, duration: 300, delay: 200, useNativeDriver: true }),
      Animated.timing(greeting2, { toValue: 1, duration: 300, delay: 200, useNativeDriver: true }),
      Animated.timing(greeting3, { toValue: 1, duration: 300, delay: 200, useNativeDriver: true }),
      Animated.timing(greeting4, { toValue: 1, duration: 300, delay: 200, useNativeDriver: true }),
    ]).start();

    // Title scale animation at 0.5s
    setTimeout(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }, 500);

    // Subtitle fade at 0.8s
    setTimeout(() => {
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 800);

    // Progress bar at 1s
    setTimeout(() => {
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }).start();
    }, 1000);

    // Fade out at 2s
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setShowGreeting(false);
        // Animate boxes on main page
        Animated.parallel([
          Animated.spring(leftBoxAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
          Animated.spring(rightBoxAnim, { toValue: 1, tension: 50, friction: 7, delay: 200, useNativeDriver: true }),
        ]).start();
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (showGreeting) {
    const progressWidth = progressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    return (
      <View style={styles.loadingOverlay}>
        <Image 
          source={{ uri: "https://imgs.search.brave.com/S6nvD8i-htdQrrBHP_Yt0U6NpSNqfrmGWQhoNMFKMnI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJiYXQuY29t/L2ltZy82NzA1ODEt/aW5kaWFuLW1hcC13/YWxscGFwZXItdG9w/LWZyZWUtaW5kaWFu/LW1hcC1iYWNrZ3Jv/dW5kLmpwZw" }}
          style={styles.mapBackground}
        />
        <View style={styles.loadingOverlayContent}>
          {/* Greetings Container - Top 20% */}
          <View style={styles.greetingsContainer}>
            <Animated.Text style={[styles.greetingText, { opacity: greeting1 }]}>مرحبا بكم</Animated.Text>
            <Animated.Text style={[styles.greetingText, { opacity: greeting2 }]}>નમસ્તે</Animated.Text>
            <Animated.Text style={[styles.greetingText, { opacity: greeting3 }]}>নমস্কাৰ</Animated.Text>
            <Animated.Text style={[styles.greetingText, { opacity: greeting4 }]}>नमस्ते</Animated.Text>
          </View>
          
          {/* Center Content */}
          <Animated.View style={[styles.centerContent, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.mainTitle}>Royal Rajasthan Collection</Text>
            <Animated.Text style={[styles.subtitle, { opacity: subtitleAnim }]}>Authentic Traditional Wear</Animated.Text>
            <View style={styles.progressContainer}>
              <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }

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
              <Text style={styles.navLink}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/contact')}>
              <Text style={styles.navLink}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Animated.Image 
            source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg" }} 
            style={[
              styles.heroImage,
              {
                transform: [{
                  translateY: scrollY.interpolate({
                    inputRange: [0, 400],
                    outputRange: [0, -100],
                    extrapolate: 'clamp',
                  })
                }]
              }
            ]}
          />
          <View style={styles.heroOverlay}>
            {/* Left Features */}
            <Animated.View style={[
              styles.leftFeatures,
              {
                opacity: leftBoxAnim,
                transform: [
                  { translateX: leftBoxAnim.interpolate({ inputRange: [0, 1], outputRange: [-100, 0] }) },
                  { scale: pulseAnim }
                ]
              }
            ]}>
              <Text style={styles.featureText}> 24/7 Customer Support</Text>
              <Text style={styles.featureText}> Prices Starting From ₹499</Text>
              <Text style={styles.featureText}> Huge Traditional Collection</Text>
              <Text style={styles.featureText}> 7 Days Easy Return</Text>
              <Text style={styles.featureText}> Free Delivery Above ₹1000</Text>
            </Animated.View>

            {/* Right Content */}
            <Animated.View style={[
              styles.heroContent,
              {
                opacity: rightBoxAnim,
                transform: [
                  { translateX: rightBoxAnim.interpolate({ inputRange: [0, 1], outputRange: [100, 0] }) },
                  { 
                    scale: scrollY.interpolate({
                      inputRange: [0, 200],
                      outputRange: [1, 0.95],
                      extrapolate: 'clamp',
                    })
                  }
                ]
              }
            ]}>
              <Text style={styles.heroTitle}>Discover Royal Heritage</Text>
              <Text style={styles.heroSubtitle}>
                Exquisite handcrafted Rajasthani clothing that celebrates tradition with contemporary elegance
              </Text>
              <View style={styles.heroButtons}>
                <AnimatedButton 
                  style={styles.primaryButton}
                  onPress={() => router.push('/collections')}
                >
                  <Text style={styles.buttonText}>Shop Collection</Text>
                </AnimatedButton>
                <AnimatedButton 
                  style={styles.secondaryButton}
                  onPress={() => router.push('/about')}
                >
                  <Text style={styles.buttonTextSecondary}>Our Story</Text>
                </AnimatedButton>
              </View>
            </Animated.View>
          </View>
        </View>

        {/* Authentic Products Banner */}
        <Animated.View style={[
          styles.authenticBanner,
          {
            opacity: scrollY.interpolate({
              inputRange: [0, 100, 200],
              outputRange: [0, 0.5, 1],
              extrapolate: 'clamp',
            })
          }
        ]}>
          <Text style={styles.authenticText}>100% Authentic Products</Text>
        </Animated.View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <View style={styles.categoriesGrid}>
            <TouchableOpacity style={styles.categoryCard} onPress={() => router.push('/collections')}>
              <Image source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg" }} style={styles.categoryImage} />
              <View style={styles.categoryOverlay}>
                <Text style={styles.categoryName}>Lehengas</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard} onPress={() => router.push('/collections')}>
              <Image source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg" }} style={styles.categoryImage} />
              <View style={styles.categoryOverlay}>
                <Text style={styles.categoryName}>Sarees</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard} onPress={() => router.push('/collections')}>
              <Image source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg" }} style={styles.categoryImage} />
              <View style={styles.categoryOverlay}>
                <Text style={styles.categoryName}>Kurtas</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard} onPress={() => router.push('/collections')}>
              <Image source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg" }} style={styles.categoryImage} />
              <View style={styles.categoryOverlay}>
                <Text style={styles.categoryName}>Accessories</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Products */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>Featured Collection</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
            <View style={styles.productCard}>
              <Image source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg" }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Royal Silk Lehenga</Text>
                <Text style={styles.productPrice}>₹12,999</Text>
              </View>
            </View>
            <View style={styles.productCard}>
              <Image source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg" }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Designer Saree</Text>
                <Text style={styles.productPrice}>₹8,999</Text>
              </View>
            </View>
            <View style={styles.productCard}>
              <Image source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/070/420/243/small/vibrant-indian-sarees-and-fabrics-displayed-for-sale-free-photo.jpg" }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Bridal Lehenga</Text>
                <Text style={styles.productPrice}>₹25,999</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Why Choose Us */}
        <View style={styles.whySection}>
          <Text style={styles.sectionTitle}>Our Commitment to Excellence</Text>
          <View style={styles.whyGrid}>
            <View style={styles.whyCard}>
              <View style={styles.whyIconBox}>
                <Text style={styles.whyNumber}>01</Text>
              </View>
              <Text style={styles.whyTitle}>Authentic Craftsmanship</Text>
              <Text style={styles.whyText}>Every piece is meticulously handcrafted by master artisans with decades of experience in traditional Rajasthani textile arts.</Text>
            </View>
            <View style={styles.whyCard}>
              <View style={styles.whyIconBox}>
                <Text style={styles.whyNumber}>02</Text>
              </View>
              <Text style={styles.whyTitle}>Premium Quality Materials</Text>
              <Text style={styles.whyText}>We source only the finest fabrics and materials, ensuring durability, comfort, and timeless elegance in every garment.</Text>
            </View>
            <View style={styles.whyCard}>
              <View style={styles.whyIconBox}>
                <Text style={styles.whyNumber}>03</Text>
              </View>
              <Text style={styles.whyTitle}>Nationwide Delivery</Text>
              <Text style={styles.whyText}>Fast and secure shipping across India with real-time tracking and careful packaging to preserve garment quality.</Text>
            </View>
            <View style={styles.whyCard}>
              <View style={styles.whyIconBox}>
                <Text style={styles.whyNumber}>04</Text>
              </View>
              <Text style={styles.whyTitle}>Customer Satisfaction</Text>
              <Text style={styles.whyText}>Hassle-free 7-day return policy and dedicated customer support to ensure your complete satisfaction with every purchase.</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            {/* Left - Logo */}
            <View style={styles.footerLeft}>
              <Text style={styles.footerLogoTitle}>Royal Rajasthan</Text>
              <Text style={styles.footerLogoSubtitle}>Collection</Text>
              <Text style={styles.footerTagline}>Preserving heritage through authentic craftsmanship</Text>
            </View>

            {/* Right - Info Grid */}
            <View style={styles.footerRight}>
              {/* Quick Links */}
              <View style={styles.footerColumn}>
                <Text style={styles.footerColumnTitle}>Quick Links</Text>
                <TouchableOpacity onPress={() => router.push('/')}>
                  <Text style={styles.footerLink}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/collections')}>
                  <Text style={styles.footerLink}>Collections</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/products')}>
                  <Text style={styles.footerLink}>Products</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/about')}>
                  <Text style={styles.footerLink}>About Us</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/contact')}>
                  <Text style={styles.footerLink}>Contact</Text>
                </TouchableOpacity>
              </View>

              {/* Contact Info */}
              <View style={styles.footerColumn}>
                <Text style={styles.footerColumnTitle}>Contact Us</Text>
                <Text style={styles.footerInfo}>📞 +91-78789-39493</Text>
                <Text style={styles.footerInfo}>✉️ info@royalrajasthan.com</Text>>
              </View>

              {/* Address */}
              <View style={styles.footerColumn}>
                <Text style={styles.footerColumnTitle}>Visit Us</Text>
                <Text style={styles.footerInfo}>📍 Royal Rajasthan Collection</Text>
                <Text style={styles.footerInfo}>CD-48 Dadudayal Nagar, Jaipur</Text>
                <Text style={styles.footerInfo}>Rajasthan - 302020</Text>
                <Text style={styles.footerInfo}>India</Text>
              </View>
            </View>
          </View>
          
          {/* Bottom Bar */}
          <View style={styles.footerBottom}>
            <Text style={styles.footerCopyright}>© 2026 Royal Rajasthan Collection. All rights reserved.</Text>
          </View>
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
  // Loading Screen Styles
  loadingOverlay: {
    flex: 1,
    position: "relative",
  },
  mapBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.3,
  },
  loadingOverlayContent: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  greetingsContainer: {
    position: "absolute",
    top: "20%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  greetingText: {
    fontSize: 36,
    color: "#FFD700",
    fontFamily: Fonts.BOLD,
    textShadowColor: "rgba(255, 215, 0, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  centerContent: {
    alignItems: "center",
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -100 }],
  },
  mainTitle: {
    fontSize: 50,
    fontFamily: Fonts.BOLD,
    color: "#FFD700",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: "#F5F5DC",
    textAlign: "center",
    marginBottom: 30,
  },
  progressContainer: {
    width: 300,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FFD700",
    borderRadius: 2,
  },
  // Header Styles
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
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 20,
    paddingHorizontal: 16,
  },
  contactInfo: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
    fontFamily: Fonts.REGULAR,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navMenu: {
    flexDirection: "row",
    gap: 16,
  },
  navLink: {
    fontSize: 20,
    fontFamily: "serif",
    color: "#8B4513",
  },
  logo: {
    alignItems: "flex-start",
  },
  logoTitle: {
    fontSize: 30,
    fontFamily: "serif",
    color: "#8B4513",
  },
  logoSubtitle: {
    fontSize: 15,
    color: Colors.SECONDARY,
    fontFamily: Fonts.REGULAR,
  },
  navIcons: {
    flexDirection: "row",
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  whatsappIcon: {
    fontSize: 24,
  },
  cartIcon: {
    fontSize: 24,
  },
  // Hero Section
  heroSection: {
    height: height * 1.0,
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  leftFeatures: {
    gap: 12,
    maxWidth: "38%",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 24,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#FFD700",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  featureText: {
    fontSize: 15,
    fontFamily: Fonts.MEDIUM,
    color: "#8B4513",
    lineHeight: 24,
  },
  heroContent: {
    alignItems: "flex-end",
    maxWidth: "55%",
    backgroundColor: "rgba(139, 69, 19, 0.9)",
    padding: 32,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#FFD700",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  khammaGreeting: {
    fontSize: 28,
    fontFamily: Fonts.BOLD,
    color: "#FFD700",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontFamily: Fonts.BOLD,
    color: "#FFD700",
    textAlign: "right",
    marginBottom: 16,
    lineHeight: 38,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: "#F5F5DC",
    textAlign: "right",
    marginBottom: 24,
    lineHeight: 24,
  },
  heroButtons: {
    flexDirection: "column",
    gap: 12,
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#FFD700",
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: "#8B4513",
    fontFamily: Fonts.BOLD,
    fontSize: 12,
    textAlign: "center",
  },
  buttonTextSecondary: {
    color: "#FFD700",
    fontFamily: Fonts.BOLD,
    fontSize: 12,
    textAlign: "center",
  },
  // Authentic Banner
  authenticBanner: {
    backgroundColor: "#000",
    paddingVertical: 15,
    alignItems: "center",
  },
  authenticText: {
    color: "white",
    fontSize: 16,
    fontFamily: Fonts.BOLD,
    letterSpacing: 2,
  },
  // Categories Section
  categoriesSection: {
    padding: 20,
    backgroundColor: "#F5F5DC",
  },
  categoriesGrid: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  categoryCard: {
    width: (width - 80) / 4,
    height: (width - 80) / 4,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImage: {
    width: "100%",
    height: "100%",
  },
  categoryOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(139, 69, 19, 0.9)",
    padding: 10,
  },
  categoryName: {
    color: "#FFD700",
    fontFamily: Fonts.BOLD,
    fontSize: 14,
    textAlign: "center",
  },
  // Products Section
  productsSection: {
    padding: 40,
    backgroundColor: "white",
    alignItems: "center",
  },
  productsScroll: {
    marginTop: 20,
    paddingHorizontal: 40,
  },
  productCard: {
    width: 280,
    marginRight: 20,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 320,
  },
  productInfo: {
    padding: 16,
    backgroundColor: "#F5F5DC",
  },
  productName: {
    fontSize: 16,
    fontFamily: Fonts.BOLD,
    color: "#8B4513",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontFamily: Fonts.BOLD,
    color: "#FFD700",
  },
  // Why Section
  whySection: {
    padding: 40,
    backgroundColor: "#F5F5DC",
  },
  whyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    justifyContent: "space-between",
  },
  whyCard: {
    width: (width - 108) / 2,
    backgroundColor: "white",
    padding: 28,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FFD700",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  whyIconBox: {
    width: 60,
    height: 60,
    backgroundColor: "#8B4513",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  whyNumber: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    color: "#FFD700",
  },
  whyTitle: {
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: "#8B4513",
    marginBottom: 12,
  },
  whyText: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: "#666",
    lineHeight: 22,
  },
  // Collections Section
  collectionsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontFamily: Fonts.BOLD,
    color: "#8B4513",
    marginBottom: 16,
    textAlign: "center",
  },
  collectionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  collectionCard: {
    width: (width - 60) / 2,
    height: 150,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  collectionImage: {
    width: "100%",
    height: "100%",
  },
  collectionOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(139, 69, 19, 0.9)",
    padding: 12,
  },
  collectionName: {
    color: "white",
    fontFamily: Fonts.BOLD,
    fontSize: 16,
    textAlign: "center",
  },
  // Stats Section
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  statCard: {
    alignItems: "center",
    backgroundColor: "#F5F5DC",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 70,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: Fonts.BOLD,
    color: "#8B4513",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.TEXT_LIGHT,
  },
  // Footer
  footer: {
    backgroundColor: "#1A1A1A",
    paddingTop: 40,
  },
  footerContent: {
    flexDirection: "row",
    paddingHorizontal: 40,
    paddingBottom: 30,
    gap: 40,
  },
  footerLeft: {
    flex: 1,
  },
  footerLogoTitle: {
    fontSize: 36,
    fontFamily: Fonts.BOLD,
    color: "#FFD700",
    marginBottom: 4,
  },
  footerLogoSubtitle: {
    fontSize: 20,
    fontFamily: Fonts.REGULAR,
    color: "#FFD700",
    marginBottom: 16,
  },
  footerTagline: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 22,
  },
  footerRight: {
    flex: 2,
    flexDirection: "row",
    gap: 30,
  },
  footerColumn: {
    flex: 1,
  },
  footerColumnTitle: {
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: "#FFD700",
    marginBottom: 16,
  },
  footerLink: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 10,
  },
  footerInfo: {
    fontSize: 13,
    fontFamily: Fonts.REGULAR,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 8,
    lineHeight: 20,
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    paddingVertical: 20,
    alignItems: "center",
  },
  footerCopyright: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: "rgba(255,255,255,0.5)",
  },
});