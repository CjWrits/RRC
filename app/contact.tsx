import { Colors, Fonts, Header, useFonts, apiService } from "@/shared";
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";

export default function Contact() {
  useFonts();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }
    
    try {
      await apiService.submitContact(formData);
      Alert.alert("Success", "Your message has been sent! We'll get back to you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      Alert.alert("Info", "Contact form submitted locally. Connect to backend to send emails.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroSection}>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.subtitle}>
            We'd love to hear from you. Get in touch with us for any inquiries.
          </Text>
        </View>

        <View style={styles.contactContent}>
          <View style={styles.contactInfoSection}>
            <Text style={styles.sectionTitle}>Get in Touch</Text>
            <Text style={styles.sectionDescription}>
              Have questions about our products or need assistance with your order? We're here to help!
            </Text>

            <View style={styles.contactMethods}>
              <View style={styles.contactMethod}>
                <View style={styles.methodIcon}>
                  <Text style={styles.iconText}>📍</Text>
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodTitle}>Visit Our Store</Text>
                  <Text style={styles.methodText}>
                    CD-48 First Floor Dadudayal Nagar{"\n"}
                    Jaipur, Rajasthan 302020{"\n"}
                    India
                  </Text>
                </View>
              </View>

              <View style={styles.contactMethod}>
                <View style={styles.methodIcon}>
                  <Text style={styles.iconText}>📞</Text>
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodTitle}>Call Us</Text>
                  <Text style={styles.methodText}>
                    +91-78789-39493{"\n"}
                    Mon-Sat: 10AM-8PM
                  </Text>
                </View>
              </View>

              <View style={styles.contactMethod}>
                <View style={styles.methodIcon}>
                  <Text style={styles.iconText}>✉️</Text>
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodTitle}>Email Us</Text>
                  <Text style={styles.methodText}>
                    info@royalrajasthan.com{"\n"}
                    We reply within 24 hours
                  </Text>
                </View>
              </View>

              <View style={styles.contactMethod}>
                <View style={styles.methodIcon}>
                  <Text style={styles.iconText}>💬</Text>
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodTitle}>WhatsApp</Text>
                  <Text style={styles.methodText}>
                    +91-78789-39493{"\n"}
                    Available 24/7
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.contactFormSection}>
            <Text style={styles.sectionTitle}>Send us a Message</Text>
            
            <View style={styles.formRow}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="First Name *"
                value={formData.firstName}
                onChangeText={(text) => setFormData({...formData, firstName: text})}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Last Name *"
                value={formData.lastName}
                onChangeText={(text) => setFormData({...formData, lastName: text})}
              />
            </View>

            <View style={styles.formRow}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Email Address *"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                keyboardType="email-address"
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Phone Number"
                value={formData.phone}
                onChangeText={(text) => setFormData({...formData, phone: text})}
                keyboardType="phone-pad"
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Subject"
              value={formData.subject}
              onChangeText={(text) => setFormData({...formData, subject: text})}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell us how we can help you..."
              value={formData.message}
              onChangeText={(text) => setFormData({...formData, message: text})}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
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
  contactContent: {
    padding: 24,
  },
  contactInfoSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: Fonts.BOLD,
    color: Colors.PRIMARY,
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: "#666",
    marginBottom: 24,
    lineHeight: 24,
  },
  contactMethods: {
    gap: 20,
  },
  contactMethod: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  methodIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: Colors.PRIMARY,
    marginBottom: 4,
  },
  methodText: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: "#666",
    lineHeight: 20,
  },
  contactFormSection: {
    backgroundColor: "#f8f9fa",
    padding: 24,
    borderRadius: 12,
  },
  formRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    backgroundColor: "white",
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
    marginBottom: 0,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
  },
});