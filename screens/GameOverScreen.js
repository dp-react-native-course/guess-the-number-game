import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from "react-native";

import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";



export default function GameOverScreen({roundsNumber, userNumber, onStartNewGame})
{
    const {width, height} = useWindowDimensions();

    let imageSize = 300;

    if(width < 380){
        imageSize = 150;
    }

    if(height < 450){
        imageSize = 80;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize/2
    };
    return (
        <ScrollView style={styles.screen}>
            <View style={styles.screenContainer}>
                <Title>Game Over !</Title>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image source={require("../assets/images/success.png")} style={styles.image}/>
                </View>
                <Text style={styles.summaryText}>Your number need <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.</Text>
                <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
            </View>
        </ScrollView>

    )
}



const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    screenContainer:{
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    imageContainer: {
        // width: deviceWidth < 380 ? 150 :300,
        // height: deviceWidth < 380 ? 150 : 300,
        // borderRadius: deviceWidth < 380 ? 75 : 150,
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