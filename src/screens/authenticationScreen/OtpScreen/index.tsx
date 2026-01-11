import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp, Routes, width } from '../../../utils/tools'
import { ChevronLeft } from 'lucide-react-native'
import Logo from '../../../components/Logo'
import AuthenticationText from '../../../components/AuthenticationText'
import AuthenticationBtn from '../../../components/AuthenticationBtn'
import OtpInput from './OtpInput'


const OptScreen = () => {

    const navigation = useNavigation<NavigationProp>()

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ alignSelf: 'flex-start', marginLeft: 20, marginTop: 10 }}>
                <ChevronLeft size={30} />
            </TouchableOpacity>
            <View style={{ marginTop: 50, marginBottom: 20 }}>
                <Logo />
            </View>
            <View style={{ flex: 1, flexDirection: 'column', gap: width / 6,alignItems:'center' }}>
                <AuthenticationText title1='Verify your otp.' title2='Enter the otp that was sent to your mail' />
                <OtpInput />
                <Text>Expires in 5:00</Text>
                <View style={{marginTop:width/4}}> 
                    <AuthenticationBtn text='Verify' onPress={() => navigation.navigate(Routes.RESET_PASSWORD)} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OptScreen

const styles = StyleSheet.create({
    container: { flex: 1, alignContent: 'center', alignItems: 'center', backgroundColor: '#fff' }
})