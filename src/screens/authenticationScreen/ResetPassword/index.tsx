import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp, Routes, width } from '../../../utils/tools'
import { ChevronLeft, Eye, EyeClosed, Lock, LockKeyhole, LockKeyholeOpen } from 'lucide-react-native'
import Logo from '../../../components/Logo'
import AuthenticationText from '../../../components/AuthenticationText'
import { Colors } from '../../../utils/styles'
import { useForm } from 'react-hook-form'
import FormInput from '../../../components/TextInput'
import AuthenticationBtn from '../../../components/AuthenticationBtn'

const ResetPasswordScreen = () => {

    const navigation = useNavigation<NavigationProp>()
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [showPassWord, SetShowPassWord] = useState(true);
    const [showConfirmPassWord, SetShowConfrinPassWord] = useState(true);

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
            <AuthenticationText title1='Reset your password.' title2='Enter and confirm your new password' />

            <View style={styles.inputContainer}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                    <LockKeyholeOpen size={30} color={Colors.success} />
                    <TouchableOpacity
                        onPress={() => SetShowPassWord(!showPassWord)}
                        style={styles.pwdEye}>
                        {showPassWord ? <EyeClosed color={Colors.success} /> : <Eye color={Colors.success} />}
                    </TouchableOpacity>
                    <FormInput
                        control={control}
                        editable={true}
                        secureText={showPassWord}
                        name='new_password'
                        placeholder='new password'
                        errors={errors}
                        inputStyle={styles.inputStyle}
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                    <LockKeyhole size={30} color={Colors.success} />
                    <TouchableOpacity
                        onPress={() => SetShowConfrinPassWord(!showConfirmPassWord)}
                        style={styles.pwdEye}>
                        {showConfirmPassWord ? <EyeClosed color={Colors.success} /> : <Eye color={Colors.success} />}
                    </TouchableOpacity>
                    <FormInput
                        control={control}
                        editable={true}
                        secureText={showConfirmPassWord}
                        name='confirm_password'
                        placeholder='confrim password'
                        errors={errors}
                        inputStyle={styles.inputStyle}
                    />
                </View>
            </View>
            <View style={{ marginTop: width / 2 }}>
                <AuthenticationBtn text='reset password' onPress={() => navigation.navigate(Routes.LOGIN)} />
            </View>
        </SafeAreaView>
    )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    pwdEye: { position: 'absolute', right: 15, top: 20, zIndex: 1 },
    inputStyle: { backgroundColor: Colors.border, borderBottomWidth: 0, marginTop: 10 },
    inputContainer: { marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 },


})