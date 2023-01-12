import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { Ionicons } from "@expo/vector-icons";

export default () => {
    return(<View style = {styles.container}></View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    icon: {
        padding: 5,
        fontsize: 32,
        color: "white",
    }});