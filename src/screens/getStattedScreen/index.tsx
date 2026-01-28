import { Alert, Dimensions, Image, ImageBackground, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize } from '../../utils/styles';
import { NavigationProp, Routes } from '../../utils/tools';
import { useNavigation } from '@react-navigation/native';
import { Globe } from 'lucide-react-native';
import { useLanguage } from '../../context/LanguageContext';


const { width, height } = Dimensions.get('screen');
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';



const GetStartedScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [modalVisible, setModalVisible] = useState(false);
    const { changeLanguage } = useLanguage();
    const { t } = useTranslation();

    const handleLanguageChange = async (lang: string) => {
        await changeLanguage(lang);
        setModalVisible(false);
    };

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
            <TouchableOpacity onPress={() => setModalVisible(true)}
                style={styles.languageButton}>
                <Globe size={30} />
            </TouchableOpacity>
            <View>
                <Text style={styles.text}>{t('getStartedMsg')}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(Routes.LOGIN)}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}>
                        {/* Choose Your prefered Language */}
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{t('_choisir_votre_langue')}</Text>
                        <View style={styles.languageButtonsContainer}>
                            <TouchableOpacity
                                style={[styles.englishBtn]}
                                onPress={() => handleLanguageChange('en')}>
                                <Text style={styles.languageButtonText}>English</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.frenchBtn]}
                                onPress={() => handleLanguageChange('fr')}>
                                <Text style={styles.languageButtonText}>French</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    modalText: {
        marginVertical: 15,
        textAlign: 'center',
        fontWeight: '500',
        fontSize: FontSize.md,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: wp('100%'),
        height: hp('35%'),
        paddingBottom: hp('5%'),
        paddingTop: hp('3%'),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
    },
    languageButtonsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent:'center',
        alignItems:'center',
        width: wp('90%'),
        marginTop: hp('3%'),
        gap: hp('2%'),

    },
    // languageButton: {
    //     paddingVertical: hp('2%'),
    //     paddingHorizontal: wp('8%'),
    //     borderRadius: 25,
    //     minWidth: wp('35%'),
    //     alignItems: 'center',
    // },
    englishBtn: {
        width: wp('70%'),
        borderRadius:10,
        borderColor: Colors.success,
        borderWidth: 1,
    },
    frenchBtn: {
        width: wp('70%'),
        borderRadius:10,
        borderColor: Colors.success,
        borderWidth: 1,
    },
    languageButtonText: {
        fontSize: FontSize.md,
        fontWeight: 'bold',
        color: Colors.success,
        textAlign: 'center',
        padding: 10,
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
        fontWeight: '500',
        color: '#000000',
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