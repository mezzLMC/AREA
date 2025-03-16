import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import imageMapHist from "src/components/ImageHistory";
import useApi from "src/hooks/useApi";
import useAccessToken from "src/hooks/useAccessToken";
import { HistoryArea } from "@shared/Api";
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
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -45,
    marginTop: 105,
    right: 130,
  },
  comment: {
    color: "#C7C7C7",
    fontSize: 16,
    fontWeight: "500",
    marginRight: 5,
  },
  buttonContainer: {
    width: "90%",
    top: 70,
    alignSelf: "center",
  },
  button: {
    flexBasis: "48%",
    height: 160,
    borderRadius: 20,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
    marginLeft: 6,
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
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 8,
  },
});

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const [buttons, setButtons] = useState<HistoryArea[]>([]);
  const accessToken = useAccessToken();
  const api = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!api || !accessToken) return;
        const { body } = await api.services.getMe(accessToken);
        setButtons(body);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchData();
  }, [api, accessToken]);

  const renderButton = ({ item }: { item: HistoryArea }) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: "#272727" }]}
      testID={`button-${item.id}`}
    >
      <Image  source={imageMapHist[item.action.image]}  style={styles.iconTopLeft}  testID={`icon-${item.id}`} 
      />
      <Text style={styles.buttonText} testID={`text-${item.id}`}>When {item.action.name}, {item.reaction.name}</Text>
      <TouchableOpacity style={styles.iconTopRightContainer} onPress={() => console.log("pressed")} testID={`iconTopRightButton-${item.id}`}>
        <Text style={styles.iconTopRight}>...</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1c1c23" }}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Your AREA&#39;s</Text>

        <View style={styles.commentContainer}>
          <Text style={styles.comment}>History</Text>
          <FontAwesomeIcon icon={faHistory} size={15} color="#C7C7C7" />
        </View>

        <FlatList
          contentContainerStyle={styles.buttonContainer}
          data={buttons}
          renderItem={renderButton}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ListFooterComponent={<View style={{ height: 100 }} />}
        />
      </View>

      <MenuBar activePage="home" navigation={navigation} />
    </SafeAreaView>
  );
};

export default HomeScreen;
