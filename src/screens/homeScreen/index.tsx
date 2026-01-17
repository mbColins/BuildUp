import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View, Alert, ImageBackground, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationProp, Routes, width } from '../../utils/tools'
import { Colors, FontSize } from '../../utils/styles'
import { Bell, Search, Settings, User } from 'lucide-react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native'


type Itemprops = {
  id: number,
  title: string,
  img: ImageSourcePropType,
  onPress: () => void,
}

type topRatedEngineersProps = {
  id: number,
  name: string,
  speciality: string,
  rating: number,
  img: ImageSourcePropType
  startingPrice: number
}

type recentProjectsProps = {
  id: number,
  title: string,
  location: string,
  beforeImg: ImageSourcePropType,
  afterImg: ImageSourcePropType,
}

type recentProjects = {
  item: recentProjectsProps,
   onPress: () => void,
}

type adevertisementProps = {
  id: number,
  img: ImageSourcePropType,
  discountText: string
}

const services: Itemprops[] = [
  {
    id: 1,
    title: 'structural eng',
    img: require('../../assets/images/structure.jpg'),
  },
  {
    id: 2,
    title: 'architect design',
    img: require('../../assets/images/str.jpg'),
  },
  {
    id: 3,
    title: 'geomatics',
    img: require('../../assets/images/str.jpg'),
  },
  {
    id: 4,
    title: 'hydraulic',
    img: require('../../assets/images/str.jpg'),
  },
  {
    id: 5,
    title: 'carpentry',
    img: require('../../assets/images/str.jpg'),
  },
  {
    id: 6,
    title: 'electrical',
    img: require('../../assets/images/str.jpg'),
  },
  {
    id: 7,
    title: 'roofer',
    img: require('../../assets/images/str.jpg'),
  },
  {
    id: 8,
    title: 'painter',
    img: require('../../assets/images/str.jpg'),
  },
  {
    id: 9,
    title: 'tiler',
    img: require('../../assets/images/str.jpg'),
  },
  {
    id: 10,
    title: 'plumber',
    img: require('../../assets/images/str.jpg'),
  }
]

const topRatedEngineers: topRatedEngineersProps[] = [
  {
    id: 1,
    name: 'Jane Doe',
    speciality: 'Structural Engineer',
    rating: 4.9,
    img: require('../../assets/images/structure.jpg'),
    startingPrice: 120,
  },
  {
    id: 2,
    name: 'John Smith',
    speciality: 'Architect',
    rating: 4.7,
    img: require('../../assets/images/str.jpg'),
    startingPrice: 95,
  },
  {
    id: 3,
    name: 'Nadia Ali',
    speciality: 'Geomatics',
    rating: 4.8,
    img: require('../../assets/images/str.jpg'),
    startingPrice: 110,
  },
  {
    id: 4,
    name: 'Carlos Ruiz',
    speciality: 'Hydraulic Technician',
    rating: 4.6,
    img: require('../../assets/images/str.jpg'),
    startingPrice: 85,
  },
]

const recentProjects: recentProjectsProps[] = [
  {
    id: 1,
    title: 'Renovated Kitchen',
    location: 'New York, NY',
    beforeImg: require('../../assets/images/str.jpg'),
    afterImg: require('../../assets/images/structure.jpg'),
  },
  {
    id: 2,
    title: 'Bathroom Remodel',
    location: 'New York, NY',
    beforeImg: require('../../assets/images/structure.jpg'),
    afterImg: require('../../assets/images/str.jpg'),
  },
  {
    id: 3,
    title: 'Roof Repair',
    location: 'New York, NY',
    beforeImg: require('../../assets/images/str.jpg'),
    afterImg: require('../../assets/images/str.jpg'),
  },
]

const advertisementData: adevertisementProps[] = [
  {
    id: 1,
    img: require('../../assets/images/str.jpg'),
    discountText: '20% off on all services',
  },
  {
    id: 2,
    img: require('../../assets/images/structure.jpg'),
    discountText: 'Free consultation for first time customers',
  },
]

const Item = ({ title, img, onPress }: Itemprops) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <View style={styles.imageWrapper}>
      <Image
        source={img}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
    <Text style={{ textAlign: 'center', fontSize: 10 }}>{title}</Text>
  </TouchableOpacity>
)

const renderTopRatedEngineer = ({ item }: { item: topRatedEngineersProps }) => (
  <View style={styles.engineerCard}>
    <Image source={item.img} style={styles.engineerImage} resizeMode="cover" />
    <View style={styles.engineerInfo}>
      <Text style={styles.engineerName}>{item.name}</Text>
      <Text style={styles.engineerSpeciality}>{item.speciality}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.ratingText}>⭐ {item.rating.toFixed(1)}</Text>
        <Text style={styles.priceText}>From ${item.startingPrice}</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.hireButton} onPress={() => Alert.alert('Hire', `Hire ${item.name} from $${item.startingPrice}?`, [{ text: 'Cancel' }, { text: 'Confirm', onPress: () => { /* TODO: implement hiring */ } }])}>
      <Text style={styles.hireButtonText}>Hire Me</Text>
    </TouchableOpacity>
  </View>
)

