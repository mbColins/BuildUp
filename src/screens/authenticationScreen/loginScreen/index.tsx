import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { use, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../../components/Logo'
import { useForm } from 'react-hook-form'
import FormInput from '../../../components/TextInput'
import { Colors, FontSize } from '../../../utils/styles'
import { ChevronLeft, Eye, EyeClosed, Lock, Mail } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp, Routes, width } from '../../../utils/tools'


const LoginScreen = () => {

  const navigation = useNavigation<NavigationProp>();


  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const [showPassWord, SetShowPassWord] = useState(false);


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ alignSelf: 'flex-start', marginLeft: 20}}>
        <ChevronLeft size={30} />
      </TouchableOpacity>
      <View style={{ marginTop: 50, marginBottom: 20 }}>
        <Logo />
      </View>
      <View style={styles.loginMsg}>
        <Text style={{ fontSize: FontSize.titles, color: Colors.success, fontWeight: 'bold' }}>Welcome Back.</Text>
        <Text style={{ fontSize: FontSize.md }}>Nice to see you again! login to your account</Text>
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
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 10 }}>
          <Lock size={30} color={Colors.success} />
          <TouchableOpacity
            onPress={() => SetShowPassWord(!showPassWord)}
            style={styles.pwdEye}>
            {!showPassWord ? <Eye color={Colors.success} /> : <EyeClosed color={Colors.success} />}
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

      </View>
      <View style={styles.forgotPwdContainer}>
        <TouchableOpacity onPress={() => navigation.navigate(Routes.FORGOT_PASSWORD)}>
          <Text style={{ color: Colors.textSecondary }}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 0.8, width: width }}>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={{ color: '#fff' }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ marginTop: 20, color: Colors.textSecondary }}>Don't have an account? <Text style={{ color: Colors.success }}>Sign Up</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  loginMsg: { flex: 0.1, alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: width / 6, marginBottom: width * 0.1, width: width * 0.8 },
  inputStyle: { backgroundColor: Colors.border, borderBottomWidth: 0 },
  pwdEye: { position: 'absolute', right: 15, top: 10, zIndex: 1 },
  inputContainer: { marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 },
  forgotPwdContainer: { justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 20, width: width * 0.8 },
  loginBtn: { width: width * 0.8, backgroundColor: Colors.success, padding: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }
})