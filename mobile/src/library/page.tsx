import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import imageMap from "src/components/ImageLoader";
import MenuBar from "../components/Menu";
import type { RootStackParamList } from "../types";

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    position: "absolute",
    top: 50,
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
    top: 50,
    justifyContent: "space-between",
    alignSelf: "center",
  },
  button: {
    flexBasis: "48%",
    height: 160,
    borderRadius: 20,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  iconTopLeft: {
    position: "absolute",
    top: 15,
    left: 15,
    width: 38,
    height: 38,
  },
  iconTopRightContainer: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 120,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  iconTopRight: {
    color: "white",
    fontSize: 16,
    top: -4,
  },
  buttonText: {
    position: "absolute",
    bottom: 20,
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
});

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootStackParamList, "Library">,
  NativeStackScreenProps<RootStackParamList>
>;

const LibraryScreen = ({ navigation }: Props) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: "#1c1c23" }}>
    <View style={styles.innerContainer}>
      <Text style={styles.title}>Library</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#85c1e9" }]}>
          <Image source={imageMap.discord} style={styles.iconTopLeft} />
          <Text style={styles.buttonText}>Send a message to discord server</Text>
          <TouchableOpacity style={styles.iconTopRightContainer} onPress={() => console.log("Ellipsis pressed")}>
            <Text style={styles.iconTopRight}>...</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#272727" }]}>
          <Image source={imageMap.spotify} style={styles.iconTopLeft} />
          <Text style={styles.buttonText}>Send a playlist to discord server</Text>
          <TouchableOpacity style={styles.iconTopRightContainer} onPress={() => console.log("Ellipsis pressed")}>
            <Text style={styles.iconTopRight}>...</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: "#CCCCFF" }]} />
        <TouchableOpacity style={[styles.button, { backgroundColor: "#DE3163" }]} />
        <TouchableOpacity style={[styles.button, { backgroundColor: "#6495ED" }]} />
        <TouchableOpacity style={[styles.button, { backgroundColor: "#9013FE" }]} />
      </View>
    </View>

    <MenuBar activePage="lib" navigation={navigation} />
  </SafeAreaView>
);

export default LibraryScreen;
