import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeft, Eye, EyeClosed, Lock, Mail, Phone, Route, User } from 'lucide-react-native'
import Logo from '../../../components/Logo'
import { NavigationProp, Routes, width } from '../../../utils/tools'
import { useNavigation } from '@react-navigation/native'
import { Colors, FontSize } from '../../../utils/styles'
import { useForm } from 'react-hook-form'
import FormInput from '../../../components/TextInput'
import AuthenticationBtn from '../../../components/AuthenticationBtn'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const RegistrationScreen = () => {
    const navigation = useNavigation<NavigationProp>()
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [showPassWord, SetShowPassWord] = useState(true);


    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ alignSelf: 'flex-start', marginLeft: wp('1%'), paddingTop: hp('2%') }}>
                <ChevronLeft size={30} />
            </TouchableOpacity>
            <View style={{ marginTop: 50, marginBottom: 20 }}>
                <Logo />
            </View>
            <View style={{ justifyContent: 'flex-start', paddingHorizontal: 20, marginTop: width / 5 }}>
                <Text style={{ fontSize: FontSize.titles, color: Colors.titles, fontWeight: 'bold' }}>Create an Account</Text>
                <Text style={{ fontSize: FontSize.md }}>Find your skilled construction engineer</Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                    <User size={30} color={Colors.success} />
                    <FormInput
                        control={control}
                        editable={true}
                        secureText={false}
                        name='username'
                        placeholder='username'
                        errors={errors}
                        inputStyle={styles.inputStyle}
                        keyboardType='default'
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                    <Phone size={30} color={Colors.success} />
                    <FormInput
                        control={control}
                        editable={true}
                        secureText={false}
                        name='phone'
                        placeholder='phonenumber'
                        errors={errors}
                        inputStyle={styles.inputStyle}
                        keyboardType='email-address'
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                    <Mail size={30} color={Colors.success} />
                    <FormInput
                        control={control}
                        editable={true}
                        secureText={false}
                        name='email'
                        placeholder='email'
                        errors={errors}
                        inputStyle={styles.inputStyle}
                        keyboardType='email-address'
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                    <Lock size={30} color={Colors.success} />
                    <TouchableOpacity
                        onPress={() => SetShowPassWord(!showPassWord)}
                        style={styles.pwdEye}>
                        {showPassWord ? <EyeClosed color={Colors.success} /> : <Eye color={Colors.success} />}
                    </TouchableOpacity>
                    <FormInput
                        control={control}
                        editable={true}
                        secureText={showPassWord}
                        name='password'
                        placeholder='password'
                        errors={errors}
                        inputStyle={styles.inputStyle}
                    />
                </View>
                <TouchableOpacity>
                    <Text>Agree to <Text style={{ color: Colors.success }}>terms</Text> and <Text style={{ color: Colors.success }}>conditions</Text></Text>
                </TouchableOpacity>
                <AuthenticationBtn text='sign up' onPress={() => navigation.navigate(Routes.LOGIN)} />
                <TouchableOpacity onPress={() => navigation.navigate(Routes.LOGIN)}>
                    <Text>Already have an account? <Text style={{ color: Colors.success }}>login</Text></Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RegistrationScreen

const styles = StyleSheet.create({
    container: { flex: 1, alignContent: 'center', backgroundColor: '#fff' },
    inputContainer: { marginTop: hp('1%'), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 },
    inputStyle: { backgroundColor: Colors.border, borderBottomWidth: 0, marginTop: 5 },
    pwdEye: { position: 'absolute', right: wp('5%'), top: hp('2%'), zIndex: 1 },
    loginBtn: { width: width * 0.8, backgroundColor: Colors.success, padding: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }


})