import {View, Text, Image, StyleSheet} from "react-native";
import Card from "../components/ui/Card";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";


export default function GameOverScreen({roundsNumber, userNumber, onStartNewGame})
{
    return (
        <View style={styles.screenContainer}>
            <Title>Game Over !</Title>
            <View style={styles.imageContainer}>
                <Image source={require("../assets/images/success.png")} style={styles.image}/>
            </View>
            <Text style={styles.summaryText}>Your number need <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.</Text>
            <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer:{
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center"
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 4,
        borderColor: Colors.primary800,
        overflow: "hidden",
        margin: 36
    },
    image: {
        width: "100%",
        height: "100%"
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: "center",
        marginBottom: 24
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
})