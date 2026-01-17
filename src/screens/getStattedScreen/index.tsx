import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize } from '../../utils/styles';
import { NavigationProp, Routes } from '../../utils/tools';
import { useNavigation } from '@react-navigation/native';
import { Globe } from 'lucide-react-native';


const { width, height } = Dimensions.get('screen');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const GetStartedScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <ImageBackground
                    style={styles.backgroundContainer}
                    source={require('../../assets/images/getStarted.jpg')} />

                <Image
                    source={require('../../assets/images/logo1.png')}
                    style={styles.logo}
                />
            </View>
            <TouchableOpacity style={styles.languageButton}>
                <Globe size={30}/>
            </TouchableOpacity>
            <View>
                <Text style={styles.text}>Your Digital Bridge to Civil Engineers</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(Routes.LOGIN)}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default GetStartedScreen

const styles = StyleSheet.create({
    container: { flex: 1 },
    backgroundContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width - 90,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        height: height - 600,
        overflow: 'hidden',
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 300,
        left: width / 10,
        top: hp("5%"),
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: FontSize.description,
        fontStyle: 'italic',
        textAlign: 'center',
        marginVertical: hp('20%'),
        color: Colors.textSecondary,
    },
    buttonText: {
        fontSize: FontSize.lg,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        padding: 10,
    },
    button: {
        backgroundColor: Colors.success,
        width: width - 100,
        borderRadius: 30,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 50,
        width: '100%',
    },
    languageButton: {
        position: 'absolute',
        top: 90,
        right: 30,
    }
})