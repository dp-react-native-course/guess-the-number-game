import {TextInput, View, StyleSheet, Alert} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import {useState} from "react";

import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";


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
        <View style={styles.rootContainer}>
            <Title>Guess My Number</Title>
            <Card>
                <InstructionText>Enter a number</InstructionText>
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
            </Card>
        </View>


    )
}

const styles = StyleSheet.create({
    rootContainer:{
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
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