const RenderRecentProjects = ({ item, onPress }: recentProjects ) => (
  <Pressable style={styles.projectCard} onPress={onPress}>
    <View style={styles.projectImages}>
      <ImageBackground source={item.beforeImg} style={styles.projectImage} resizeMode="cover" >
        <Text style={{ color: Colors.success, fontWeight: 'bold' }}>before</Text>
      </ImageBackground>
      <ImageBackground source={item.afterImg} style={styles.projectImage} resizeMode="cover" >
        <Text style={{ color: Colors.success, fontWeight: 'bold' }}>after</Text>
      </ImageBackground>
    </View>
    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 8, gap: 10 }}>
      <Text >{item.title}</Text>
      <Text >{item.location}</Text>
    </View>
  </Pressable>
)

const advertisements = ({ item }: { item: adevertisementProps }) => (
  //  <View style={{borderColor: '#ccc', borderRadius: 10, overflow: 'hidden' }}>
  <ImageBackground source={item.img} style={styles.advertisementImage} resizeMode="cover" >
    <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.discountText}</Text>
  </ImageBackground>
  //  </View>
)

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: Colors.textSecondary }}>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 5, paddingVertical: 4 }}>
            <TouchableOpacity>
              <User size={38} />
            </TouchableOpacity>
            <View>
              <Text style={{ fontWeight: 'bold' }}>Hi Joe</Text>
              <Text style={{ color: Colors.success }}>joe@gmail.com</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginTop: 15, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.SERVICES)}>
              <Search />
            </TouchableOpacity>
            <TouchableOpacity>
              <Bell />
            </TouchableOpacity>
            <TouchableOpacity>
              <Settings />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ backgroundColor: "#fff", marginTop: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
            <Text style={{ marginTop: 15 }}>services (engineering)</Text>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.SERVICES)} >
              <Text style={{ marginTop: 15, color: Colors.success }}>more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={services}
            renderItem={({ item }) => <Item id={item.id} title={item.title} img={item.img} onPress={() => navigation.navigate(Routes.SERVICE_DETAILS)} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={5}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingHorizontal: 2 }}
            style={{ borderWidth: 0.2, borderRadius: 10, marginTop: 10, borderColor: 'gray' }}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
          <Text style={{ marginTop: 15 }}>features & top rated engineers</Text>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.ENGINEERS)}>
            <Text style={{ marginTop: 15, color: Colors.success }}>more</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={topRatedEngineers}
            renderItem={renderTopRatedEngineer}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 2, paddingVertical: 10 }}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          />
        </View>

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
            <Text style={{ marginTop: 15 }}>recent projects</Text>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.PROJECTS)}>
              <Text style={{ marginTop: 15, color: Colors.success }}>more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentProjects}
            renderItem={({item}) => <RenderRecentProjects item={item} onPress={() => navigation.navigate(Routes.PROJECTS_DETAILS)} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 6, paddingVertical: 10 }}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          />
        </View>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
            <Text style={{ marginTop: 15 }}>advertisement & discount</Text>
            <TouchableOpacity>
              <Text style={{ marginTop: 15, color: Colors.success }}>more</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={advertisementData}
            renderItem={advertisements}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 6, paddingVertical: 10 }}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: { flex: 1, alignContent: 'center', paddingHorizontal: 8, backgroundColor: '#fff', width: wp('100%'), height: hp('100%') },
  image: { height: 62, width: 62 },
  itemContainer: { height: hp('12%'), flex: 1, alignItems: 'center', marginHorizontal: 0, marginTop: 6, width: wp('80%') },
  imageWrapper: {
    height: 62,
    width: 62,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 0.2,
    borderColor: '#606060',
    marginTop: 5,
  },
  engineerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, padding: 8, borderWidth: 0.2, borderColor: '#ccc', marginVertical: 6, minWidth: width * 0.85 },
  engineerImage: { width: 64, height: 64, borderRadius: 8, marginRight: 10 },
  engineerInfo: { flex: 1 },
  engineerName: { fontWeight: 'bold' },
  engineerSpeciality: { color: Colors.textSecondary, marginTop: 2, marginBottom: 4 },
  ratingText: { color: Colors.success },
  priceText: { fontWeight: '600' },
  headerButton: { backgroundColor: Colors.success, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, marginLeft: 6 },
  headerButtonText: { color: '#fff', fontWeight: '600' },
  hireButton: { backgroundColor: Colors.success, paddingHorizontal: 12, borderRadius: 6, marginLeft: 8, position: 'absolute', top: 8, right: 8 },
  hireButtonText: { color: '#fff', fontWeight: '700', fontSize: FontSize.sm },
  projectCard: { width: width * 0.85, borderRadius: 8, overflow: 'hidden', backgroundColor: '#fff', borderWidth: 0.2, borderColor: '#ccc', padding: 8 },
  projectImages: { flexDirection: 'row', justifyContent: 'space-between' },
  projectImage: { width: (width * 0.85 - 24) / 2, height: 100, borderRadius: 6, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  projectTitle: { marginTop: 8, fontWeight: '600' },
  advertisementImage: { width: width * 0.9, height: 100, marginTop: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10, overflow: 'hidden' }
}
)