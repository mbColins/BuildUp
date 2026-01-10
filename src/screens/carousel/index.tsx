import { Animated, Dimensions, FlatList, Image, ImageSourcePropType, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize } from '../../utils/styles';
import Pagination from '../../components/Pagination';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationProp, RootStackParamList, Routes } from '../../utils/tools';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');





type ItemProps = {
  title: string,
  img: ImageSourcePropType,
  description?: string
};
// 'Discover Engineers'


const Item = ({ title, img, description }: ItemProps) => (
  <View style={styles.itemContainer}>
    <Image
      source={require('../../assets/images/logo1.png')}
      style={styles.logo}
    />
    <Image
      source={img}
      style={styles.image}
      resizeMode="contain"
    />
    <View style={{ marginTop: 30 }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </View>
);

const CarrouselScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const scollX = useRef(new Animated.Value(0)).current;
  const {t} = useTranslation();

  const DATA: ItemProps[] & { id: string }[] = [
  {
    id: '1',
    title: t('DiscoverEngineers'),
    img: require('../../assets/images/eng.jpg'),
    description: 'Connect instantly with verified professionals for any construction project.'
  },
  {
    id: '2',
    title: 'Compare & Choose',
    img: require('../../assets/images/weigh.jpg'),
    description: 'Browse profiles, check ratings, and pick the engineer that fits your needs.'
  },
  {
    id: '3',
    title: 'Manage Projects Easily',
    img: require('../../assets/images/mge.jpg'),
    description: 'Chat, share documents, and follow up on your construction work in one placeour integrated tools.'
  },
  {
    id: '4',
    title: 'Reliable & Secure',
    img: require('../../assets/images/secure.jpg'),
    description: 'Every engineer is screened to ensure quality, safety, and professionalism.'
  },
];

  const handleOnScroll = (event: any) => {
    Animated.event([
      {
        nativeEvent: {
          contentOffset: { x: scollX }
        }
      }
    ],
      { useNativeDriver: false })(event);
  }

  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} img={item.img} description={item.description} />}
          keyExtractor={item => item.id}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment='center'
          onScroll={handleOnScroll}
 
        />
        <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
          <Pagination data={DATA} scrollX={scollX} />
          <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate(Routes.GETSTARTED)}>
            <Text style={{ color: Colors.titles }}>skip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default CarrouselScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height
  },
  image: {
    width: width,
    flex: 0.6,
    marginTop: 20,
  },
  title: {
    fontSize: FontSize.titles,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.titles,
  },
  itemContainer: {
    alignContent: 'center',
    alignItems: 'center',
    width: width,
    padding: 20,
    flex: 0.5,
    marginTop: 20,
  },
  description: {
    fontSize: FontSize.description,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  skipBtn: {
    position: 'absolute',
    bottom: 49,
    flexDirection: 'row',
    justifyContent: 'center',
    right: -170,
  },
  logo:{
    position:'absolute',
    width:150,
    height:150,
    top:-60,
  }

})