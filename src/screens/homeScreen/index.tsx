import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { width } from '../../utils/tools'
import { Colors } from '../../utils/styles'
import { Bell, Search, Settings, User } from 'lucide-react-native'
import { number } from 'react-i18next/icu.macro'

type Itemprops = {
  id: number,
  title: string,
  img: ImageSourcePropType
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

const Item = ({ title, img }: Itemprops) => (
  <View style={styles.itemContainer}>
   <View style={styles.imageWrapper}>
      <Image
        source={img}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
    <Text style={{textAlign:'center', fontSize:10}}>{title}</Text>
  </View>
)

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
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
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginTop: 15 }}>
          <TouchableOpacity>
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
      <View style={{ backgroundColor:"#fff" , marginTop:10}}> 
       <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:5}}>
         <Text style={{ marginTop: 15 }}>services (engineering)</Text>
         <TouchableOpacity>
          <Text style={{ marginTop: 15, color:Colors.success }}>more</Text>
         </TouchableOpacity>
       </View>
        <FlatList
          data={services}
          renderItem={({ item }) => <Item id={item.id} title={item.title} img={item.img} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={5}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingHorizontal: 2 }}
          style={{ borderWidth:0.2, borderRadius:10,marginTop:10,borderColor:'gray'}}
        />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: { flex: 1, alignContent: 'center', paddingHorizontal: 15, backgroundColor: '#fff', width: width },
  image: {height:64, width:64},
  itemContainer:{height:92, flex:1, alignItems:'center', marginHorizontal:0, marginTop:6},
  imageWrapper: {height: 65,
  width: 65,
  borderRadius: 14,
  overflow: 'hidden',
  backgroundColor:'#fff',
  borderWidth:0.2,
  borderColor:'#606060',
  marginTop:5,
},
})