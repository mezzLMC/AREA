import React, { useEffect, useState } from "react";
import useApi from "src/hooks/useApi";
import useAccessToken from "src/hooks/useAccessToken";
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, FlatList } from "react-native";
import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDiscord, faTwitch } from '@fortawesome/free-brands-svg-icons';
import MenuBar from "../components/Menu";
import { RootStackParamList } from "../types";
import Oauth from "./oauth";
import { removeToken } from "../LocalStorage";

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        position: "absolute",
        top: 30,
        color: "#fafafa",
        fontSize: 24,
        fontWeight: "600",
    },
    profileIcon: {
        marginTop: 20,
        marginBottom: 10,
    },
    username: {
        color: "#fafafa",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
    },
    refreshButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#ababc0",
        borderRadius: 10,
    },
    refreshButtonText: {
        color: "#1c1c23",
        fontSize: 16,
        fontWeight: "bold",
    },
    container: {
        bottom: 10,
        alignItems: 'center',
    },
    nameSeparator: {
        borderBottomColor: "#434343",
        borderBottomWidth: 1,
        width: "100%",
        marginVertical: 20,
        bottom: 20,
    },
    email: {
        color: "#ababc0",
        fontSize: 16,
        marginTop: 6,
    },
    connectWithContainer: {
        width: "95%",
        maxHeight: 270,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#434343",
        paddingHorizontal: 20,
        marginTop: 10,
        bottom: -10,
    },
    connectWithTitle: {
        color: "#dedede",
        fontSize: 16,
        fontWeight: "600",
        bottom: 40,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomColor: "#434343",
        borderBottomWidth: 1,
    },
    buttonend: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    buttonText: {
        color: "#fafafa",
        fontSize: 18,
        fontWeight: "500",
        marginLeft: 10,
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginRight: 10,
    },
    disconnectIcon: {
        marginLeft: 20,
    },
    logoutButton: {
        marginTop: 30,
        padding: 10,
        width: "85%",
        backgroundColor: "#ff4d4d",
        borderRadius: 10,
    },
    logoutButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

type Props = CompositeScreenProps<BottomTabScreenProps<RootStackParamList, 'Settings'>, NativeStackScreenProps<RootStackParamList>>;

const oauthServices = [
    { id: "spotify", name: "Spotify", color: "#1DB954", icon: <MaterialCommunityIcons name="spotify" size={30} color="#ffffff" /> },
    { id: "google", name: "Google", color: "#DB4437", icon: <FontAwesome name="google" size={30} color="#ffffff" /> },
    { id: "discord", name: "Discord", color: "#7289DA", icon: <FontAwesomeIcon icon={faDiscord} size={30} color="#ffffff" /> },
    { id: "github", name: "GitHub", color: "#333333", icon: <FontAwesome name="github" size={30} color="#ffffff" /> },
    { id: "microsoft", name: "Microsoft", color: "#0078D4", icon: <FontAwesome name="windows" size={30} color="#ffffff" /> },
    { id: "twitch", name: "Twitch", color: "#9046ff", icon: <FontAwesomeIcon icon={faTwitch} size={30} color="#ffffff" /> },
];

