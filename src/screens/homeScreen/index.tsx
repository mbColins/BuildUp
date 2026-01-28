import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View, Alert, ImageBackground, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationProp, Routes, width } from '../../utils/tools'
import { Colors, FontSize, FontWeight, Spacing, Radius } from '../../utils/styles'
import { Bell, Search, Settings, User, ChevronRight, Star, MapPin } from 'lucide-react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'


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

type topRatedEng = {
  item: topRatedEngineersProps,
  onPress: () => void
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
  <TouchableOpacity style={styles.itemContainer} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.imageWrapper}>
      <Image
        source={img}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
    <Text style={styles.itemTitle}>{title}</Text>
  </TouchableOpacity>
)

const RenderTopRatedEngineer = ({ item, onPress }:topRatedEng ) => (
  <Pressable style={styles.engineerCard} onPress={onPress}>
    <View style={styles.engineerImageContainer}>
      <Image source={item.img} style={styles.engineerImage} resizeMode="cover" />
      <View style={styles.ratingBadge}>
        <Star size={14} color="#fff" fill="#fff" />
        <Text style={styles.ratingBadgeText}>{item.rating.toFixed(1)}</Text>
      </View>
    </View>
    <View style={styles.engineerInfo}>
      <Text style={styles.engineerName}>{item.name}</Text>
      <Text style={styles.engineerSpeciality}>{item.speciality}</Text>
      <Text style={styles.priceText}>From ${item.startingPrice}/hr</Text>
    </View>
    <TouchableOpacity style={styles.hireButton} onPress={() => Alert.alert('Hire', `Hire ${item.name} from $${item.startingPrice}?`, [{ text: 'Cancel' }, { text: 'Confirm', onPress: () => { /* TODO: implement hiring */ } }])}>
      <ChevronRight size={20} color="#fff" />
    </TouchableOpacity>
  </Pressable>
)

const RenderRecentProjects = ({ item, onPress }: recentProjects ) => (
  <Pressable style={styles.projectCard} onPress={onPress}>
    <View style={styles.projectImages}>
      <ImageBackground source={item.beforeImg} style={styles.projectImage} resizeMode="cover" >
        <View style={styles.projectLabel}>
          <Text style={styles.projectLabelText}>before</Text>
        </View>
      </ImageBackground>
      <ImageBackground source={item.afterImg} style={styles.projectImage} resizeMode="cover" >
        <View style={styles.projectLabel}>
          <Text style={styles.projectLabelText}>after</Text>
        </View>
      </ImageBackground>
    </View>
    <View style={styles.projectInfo}>
      <Text style={styles.projectTitle}>{item.title}</Text>
      <View style={styles.projectLocation}>
        <MapPin size={14} color={Colors.textSecondary} />
        <Text style={styles.projectLocationText}>{item.location}</Text>
      </View>
    </View>
  </Pressable>
)

