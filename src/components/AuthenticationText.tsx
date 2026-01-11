import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../utils/tools'
import { Colors, FontSize } from '../utils/styles'

interface AuthTextProps {
    title1: string,
    title2: string
}

const AuthenticationText: React.FC<AuthTextProps> = ({ title1, title2 }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title1}>{title1}</Text>
            <Text style={styles.title2}>{title2}</Text>
        </View>
    )
}

export default AuthenticationText

const styles = StyleSheet.create({
    container: { justifyContent: 'flex-start', paddingHorizontal: 20, marginTop: width / 5, width:width },
    title1: { fontSize: FontSize.titles, color: Colors.titles, fontWeight: 'bold' },
    title2: { fontSize: FontSize.md }
})