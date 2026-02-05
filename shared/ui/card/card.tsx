import { Fonts } from "@/shared";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface CardProps {
  images: string[];
  name: string;
  price: number;
}

const Card = ({ images, name, price }: CardProps) => {
  return (
    <View>
      <Image source={{ uri: images[1] }} style={{ width: 252, height: 252 }} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>Rs. {price}</Text>
    </View>
  );
};

export { Card };

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
    margin: 8,
    fontFamily: Fonts.BOLD,
  },
  price: {
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: -4,
    fontFamily: Fonts.EXTRA_BOLD,
  },
});
