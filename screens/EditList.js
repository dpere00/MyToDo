import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import { CommonActions } from '@react-navigation/native';
import ColorSelector from '../components/ColorSelector';

const colorList = [
    "blue",
    "teal",
    "green",
    "olive",
    "yellow",
    "orange",
    "red",
    "pink",
    "purple",
    "blueGray",
];

export default ({navigation, route}) => {
    const [title, setTitle] = useState(route.params.title || "");
    const [color, setColor] = useState(route.params.color || Colors.blue );
    const [isValid, setValidity] = useState(true);
    return(
        <View style = {styles.container}>
            <View>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.label}>List Name</Text>
                    {!isValid && <Text style ={{color: Colors.red, fontSize: 12, marginLeft: 6}}> * Please enter a List Name</Text>}
                </View>
                <TextInput 
                autoFocus ={true}
                value={title}
                selectionColor={"transparent"}
                onChangeText={(text) => {
                    setTitle(text);
                    setValidity(true);
                }}
                placeholder={"New List Name"}
                maxLength={30}
                style={[styles.input, { outline: "none"}]}
                />
                <Text style={styles.label}>Select list color</Text>
                <ColorSelector 
                    onSelect={(color)=> {
                        setColor(color);
                        navigation.dispatch(CommonActions.setParams({color}))
                    }}
                    selectedColor={color}
                    colorOptions ={colorList}
                />
            </View>
            <TouchableOpacity style ={styles.saveButton} onPress={() => {
                if (title.length > 1) { 
                    route.params.saveChanges({title, color});
                    navigation.dispatch(CommonActions.goBack());
                }
                else{
                    setValidity(false);
                }
            }}>
                <Text style ={{color: "white", fontSize: 24, fontWeight: "bold"}}>
                    Save
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 5,
        justifyContent: "space-between",
    },
    input: {
        color: Colors.darkGray,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 0.5,
        marginHorizontal: 5,
        padding: 3,
        height: 30,
        fontSize: 16,
    },
    saveButton: {
        borderRadius: 25,
        backgroundColor: Colors.darkGray,
        height: 48,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        color: Colors.black, 
        fontWeight: "bold", 
        fontSize: 16, 
        marginVertical: 8, 
        marginLeft: 8
    },
});