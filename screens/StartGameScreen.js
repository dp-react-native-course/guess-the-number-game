import {TextInput, View, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import {useState} from "react";

import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";


export default function StartGameScreen({onPickedNumber})
{
    const [enteredNum, setEnteredNum] = useState('');
    const {width, height} = useWindowDimensions();

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

    const marginTopDistance = height  < 450 ? 30 : 100;

    return  (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView
                style={styles.screen}
                behaviour="position"
            >
                <View style={[styles.rootContainer, {marginTop : marginTopDistance} ]}>
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
            </KeyboardAvoidingView>
        </ScrollView>




    )
}
// const deviceHeight = Dimensions.get('window').height;
// console.log(deviceHeight);
const styles = StyleSheet.create({
    screen:{
        flex: 1,
    },
    rootContainer:{
        flex: 1,
        // marginTop: marginTop,
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