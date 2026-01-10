import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../utils/tools'



const Logo = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo1.png')}
                style={styles.logo}
            />
        </View>
    )
}

export default Logo

const styles = StyleSheet.create({
    logo: {
        position: 'absolute',
        width: 150,
        height: 150,
        top: -60,
    },
    container:{
        width:width,
        alignItems:'center',
    }
})