// components/BusinessList.js
import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const businesses = [
    { id: "1", name: "H&M", location: "Pune", category: "Fashion", logo: require("../assets/jpg/hm.png") },
    { id: "2", name: "Starbucks", location: "Mumbai", category: "Cafe", logo: require("../assets/jpg/starbucks.png") },
    { id: "3", name: "Esso", location: "New Delhi", category: "Fuel", logo: require("../assets/jpg/esso.png") },
    { id: "4", name: "Ikea", location: "Pune", category: "Furniture", logo: require("../assets/jpg/ikea.png") },
    { id: "5", name: "Lidl", location: "Mumbai", category: "Supermarket", logo: require("../assets/jpg/lidl.png") },
    { id: "6", name: "Netflix", location: "New Delhi", category: "Entertainment", logo: require("../assets/jpg/netflix.png") },
];

export default function BusinessList({ navigation }) {
    const [search, setSearch] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const clearFilters = () => {
        setSearch("");
        setSelectedLocation("");
        setSelectedCategory("");
    };

    const filteredBusinesses = businesses.filter((b) => {
        return (
            b.name.toLowerCase().includes(search.toLowerCase()) &&
            (selectedLocation ? b.location === selectedLocation : true) &&
            (selectedCategory ? b.category === selectedCategory : true)
        );
    });

    return (
        <View style={styles.container}>
            {/* Combined Filter Bar */}
            <View style={styles.filterBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search business..."
                    value={search}
                    onChangeText={setSearch}
                />

                <Picker
                    selectedValue={selectedLocation}
                    style={styles.picker}
                    onValueChange={(value) => setSelectedLocation(value)}
                >
                    <Picker.Item label="All Locations" value="" />
                    <Picker.Item label="Pune" value="Pune" />
                    <Picker.Item label="Mumbai" value="Mumbai" />
                    <Picker.Item label="New Delhi" value="New Delhi" />
                </Picker>

                <Picker
                    selectedValue={selectedCategory}
                    style={styles.picker}
                    onValueChange={(value) => setSelectedCategory(value)}
                >
                    <Picker.Item label="All Categories" value="" />
                    <Picker.Item label="Fashion" value="Fashion" />
                    <Picker.Item label="Cafe" value="Cafe" />
                    <Picker.Item label="Fuel" value="Fuel" />
                    <Picker.Item label="Furniture" value="Furniture" />
                    <Picker.Item label="Supermarket" value="Supermarket" />
                    <Picker.Item label="Entertainment" value="Entertainment" />
                </Picker>

                {/* Custom Clear Filters Button */}
                <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                    <Text style={styles.clearButtonText}>Clear Filters</Text>
                </TouchableOpacity>
            </View>

            {/* Business List */}
            <FlatList
                data={filteredBusinesses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate("Welcome", { business: item })}
                    >
                        <Image source={item.logo} style={styles.logo} />
                        <View>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.details}>
                                {item.location} • {item.category}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 10 },
    filterBar: { marginBottom: 10 },
    searchInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 8,
        marginBottom: 5,
    },
    picker: { height: 50, marginBottom: 5 },
    clearButton: {
        backgroundColor: "#ff6b6b",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 5,
    },
    clearButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        marginVertical: 6,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        elevation: 2,
    },
    logo: { width: 50, height: 50, borderRadius: 8, marginRight: 12 },
    name: { fontSize: 18, fontWeight: "bold" },
    details: { fontSize: 14, color: "#555" },
});