const SettingsPage = ({ navigation }: Props) => {
    const api = useApi();
    const accessToken = useAccessToken();
    const nav = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<{ username: string; email?: string | null, Oauth?: { [key: string]: string | null } } | null>(null);
    const [showOauthModal, setShowOauthModal] = useState<boolean>(false);
    const [oauthServiceId, setOauthServiceId] = useState<string | null>(null);
    const [oauthRedirectUri, setOauthRedirectUri] = useState<string | null>(null);
    const [connectedServices, setConnectedServices] = useState<{ [key: string]: string | boolean }>({});

    const fetchUserData = async () => {
        setLoading(true);
        try {
            if (!api || !accessToken) return;
            const { body } = await api.users.getMe(accessToken);
            setUserData(body);
            if (body.Oauth) {
                setConnectedServices({
                    spotify: body.Oauth.spotify || false,
                    google: body.Oauth.google || false,
                    discord: body.Oauth.discord || false,
                    twitch: body.Oauth.twitch || false,
                    github: body.Oauth.github || false,
                    microsoft: body.Oauth.microsoft || false,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (api && accessToken) {
            fetchUserData();
        }
    }, [api, accessToken]);

    const handleLogout = async () => {
        await removeToken();
        navigation.replace("Connection");
    };

    const handleOAuthLogin = (serviceId: string) => {
        setOauthServiceId(serviceId);
        const redirectUri = "http://localhost:8080/";
        setOauthRedirectUri(redirectUri);
        setShowOauthModal(true);
    };

    const handleDisconnect = async (serviceId: string) => {
        if (api && accessToken) {
            await api.oauth.disconnect(serviceId, accessToken);
            fetchUserData();
        }
    };

    const renderButtonText = (serviceId: string) => {
        if (connectedServices[serviceId]) {
            const connectionText = connectedServices[serviceId] === true
                ? "Connected"
                : `Connected as ${connectedServices[serviceId]}`;
            return connectionText.length > 25 ? `${connectionText.slice(0, 25)}...` : connectionText;
        }
        const defaultText = `${serviceId.charAt(0).toUpperCase() + serviceId.slice(1)} is not linked`;
        return defaultText.length > 25 ? `${defaultText.slice(0, 25)}...` : defaultText;
    };

    const renderOauthService = ({ item }: { item: { id: string; name: string; color: string; icon: JSX.Element } }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity
                style={item.id === "twitch" ? styles.buttonend : styles.button}
                disabled={!!connectedServices[item.id]}
                onPress={() => handleOAuthLogin(item.id)}
                testID={`oauth-button-${item.id}`}
            >
                <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                    {item.icon}
                </View>
                <Text style={styles.buttonText} testID={`button-text-${item.id}`}>{renderButtonText(item.id)}</Text>
            </TouchableOpacity>
            {connectedServices[item.id] && (
                <TouchableOpacity onPress={() => handleDisconnect(item.id)} testID={`disconnect-button-${item.id}`}>
                    <MaterialCommunityIcons
                        name="window-close"
                        size={30}
                        color="red"
                        style={styles.disconnectIcon}
                    />
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: "#1c1c23" }]}>
            <View style={styles.innerContainer}>
                <Text style={styles.title} testID="settings-title">App Settings</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#ababc0" testID="loading-indicator" />
                ) : (
                    userData && (
                        <>
                            <View style={styles.container} testID="user-container">
                                <FontAwesome name="user-circle" size={70} color="#ababc0" style={styles.profileIcon} />
                                <Text style={styles.username} testID="username">{userData.username}</Text>
                                {userData.email ? (
                                    <Text style={styles.email} testID="user-email">{userData.email}</Text>
                                ) : null}
                            </View>
                            <View style={styles.nameSeparator} />
                            <View style={styles.connectWithContainer} testID="connect-with-container">
                                <Text style={styles.connectWithTitle}>Linked accounts:</Text>
                                <FlatList
                                    data={oauthServices}
                                    renderItem={renderOauthService}
                                    keyExtractor={item => item.id}
                                    windowSize={5}
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    testID="oauth-list"
                                />
                            </View>
                                <TouchableOpacity
                                    style={styles.logoutButton}
                                    onPress={() => handleLogout()}
                                >
                                    <Text style={styles.logoutButtonText}>Logout</Text>
                                </TouchableOpacity>
                        </>
                    )
                )}
            </View>

            {showOauthModal && oauthServiceId && oauthRedirectUri && (
                <Oauth
                    showWebView={showOauthModal}
                    onClose={() => {
                        setShowOauthModal(false);
                        fetchUserData();
                    }}
                    serviceId={oauthServiceId}
                />
            )}

            <MenuBar activePage="settings" navigation={navigation} />
        </SafeAreaView>
    );
};

export default SettingsPage;