const advertisements = ({ item }: { item: adevertisementProps }) => (
  <ImageBackground source={item.img} style={styles.advertisementImage} resizeMode="cover" >
    <LinearGradient
      colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.5)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.advertisementGradient}
    >
      <Text style={styles.advertisementText}>{item.discountText}</Text>
      <TouchableOpacity style={styles.advertisementButton}>
        <Text style={styles.advertisementButtonText}>Shop Now</Text>
      </TouchableOpacity>
    </LinearGradient>
  </ImageBackground>
)

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.userGreeting}>
            <View style={styles.avatarContainer}>
              <User size={28} color="#fff" />
            </View>
            <View>
              <Text style={styles.greetingText}>Hi Joe</Text>
              <Text style={styles.emailText}>joe@gmail.com</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.SERVICES)} style={styles.iconButton}>
              <Search size={20} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={20} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Settings size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Services Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Services</Text>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.SERVICES)}>
              <View style={styles.seeMoreButton}>
                <Text style={styles.seeMoreText}>View All</Text>
                <ChevronRight size={16} color={Colors.success} />
              </View>
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
            style={styles.servicesList}
            scrollEnabled={false}
          />
        </View>

        {/* Top Rated Engineers Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Engineers</Text>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.ENGINEERS)}>
              <View style={styles.seeMoreButton}>
                <Text style={styles.seeMoreText}>View All</Text>
                <ChevronRight size={16} color={Colors.success} />
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={topRatedEngineers}
            renderItem={({item}) => <RenderTopRatedEngineer item={item} onPress={() => navigation.navigate(Routes.PROFILE_DETAILS)}/>}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: Spacing.md }}
            ItemSeparatorComponent={() => <View style={{ width: Spacing.md }} />}
          />
        </View>

        {/* Recent Projects Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Projects</Text>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.PROJECTS)}>
              <View style={styles.seeMoreButton}>
                <Text style={styles.seeMoreText}>View All</Text>
                <ChevronRight size={16} color={Colors.success} />
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentProjects}
            renderItem={({item}) => <RenderRecentProjects item={item} onPress={() => navigation.navigate(Routes.PROJECTS_DETAILS)} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: Spacing.md }}
            ItemSeparatorComponent={() => <View style={{ width: Spacing.md }} />}
          />
        </View>

        {/* Advertisement Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Special Offers</Text>
            <TouchableOpacity>
              <View style={styles.seeMoreButton}>
                <Text style={styles.seeMoreText}>View All</Text>
                <ChevronRight size={16} color={Colors.success} />
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={advertisementData}
            renderItem={advertisements}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: Spacing.md }}
            ItemSeparatorComponent={() => <View style={{ width: Spacing.md }} />}
          />
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    width: wp('100%'),
    height: hp('100%'),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  userGreeting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingText: {
    fontWeight: FontWeight.bold,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
  },
  emailText: {
    color: Colors.success,
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  seeMoreText: {
    color: Colors.success,
    fontWeight: FontWeight.semibold,
    fontSize: FontSize.sm,
  },
  image: {
    height: 62,
    width: 62,
  },
  itemContainer: {
    height: hp('12%'),
    flex: 1,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  itemTitle: {
    textAlign: 'center',
    fontSize: FontSize.xs,
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
    fontWeight: FontWeight.medium,
  },
  imageWrapper: {
    height: 62,
    width: 62,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.border,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  servicesList: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    borderColor: Colors.border,
    paddingVertical: Spacing.md,
  },
  engineerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: wp('90%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  engineerImageContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  engineerImage: {
    width: 64,
    height: 64,
    borderRadius: Radius.md,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: Colors.success,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 4,
  },
  ratingBadgeText: {
    color: '#fff',
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
  },
  engineerInfo: {
    flex: 1,
  },
  engineerName: {
    fontWeight: FontWeight.bold,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
  },
  engineerSpeciality: {
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
    fontSize: FontSize.sm,
  },
  priceText: {
    fontWeight: FontWeight.semibold,
    fontSize: FontSize.sm,
    color: Colors.primary,
  },
  hireButton: {
    backgroundColor: Colors.success,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.md,
  },
  projectCard: {
    width: width * 0.85,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  projectImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 0,
  },
  projectImage: {
    width: (width * 0.85 - 24) / 2,
    height: 120,
    borderRadius: Radius.md,
    backgroundColor: Colors.border,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden',
    padding: Spacing.md,
  },
  projectLabel: {
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  projectLabelText: {
    color: '#fff',
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
  },
  projectInfo: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  projectTitle: {
    fontWeight: FontWeight.semibold,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  projectLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  projectLocationText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  advertisementImage: {
    width: width * 0.9,
    height: 120,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.primary,
  },
  advertisementGradient: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  advertisementText: {
    color: '#fff',
    fontWeight: FontWeight.bold,
    fontSize: FontSize.lg,
  },
  advertisementButton: {
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    alignSelf: 'flex-start',
    marginTop: Spacing.sm,
  },
  advertisementButtonText: {
    color: '#fff',
    fontWeight: FontWeight.semibold,
    fontSize: FontSize.sm,
  },
})
