import {useState, useEffect} from "react";
import {View, Text, StyleSheet, Alert, FlatList} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/ui/GuessLogItem";

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
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if(currentGuess === chosenNumber){
            onGameOver(guessRounds.length)
        }
    }, [currentGuess, chosenNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    
    
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
        setGuessRounds((prevRounds) => [newRandNum, ...prevRounds]);
    }

    const guessRoundsLength = guessRounds.length;

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Higher or Lower ?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>

                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>

                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
                            <Ionicons name="md-add" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsLength - itemData.index} guess={itemData.item}/>}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 27,
        marginTop: 10
    },
    instructionText: {
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16,
    }
});