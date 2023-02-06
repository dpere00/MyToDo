import React, {useState} from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from './Checkbox';

const EditableTextButton = ({isChecked, onChangeText, text, isNewItem}) => {
    const[isEditMode, setEditMode] = useState(isNewItem);
    return(
    <TouchableOpacity style = {{flex:1}} onPress ={() => !isChecked && setEditMode(true)}>
        {isEditMode? 
            <TextInput 
                autoFocus ={true}
                value={text}
                selectionColor={"transparent"}
                onChangeText={onChangeText}
                placeholder={"Add new item text"}
                onSubmitEditing={()=>{}}
                maxLength={30}
                style={[styles.input, { outline: "none"}]}
                onBlur={() => setEditMode(false)}
            /> : 
            <Text 
                style= {
                [styles.text, 
                    {color: isChecked? Colors.lightGray : Colors.black, 
                    textDecoration: isChecked? "line-through": "none"}
                ]}> 
                {text} 
            </Text>
        }
    </TouchableOpacity>
    )
}

export default ({text, isChecked, onChecked, onChangeText, onDelete, isNewItem}) => {
    return (
        <View style ={styles.container}>
            <View style= {{flexDirection: "row", flex: 1}}>
                <Checkbox isChecked = {isChecked} onChecked ={onChecked}/>
                <EditableTextButton 
                    text ={text} 
                    onChangeText = {onChangeText} 
                    isChecked={isChecked}
                    isNewItem ={isNewItem} />
            </View>
            <TouchableOpacity onPress = {onDelete}>
                <Text style = {[styles.icon, {color: Colors.red}]}>
                    X
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    icon: {
        padding: 5,
        fontsize: 16,
    },
    input: {
        color: Colors.black,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: 0.5,
        marginHorizontal: 5,
        padding: 3,
        height: 25,
        fontSize: 16
    },
    text: {
        padding: 3,
        fontsize: 16,
    },
})