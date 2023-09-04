import {TextInput, View, StyleSheet, Alert} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import {useState} from "react";

import Colors from "../constants/colors";


export default function StartGameScreen({onPickedNumber})
{
    const [enteredNum, setEnteredNum] = useState('');

    function numberInputHandler(enteredText){
        setEnteredNum(enteredText);
    }

    function confirmInputHandler()
    {
        const chosenNumber = parseInt(enteredNum);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert('Invalid number!',
                'Number has to be a number  between 1 and 99',
                [{text: "Okay", style:"destructive", onPress: resetInputHandler}]
                );
            return;
        }

        //switching view
        onPickedNumber(chosenNumber);
    }

    function resetInputHandler()
    {
        setEnteredNum('');
    }

    return  (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput}
                maxLength={2}
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={numberInputHandler}
                value={enteredNum}
            />
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                </View>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
   inputContainer:{
       justifyContent: 'center',
       alignItems: 'center',
       padding: 16,
       marginHorizontal: 24,
       marginTop: 100,
       backgroundColor: Colors.primary800,
       borderRadius: 8,
       elevation: 4,
       shadowColor: 'black',
       shadowOffset: {width: 0, height: 2},
       shadowRadius: 6,
       shadowOpacity: 0.25
   },
    textInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.ascent500,
        borderBottomWidth: 2,
        color: Colors.ascent500,
        marginVertical: 8,
        fontWeight: "bold",
        textAlign: "center"

    },
    buttonsContainer: {
       flexDirection: "row"
    },
    buttonContainer: {
       flex: 1
    }
});