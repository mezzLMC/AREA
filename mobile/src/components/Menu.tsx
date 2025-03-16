import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import CreateServices from '../services/CreateServices';

const styles = StyleSheet.create({
    container: {
        width: "93%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#16161A",
        borderRadius: 20,
        alignSelf: "center",
        shadowColor: "#CFCFFC",
        shadowOffset: { width: -1, height: -1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    menuItem: {
        flex: 1,
        alignItems: "center",
    },
    addButton: {
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#EDB9FF",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#EDB9FF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    addButtonText: {
        fontSize: 30,
        color: "black",
        top: -1,
    },
});

interface Props {
    activePage: string;
    navigation: NavigationProp<ParamListBase>;
}

export const MenuBar: React.FC<Props> = ({ activePage, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleCreatingServices = () => {
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Home")}
                testID="home-button"
            >
                <FontAwesome name="home" size={28} color={activePage === "home" ? "white" : "#C1C1CD"} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Library")}
                testID="library-button"
            >
                <FontAwesome name="th-large" size={28} color={activePage === "lib" ? "white" : "#C1C1CD"} />
            </TouchableOpacity>
            <View style={[{ width: 20 }]} />
            <TouchableOpacity
                style={styles.addButton}
                onPress={handleCreatingServices}
                testID="add-button"
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <View style={[{ width: 20 }]} />
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Settings")}
                testID="settings-button"
            >
                <FontAwesome name="cog" size={28} color={activePage === "settings" ? "white" : "#C1C1CD"} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Profile")}
                testID="user-button"
            >
                <FontAwesome name="user" size={28} color={activePage === "user" ? "white" : "#C1C1CD"} />
            </TouchableOpacity>
            <CreateServices modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </View>
    );
};

export default MenuBar;
