import { Colors } from "@/shared/enums";
import { Search } from "lucide-react-native";
import React, { useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";

const SearchBar = () => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.searchBar, focused && styles.searchBarFocused]}>
      <Search color={focused ? Colors.PRIMARY : Colors.PLACEHOLDER} size={18} />

      <TextInput
        placeholder="Search for products or more"
        style={styles.input}
        placeholderTextColor={Colors.PLACEHOLDER}
        selectionHandleColor={"transparent"}
        selectionColor={"red"}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

export { SearchBar };

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "transparent",
    width: 480,
    marginLeft: "auto",
  },

  searchBarFocused: {
    borderColor: Colors.PRIMARY,
    backgroundColor: "#ffffff",
  },

  input: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
    color: "#111827",
    ...Platform.select({
      web: {
        outlineStyle: "none",
      },
    }),
  },
});
