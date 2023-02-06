import React, {useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from "@expo/vector-icons";

const ListButton = ({title, color, onPress, onDelete, onOptions}) => {
    return (
        <TouchableOpacity
            style={[styles.itemContainer, {backgroundColor : color}]}
            onPress = {onPress}>
            <View> 
                <Text style = { styles.itemTitle }> {title} </Text>
            </View>
            <View style = {{flexDirection:"row"}}>
                <TouchableOpacity onPress = {onOptions}>
                    <Ionicons name = "options-outline" size ={24} color = "white"/>
                </TouchableOpacity>
                <TouchableOpacity onPress = {onDelete}>
                    <Ionicons name = "trash-outline" size ={24} color = "white"/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const renderAddListIcon = (navigation, addItemToLists) => {
    return(
        <TouchableOpacity onPress= { () => navigation.navigate("Edit", {saveChanges: addItemToLists})}>
            <Text style ={styles.icon}> + </Text>
        </TouchableOpacity>
    )
}

//same as passing props and calling props.navigation (destructuring)
export default ({navigation}) => {
    const[listData, setLists] = useState( [        
        {title: "School", color: Colors.red}, 
        {title: "Work", color: Colors.green}, 
        {title: "Activities", color: Colors.blue}
    ]);

    const addItemToLists = (item) => {
        listData.push(item);
        setLists([...listData]);
    }

    const removeItemFromLists = (index) =>{
        listData.splice(index, 1);
        setLists([...listData]);
    }

    const updateItemFromLists = (index, item) => {
        listData[index] = item;
        setLists([...listData]);
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => renderAddListIcon(navigation, addItemToLists)
        })
    })


    return (
    <View style={styles.container}>
        <FlatList 
            data={listData}
            renderItem={({item: {title, color}, index}) =>{
                return(
                    <ListButton 
                        title= {title} 
                        color = {color} 
                        navigation = {navigation}
                        onPress = {() => navigation.navigate("My ToDo List", {title, color})}
                        onDelete = {() => removeItemFromLists(index)}
                        onOptions = {() => navigation.navigate("Edit", {title, color, saveChanges: (item) => updateItemFromLists(index, item)})}/>
                );
            }}
        />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    itemTitle: { fontSize: 24, padding: 5, color: "white" },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 100,
        flex: 1,
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
    },
    icon: {
        padding: 5,
        fontSize: 24,
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});