import { ImageSourcePropType, StyleSheet, Text, View, Image, FlatList, ScrollView, Pressable } from 'react-native'
import React from 'react'
import CustomeHeader from '../../components/CustomeHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Colors, FontSize } from '../../utils/styles'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp, Routes } from '../../utils/tools'
import EngineerCard from '../../components/EngineerCard'
import { SafeAreaView } from 'react-native-safe-area-context'

type ItemProps = {
    id: number
    title: string
    description: string
    img: ImageSourcePropType
    category: 'engineering' | 'design' | 'construction' | 'finishing'
    startingPrice?: number
    available: boolean
}

type EngineerProfile = {
    id: number
    name: string
    specialty: string
    bio: string
    experienceYears: number
    location: string
    available: boolean
    avatar: ImageSourcePropType,
}

type EngineerCardProps = {
    engineer: EngineerProfile
    onPress?: () => void // optional callback method
}


const serviceDetail: ItemProps[] = [
    {
        id: 1,
        title: 'Structural Engineering',
        description: 'Structural analysis and building stability design',
        img: require('../../assets/images/structure.jpg'),
        category: 'engineering',
        startingPrice: 50000,
        available: true,
    }
]

export const engineers: EngineerProfile[] = [
    {
        id: 1,
        name: 'John Mbarga',
        specialty: 'Structural Engineer',
        bio: 'Specialized in reinforced concrete and high-rise structures',
        experienceYears: 8,
        location: 'Douala',
        available: true,
        avatar: require('../../assets/images/structure.jpg'),
    },
    {
        id: 2,
        name: 'Amina Bello',
        specialty: 'Civil Engineer',
        bio: 'Infrastructure projects including roads and drainage systems',
        experienceYears: 6,
        location: 'Yaoundé',
        available: true,
        avatar: require('../../assets/images/structure.jpg'),
    },
    {
        id: 3,
        name: 'Samuel Nfor',
        specialty: 'Electrical Engineer',
        bio: 'Residential and industrial electrical installations',
        experienceYears: 5,
        location: 'Bamenda',
        available: false,
        avatar: require('../../assets/images/structure.jpg'),
    },
    {
        id: 4,
        name: 'Grace Tamba',
        specialty: 'Mechanical Engineer',
        bio: 'HVAC systems and industrial machinery maintenance',
        experienceYears: 7,
        location: 'Buea',
        available: true,
        avatar: require('../../assets/images/structure.jpg'),
    },
    {
        id: 5,
        name: 'Grace Tamba',
        specialty: 'Mechanical Engineer',
        bio: 'HVAC systems and industrial machinery maintenance',
        experienceYears: 7,
        location: 'Buea',
        available: true,
        avatar: require('../../assets/images/structure.jpg'),
    },
    {
        id: 6,
        name: 'Grace Tamba',
        specialty: 'Mechanical Engineer',
        bio: 'HVAC systems and industrial machinery maintenance',
        experienceYears: 7,
        location: 'Buea',
        available: true,
        avatar: require('../../assets/images/structure.jpg'),
    },
]



// export const EngineerCard = ({ engineer, onPress }: EngineerCardProps) => (
//     <Pressable style={styles.engineerCard} onPress={onPress}>
//         <Image source={engineer.avatar} style={styles.avatar} />
//         <View style={styles.engineerInfo}>
//             <Text style={styles.name}>{engineer.name}</Text>
//             <Text style={styles.specialty}>{engineer.specialty}</Text>
//             <Text style={styles.meta}>
//                 {engineer.experienceYears} yrs • {engineer.location}
//             </Text>
//             <View style={{ width: wp('65%'), justifyContent: 'flex-end' }}>
//                 <Text
//                     style={[
//                         styles.status,
//                         { color: engineer.available ? Colors.success : Colors.error },
//                     ]}
//                 >
//                     {engineer.available ? 'Available' : 'Unavailable'}
//                 </Text>
//             </View>
//         </View>
//     </Pressable>
// )


const ServicesDetailScreen = () => {
    const service = serviceDetail[0]
    const navigation = useNavigation<NavigationProp>()

    return (
        <SafeAreaView style={styles.container}>
            <CustomeHeader text='Service Detail' />
            <View style={styles.card}>
                <Image
                    source={service.img}
                    style={styles.serviceImg}
                    resizeMode='contain'
                />
                <View style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row', width: wp('90%') }}>
                    <Text style={{ textAlign: 'left', width: wp('65%'), fontWeight: '500' }}>{service.title}</Text>
                    <Text style={{ textAlign: 'center', width: wp('20%'), backgroundColor: '#59d97d', borderRadius: 10, padding: 2, color: Colors.success }}>{service.category}</Text>
                </View>
                <Text style={{ textAlign: 'left', width: wp('90%') }}>{service.description}</Text>
                <View style={styles.priceBox}>
                    <Text style={{ textAlign: 'left', color: Colors.success }}>starting price:</Text>
                    <Text style={{ textAlign: 'left', color: Colors.success, fontWeight: '500' }}>{service.startingPrice} XAF</Text>
                </View>
            </View>
            <View style={{ width: wp('80%'), paddingHorizontal: wp('4%'), marginTop: 4 }}>
                <Text>Marching engineers</Text>
            </View>

            {/* <View> */}
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
            {/* </View> */}

        </SafeAreaView>
    )
}

export default ServicesDetailScreen

const styles = StyleSheet.create({
    container: { backgroundColor: "#fff" },
    serviceImg: { height: hp('20%'), width: wp('90%') },
    priceBox: { justifyContent: 'space-between', display: 'flex', flexDirection: 'row', width: wp('90%'), backgroundColor: '#59d97d', borderRadius: 10, paddingHorizontal: 10, marginTop: 5, padding: 2 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: wp('4%'),
        marginVertical: hp('1%'),
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        width: wp('93%'),
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4
    },
    engineerCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 12,
        marginHorizontal: wp('4%'),
        marginVertical: 6,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    engineerInfo: { flex: 1 },
    name: { fontSize: 15, fontWeight: '600' },
    specialty: { fontSize: 13, color: '#555', marginTop: 2 },
    meta: { fontSize: 12, color: '#888', marginTop: 2 },
    status: { fontSize: 12, fontWeight: '500', marginTop: 4, textAlign: 'right' },
})