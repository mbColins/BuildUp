import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../../components/Logo'
import { NavigationProp, width } from '../../../utils/tools'
import { Colors, FontSize } from '../../../utils/styles'
import { ChevronLeft, Mail, Navigation } from 'lucide-react-native'
import { useForm } from 'react-hook-form'
import FormInput from '../../../components/TextInput'
import { useNavigation } from '@react-navigation/native'

const ForgotPasswordScreen = () => {

    const navigation = useNavigation<NavigationProp>();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();


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
            <View style={{ alignItems: 'flex-start', width: '100%', paddingHorizontal: 20, marginTop: width / 4 }}>
                <Text style={{ fontSize: FontSize.titles, fontWeight: 'bold' }}>Hi,</Text>
                <Text style={{ fontSize: FontSize.description }}>Looks like you forgot your password!</Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                    <Mail size={30} color={Colors.success} />
                    <FormInput
                        control={control}
                        editable={true}
                        secureText={false}
                        name='email'
                        placeholder='Email Address'
                        errors={errors}
                        inputStyle={styles.inputStyle}
                        keyboardType='email-address'
                    />
                </View>
                <Text style={{ paddingHorizontal: 30 }}>You will receive an email containing the otp you will use to reset your password.</Text>
            </View>
            <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={styles.submitBtn}>
                    <Text style={{ color: '#fff' }} >Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', backgroundColor: Colors.background },
    inputStyle: { backgroundColor: Colors.border, borderBottomWidth: 0, marginTop: 10 },
    inputContainer: { flex: 0.4, marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 },
    submitBtn: { width: width * 0.8, backgroundColor: Colors.success, padding: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }

})