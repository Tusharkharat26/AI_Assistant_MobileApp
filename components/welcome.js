
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function Welcome({ route, navigation }) {
    const { business } = route.params || {};

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/jpg/aria-logo.jpeg")}
                style={styles.logo}
            />
            <Text style={styles.title}>{business?.name || "Anthill Funds"}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Chat")}
            >
                <Text style={styles.buttonText}>Start Talking!</Text>
            </TouchableOpacity>
            <Text style={styles.footer}>Powered by Ariai</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 40,
    },
    button: {
        backgroundColor: "#00aaff",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    footer: {
        marginTop: 40,
        fontSize: 12,
        color: "#999",
    },
});
