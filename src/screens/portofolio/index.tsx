import { FlatList, Image, ImageProps, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import CustomeHeader from '../../components/CustomeHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, FontSize } from '../../utils/styles';


type portofolioProps = {
  img: ImageProps,
  type: string,
  title: string
}

const Portofolios: portofolioProps[] = [
  {
    img: require('../../assets/images/getStarted.jpg'),
    type: "story building",
    title: "Residential building in Douala"
  },
  {
    img: require('../../assets/images/structure.jpg'),
    type: "story building",
    title: "Residential building in Douala"
  },
  {
    img: require('../../assets/images/structure.jpg'),
    type: "story building",
    title: "Residential building in Douala"
  },
  {
    img: require('../../assets/images/structure.jpg'),
    type: "story building",
    title: "Residential building in Douala"
  },
  {
    img: require('../../assets/images/structure.jpg'),
    type: "story building",
    title: "Residential building in Douala"
  },
]


const PortofolioScreen = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <CustomeHeader text='My portofolio' />
      <View>
        <Text style={{ paddingHorizontal: 10, marginVertical: 5, fontWeight: '500' }}>A collection of my projects</Text>
        <FlatList
          data={Portofolios}
          renderItem={({item,index}) => (
            <Pressable style={styles.portofolioCard}>
              <Image
                source={item.img}
                height={hp('10%')}
                style={{ height: hp('15%') }}
                // resizeMode=
              />
              <View style={{ justifyContent: 'flex-start', width: wp('90%') }}>
                <Text style={{ textAlign: 'left', color: Colors.textSecondary, fontStyle: 'italic' }}>{item.type}</Text>
                <Text style={{ fontSize: FontSize.md, fontWeight: '500' }}>{item.title}</Text>
              </View>
            </Pressable>
          )}
          scrollEnabled
          // keyExtractor={({index}) => }
          style={{}}
        />
        <View style={styles.portofolioCard}>
          <Image
            source={require('../../assets/images/structure.jpg')}
            height={hp('10%')}
            style={{ height: hp('15%') }}
            resizeMode='center'
          />
          <View style={{ justifyContent: 'flex-start', width: wp('90%') }}>
            <Text style={{ textAlign: 'left', color: Colors.textSecondary, fontStyle: 'italic' }}>duplex construction</Text>
            <Text style={{ fontSize: FontSize.md, fontWeight: '500' }}>Residential building in Douala Bonamoussadi</Text>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  )
}

export default PortofolioScreen

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  portofolioCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: hp('1%'),
    marginHorizontal: wp('2%'),
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: wp('96%'),
    flexDirection: 'column',
    alignContent: 'center',
    padding: 5
  },
})