import React, {useState, useLayoutEffect} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from "@expo/vector-icons";
import ToDoItem from '../components/ToDoItem';

const renderAddListIcon = (addItem) => {
    return(
        <TouchableOpacity onPress= { () => addItem({text: "", isChecked: false, isNewItem: true})}>
            <Text style ={styles.icon}> + </Text>
        </TouchableOpacity>
    )
}


export default ({navigation}) => {
    const [toDoItems, setToDoItems] = useState([{text: "", isChecked: false}])
    
    const addItemToLists = (item) => {
        toDoItems.push(item);
        setToDoItems([...toDoItems])
    }

    const removeItemFromLists = (index) =>{
        toDoItems.splice(index, 1);
        setToDoItems([...toDoItems])
    }

    const updateItem = (index, item) => {
        toDoItems[index] = item;
        setToDoItems([...toDoItems])
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => renderAddListIcon(addItemToLists)
        })
    })

    return(
    <View style = {styles.container}>
        <FlatList 
        data={toDoItems} 
        renderItem ={({item: {text, isChecked, isNewItem}, index}) => {
            return <ToDoItem 
            text ={text} 
            isChecked = {isChecked} 
            isNewItem ={isNewItem}
            onChecked={() => {
                const toDoItem = toDoItems[index];
                toDoItem.isChecked = !isChecked;
                updateItem(index, toDoItem);
            }}
            onChangeText ={(text2) => {
                const toDoItem = toDoItems[index];
                toDoItem.text = text2;
                updateItem(index, toDoItem);
            }}
            onDelete={() => {
                removeItemFromLists(index);
            }}
            />
        }}
        />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    icon: {
        padding: 5,
        fontsize: 32,
        color: "white",
    }});