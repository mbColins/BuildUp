import { FlatList, ImageSourcePropType, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import CustomeHeader from '../../components/CustomeHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Search } from 'lucide-react-native'
import RecentProjectsCard from '../../components/RecentProjectsCard'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp, Routes } from '../../utils/tools'


type recentProjectsProps = {
   id: number
  title: string
  description: string
  category: string
  location: string
  city: string
  status: 'completed' | 'ongoing'
  durationWeeks: number
  budgetXaf?: number

  engineerName: string
  engineerAvatar: ImageSourcePropType

  rating: number
  reviewsCount: number
  beforeImg: ImageSourcePropType
  afterImg: ImageSourcePropType
  gallery?: ImageSourcePropType[]

  createdAt: string
}

const recentProjects: recentProjectsProps[] = [
  {
    id: 1,
    title: 'Renovated Kitchen',
    description: 'Modern kitchen renovation with custom cabinets, tiled backsplash, and improved lighting',
    category: 'kitchen',
    location: 'Bonamoussadi, Douala, Cameroon',
    city: 'Douala',
    status: 'completed',
    durationWeeks: 4,
    budgetXaf: 1200000,

    engineerName: 'John Mbarga',
    engineerAvatar: require('../../assets/images/structure.jpg'),

    rating: 4.8,
    reviewsCount: 23,

    beforeImg: require('../../assets/images/str.jpg'),
    afterImg: require('../../assets/images/structure.jpg'),

    createdAt: '2024-11-12',
  },
  {
    id: 2,
    title: 'Bathroom Remodeling',
    description: 'Full bathroom remodel including plumbing upgrades, ceramic tiles, and modern fixtures',
    category: 'bathroom',
    location: 'Akwa, Douala, Cameroon',
    city: 'Douala',
    status: 'completed',
    durationWeeks: 3,
    budgetXaf: 850000,

    engineerName: 'Amina Bello',
    engineerAvatar: require('../../assets/images/structure.jpg'),

    rating: 4.6,
    reviewsCount: 17,

    beforeImg: require('../../assets/images/structure.jpg'),
    afterImg: require('../../assets/images/str.jpg'),

    createdAt: '2024-10-28',
  },
  {
    id: 3,
    title: 'Roof Repair & Waterproofing',
    description: 'Roof leak repairs and full waterproof membrane installation',
    category: 'roofing',
    location: 'Molyko, Buea, Cameroon',
    city: 'Buea',
    status: 'completed',
    durationWeeks: 2,
    budgetXaf: 650000,

    engineerName: 'Samuel Nfor',
    engineerAvatar: require('../../assets/images/structure.jpg'),

    rating: 4.4,
    reviewsCount: 11,

    beforeImg: require('../../assets/images/str.jpg'),
    afterImg: require('../../assets/images/str.jpg'),

    createdAt: '2024-09-15',
  },
  {
    id: 4,
    title: 'Electrical Rewiring Project',
    description: 'Complete residential electrical rewiring with safety upgrades',
    category: 'electrical',
    location: 'Bastos, Yaoundé, Cameroon',
    city: 'Yaoundé',
    status: 'completed',
    durationWeeks: 3,
    budgetXaf: 980000,

    engineerName: 'Grace Tamba',
    engineerAvatar: require('../../assets/images/structure.jpg'),

    rating: 4.9,
    reviewsCount: 31,

    beforeImg: require('../../assets/images/structure.jpg'),
    afterImg: require('../../assets/images/structure.jpg'),

    createdAt: '2024-08-20',
  },
  {
    id: 5,
    title: 'House Painting & Finishing',
    description: 'Interior and exterior painting with premium weather-resistant paint',
    category: 'finishing',
    location: 'Nkolbisson, Yaoundé, Cameroon',
    city: 'Yaoundé',
    status: 'completed',
    durationWeeks: 2,
    budgetXaf: 540000,

    engineerName: 'Patrick Ndzi',
    engineerAvatar: require('../../assets/images/structure.jpg'),

    rating: 4.5,
    reviewsCount: 14,

    beforeImg: require('../../assets/images/str.jpg'),
    afterImg: require('../../assets/images/structure.jpg'),

    createdAt: '2024-07-30',
  },
]




const ProjectScreen = () => {
const navigation = useNavigation<NavigationProp>()

    return (
        <SafeAreaView style={styles.container}>
            <CustomeHeader text='Projects' />
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
                data={recentProjects}
                renderItem={({item}) => <RecentProjectsCard item={item} onPress={() => navigation.navigate(Routes.PROJECTS_DETAILS )} />}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 6, paddingVertical: 10 }}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />
        </SafeAreaView>
    )
}

export default ProjectScreen

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent:'center',alignContent:'center', width:wp('100%'),backgroundColor:'#fff' },
    searchContainer: { width: wp('85%'), display: 'flex', flexDirection: 'row', marginHorizontal: wp('5%'), marginVertical: hp('2%') },
    inputStyle: { width: wp('80%'), borderBottomWidth: 0.4, paddingVertical: hp('1%') },
    btn: { width: wp('10%'), display: 'flex', justifyContent: 'center', padding: 5, borderBottomColor: 'gray' },
})