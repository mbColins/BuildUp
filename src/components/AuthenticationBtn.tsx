import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { width } from '../utils/tools'
import { Colors } from '../utils/styles'

interface BtnProps{
    text:string
    onPress: any
}
   


const AuthenticationBtn: React.FC<BtnProps> =({text,onPress}) => {
    return (
        <View>
            <TouchableOpacity style={styles.loginBtn} onPress={onPress}>
                <Text style={{ color: '#fff' }}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AuthenticationBtn

const styles = StyleSheet.create({
    loginBtn: { width: width * 0.8, backgroundColor: Colors.success, padding: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }

})