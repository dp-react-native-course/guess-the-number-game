import { StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";

import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Colors from "./constants/colors";

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gamerIsOver, setGamerIsOver] = useState(true);

    const bgImg = require("./assets/images/background.png");

    function pickedNumberHandler(pickedNumber){
        setUserNumber(pickedNumber);
        setGamerIsOver(false);
    }

    function gameOverHandler()
    {
        setGamerIsOver(true);
    }

    let screen =  <StartGameScreen onPickedNumber={pickedNumberHandler}/>;

    if(userNumber){
        screen = <GameScreen chosenNumber={userNumber} onGameOver={gameOverHandler}/>;
    }

    if(gamerIsOver && userNumber){
        screen = <GameOverScreen />;
    }



    return (
        <LinearGradient colors={[Colors.primary700, Colors.ascent500]} style={styles.rootScreen}>
            <ImageBackground
                source={bgImg}
                resizeMode="cover"
                style={styles.rootScreen}
                imageStyle={styles.backgroundImage}
            >
                <SafeAreaView style={styles.rootScreen}>

                    {screen}
                </SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    );
}

import StartGameScreen from "./screens/StartGameScreen";
import {useState} from "react";

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.45
    }
});
