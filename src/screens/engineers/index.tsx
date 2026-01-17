import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import CustomeHeader from '../../components/CustomeHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Search } from 'lucide-react-native';
import { NavigationProp, Routes } from '../../utils/tools';
import { useNavigation } from '@react-navigation/native';
import EngineerCard from '../../components/EngineerCard';
import { engineers } from '../serviveDetails';


const EngineerScreen = () => {
    const navigation = useNavigation<NavigationProp>()

    return (
        <SafeAreaProvider style={styles.container}>
            <CustomeHeader text='engineers' />
            <View style={styles.searchContainer}>
                <TextInput style={styles.inputStyle}
                    placeholder='search something...'
                    placeholderTextColor={'gray'}
                />
                <TouchableOpacity style={styles.btn}>
                    <Search />
                </TouchableOpacity>
            </View>
            <FlatList
                data={engineers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <EngineerCard engineer={item} onPress={() => navigation.navigate(Routes.PROFILE_DETAILS)} />}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={50}
                initialNumToRender={10}
            />
        </SafeAreaProvider>
    )
}

export default EngineerScreen

const styles = StyleSheet.create({
    container:{flex:1, backgroundColor:'#fff'},
    searchContainer: { width: wp('85%'), display: 'flex', flexDirection: 'row', marginHorizontal: wp('5%'), marginVertical: hp('2%') },
    inputStyle: { width: wp('80%'), borderBottomWidth: 0.4, paddingVertical: hp('1%') },
    btn: { width: wp('10%'), display: 'flex', justifyContent: 'center', padding: 5, borderBottomColor: 'gray' },




})