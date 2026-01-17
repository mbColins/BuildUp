import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ChevronLeft } from 'lucide-react-native'
import { Colors } from '../utils/styles'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../utils/tools';

interface CustomeHeaderProps {
    text: string,
}



const CustomeHeader: React.FC<CustomeHeaderProps> = ({text}) => {
const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <ChevronLeft color={'#fff'}/>
        </TouchableOpacity>
      <Text style={styles.title}>{text}</Text>
    </View>
  )
}

export default CustomeHeader

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:Colors.success,
        height:50,
        width:wp('100%'),
        paddingHorizontal:wp('2%'),
    },
    title:{
        width:wp('85%'),
        textAlign:'center',
        fontSize:18,
        fontWeight:'600',
        color:'#fff',
    }
})