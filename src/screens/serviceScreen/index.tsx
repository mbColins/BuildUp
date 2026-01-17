import { FlatList, Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomeHeader from '../../components/CustomeHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Search } from 'lucide-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors, FontSize } from '../../utils/styles';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, Routes } from '../../utils/tools';

type ItemProps = {
  id: number
  title: string
  description: string
  img: ImageSourcePropType
  category: 'engineering' | 'design' | 'construction' | 'finishing'
  // startingPrice?: number
  available: boolean
  onPress: () => void
}

const services: ItemProps[] = [
  {
    id: 1,
    title: 'Structural Engineering',
    description: 'Structural analysis and building stability design',
    img: require('../../assets/images/structure.jpg'),
    category: 'engineering',
    // startingPrice: 50000,
    available: false,
  },
  {
    id: 2,
    title: 'Architectural Design',
    description: 'Building plans, 2D/3D designs and space planning',
    img: require('../../assets/images/str.jpg'),
    category: 'design',
    // startingPrice: 40000,
    available: true,
  },
  {
    id: 3,
    title: 'Geomatics',
    description: 'Land surveying, mapping and site measurements',
    img: require('../../assets/images/str.jpg'),
    category: 'engineering',
    // startingPrice: 30000,
    available: true,
  },
  {
    id: 4,
    title: 'Hydraulic Works',
    description: 'Water supply, drainage and piping systems',
    img: require('../../assets/images/str.jpg'),
    category: 'engineering',
    // startingPrice: 25000,
    available: true,
  },
  {
    id: 5,
    title: 'Carpentry',
    description: 'Woodwork, doors, furniture and fittings',
    img: require('../../assets/images/str.jpg'),
    category: 'construction',
    // startingPrice: 20000,
    available: true,
  },
  {
    id: 6,
    title: 'Electrical Installation',
    description: 'Wiring, lighting and electrical maintenance',
    img: require('../../assets/images/str.jpg'),
    category: 'construction',
    // startingPrice: 20000,
    available: false,
  },
  {
    id: 7,
    title: 'Roofing',
    description: 'Roof construction, repairs and waterproofing',
    img: require('../../assets/images/str.jpg'),
    category: 'construction',
    // startingPrice: 30000,
    available: true,
  },
  {
    id: 8,
    title: 'Painting',
    description: 'Interior and exterior painting services',
    img: require('../../assets/images/str.jpg'),
    category: 'finishing',
    // startingPrice: 15000,
    available: true,
  },
  {
    id: 9,
    title: 'Tiling',
    description: 'Floor and wall tiling installation',
    img: require('../../assets/images/str.jpg'),
    category: 'finishing',
    // startingPrice: 18000,
    available: false,
  },
  {
    id: 10,
    title: 'Plumbing',
    description: 'Pipe installation, repairs and maintenance',
    img: require('../../assets/images/str.jpg'),
    category: 'construction',
    // startingPrice: 20000,
    available: true,
    
  },
]


const Item = ({ title, img, category, available, description,onPress }: ItemProps) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.imageContainer}>
      <Image
        source={img}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
    <View style={styles.textContainer}>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={{ fontSize: FontSize.sm, color: Colors.success }}><Text style={{ color: Colors.textSecondary }}>category:</Text> {category}</Text>
        <Text style={{ fontSize: 12, color: 'gray', marginTop: 3 }}><Text style={{ color: Colors.textSecondary }}>description:</Text> {description}</Text>
      </View>
      <Text
        style={{ fontSize: FontSize.sm, color: available ? Colors.success : Colors.error, }}>
        {available ? 'A' : 'N/A'}
      </Text>
    </View>
  </TouchableOpacity>
)


const ServiceScreen = () => {

  const navigation = useNavigation<NavigationProp>()

  return (
    <SafeAreaProvider style={styles.container}>
      <CustomeHeader text='Services/engineers' />
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
        data={services}
        renderItem={({ item }) => <Item id={item.id} title={item.title} img={item.img} category={item.category} description={item.description} available={item.available} onPress={() => navigation.navigate(Routes.SERVICE_DETAILS)}/>}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        scrollEnabled={true}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
      />
    </SafeAreaProvider>
  )
}

export default ServiceScreen

const styles = StyleSheet.create({
  container: { flex: 1, alignContent: 'center', width: wp('100%'), backgroundColor: '#fff' },
  searchContainer: { width: wp('85%'), display: 'flex', flexDirection: 'row',  marginHorizontal: wp('5%'), marginVertical: hp('2%') },
  inputStyle: { width: wp('80%'), borderBottomWidth: 0.4, paddingVertical: hp('1%') },
  btn: { width: wp('10%'),  display: 'flex', justifyContent: 'center', padding: 5, borderBottomColor:'gray' },
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
    width: wp('92%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: wp('20%'),
    height: hp('10%'),
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    display: 'flex',
    paddingHorizontal: wp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('65%')
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textTransform: 'capitalize',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: wp('1%'),
  },
  flatListContent: {
    paddingBottom: hp('1%'),
  },
})