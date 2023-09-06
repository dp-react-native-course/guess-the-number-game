import { StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import { useFonts} from "expo-font";
import AppLoading from "expo-app-loading";
import {useState} from "react";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Colors from "./constants/colors";
import {StatusBar} from "expo-status-bar";
import bgImg from "./assets/images/background.png";

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gamerIsOver, setGamerIsOver] = useState(true);
    const [guessRounds, setGuessRounds] = useState(0);

    const bgImg = require("./assets/images/background.png");

    const [fontsLoaded] = useFonts({
        'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });

    if(!fontsLoaded){
        return <AppLoading />;
    }

    function pickedNumberHandler(pickedNumber){
        setUserNumber(pickedNumber);
        setGamerIsOver(false);
    }

    function gameOverHandler(numberOfRounds)
    {
        setGamerIsOver(true);
        setGuessRounds(numberOfRounds);
    }

    function setNewGameHandler()
    {
        setUserNumber(null);
        setGuessRounds(0);
    }

    let screen =  <StartGameScreen onPickedNumber={pickedNumberHandler}/>;

    if(userNumber){
        screen = <GameScreen chosenNumber={userNumber} onGameOver={gameOverHandler}/>;
    }

    if(gamerIsOver && userNumber){
        screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={setNewGameHandler}/>;
    }



    return (
        <>
            <StatusBar style="light"/>
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
        </>

    );
}



const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.45
    }
});
