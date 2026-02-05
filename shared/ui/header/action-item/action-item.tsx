import { Colors, Fonts } from "@/shared";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const ActionItem = ({ Icon, label }: { Icon: LucideIcon; label: string }) => {
  return (
    <Pressable style={styles.container}>
      <Icon color={Colors.PRIMARY} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export { ActionItem };

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 4,
  },
  label: {
    fontSize: 12,
    color: Colors.PRIMARY,
    fontFamily: Fonts.MEDIUM,
  },
});
