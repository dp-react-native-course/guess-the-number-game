import {useState, useEffect} from "react";
import {View, Text, StyleSheet, Alert} from "react-native";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

function generateRandom(min, max, exclude)
{
    const randNum = Math.floor(Math.random() * (max - min)) + min;

    if(randNum === exclude) {
        return generateRandom(min, max,  exclude);
    }else{
        return randNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({chosenNumber, onGameOver})
{
    const initialGuess =generateRandom(1, 100, chosenNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
        if(currentGuess === chosenNumber){
            onGameOver()
        }
    }, [currentGuess, chosenNumber, onGameOver]);

    
    function nextGuessHandler(direction) {
        if((direction === 'lower' && currentGuess < chosenNumber) ||
            (direction === 'higher' && currentGuess > chosenNumber))
        {
            Alert.alert("Dont't Lie !",
                "You know that is wrong...",
                [{text: "Sorry !", style: "cancel"}]);
            return;
        }
        if(direction === 'lower'){
            maxBoundary = currentGuess;
        }else{
            minBoundary = currentGuess + 1;
        }
        const newRandNum = generateRandom(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRandNum);

    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View>
                <Text>Higher or Lower ?</Text>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>

                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>

                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>+</PrimaryButton>
                    </View>
                </View>
            </View>
            <View>
                <Text>Log Rounds</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 27,
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    }
});