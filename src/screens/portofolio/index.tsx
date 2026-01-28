import { FlatList, Image, ImageProps, Pressable, StyleSheet, Text, View, Modal, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomeHeader from '../../components/CustomeHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, FontSize } from '../../utils/styles';
import { X } from 'lucide-react-native';


type portofolioProps = {
  img: ImageProps,
  type: string,
  title: string,
  images?: ImageProps[]
}

const Portofolios: portofolioProps[] = [
  {
    img: require('../../assets/images/getStarted.jpg'),
    type: "story building",
    title: "Residential building in Douala",
    images: [
      require('../../assets/images/getStarted.jpg'),
      require('../../assets/images/str.jpg'),
      require('../../assets/images/structure.jpg'),
      require('../../assets/images/weigh.jpg'),
      require('../../assets/images/eng.jpg'),
    ]
  },
  {
    img: require('../../assets/images/structure.jpg'),
    type: "story building",
    title: "Residential building in Douala",
    images: [
      require('../../assets/images/structure.jpg'),
      require('../../assets/images/getStarted.jpg'),
      require('../../assets/images/structure.jpg'),
    ]
  },
  {
    img: require('../../assets/images/structure.jpg'),
    type: "story building",
    title: "Residential building in Douala",
    images: [
      require('../../assets/images/structure.jpg'),
      require('../../assets/images/getStarted.jpg'),
    ]
  },
  {
    img: require('../../assets/images/structure.jpg'),
    type: "story building",
    title: "Residential building in Douala",
    images: [
      require('../../assets/images/structure.jpg'),
      require('../../assets/images/structure.jpg'),
    ]
  },
  {
    img: require('../../assets/images/structure.jpg'),
    type: "story building",
    title: "Residential building in Douala",
    images: [
      require('../../assets/images/structure.jpg'),
      require('../../assets/images/getStarted.jpg'),
    ]
  },
  {
    img: require('../../assets/images/structure.jpg'),
    type: "story building",
    title: "Residential building in Douala",
    images: [
      require('../../assets/images/structure.jpg'),
      require('../../assets/images/structure.jpg'),
    ]
  },
]


const PortofolioScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<portofolioProps | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);

  const handleCardPress = (portfolio: portofolioProps) => {
    setSelectedPortfolio(portfolio);
    setSelectedImage(portfolio.images ? portfolio.images[0] : portfolio.img);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomeHeader text='My portofolio' />
      <View>
        <Text style={{ paddingHorizontal: 10, marginVertical: 5, fontWeight: '500' }}>A collection of my projects</Text>
        <FlatList
          data={Portofolios}
          renderItem={({ item, index }) => (
            <Pressable
              style={styles.portofolioCard}
              onPress={() => handleCardPress(item)}
            >
              <Image
                source={item.img}
                height={hp('10%')}
                style={{ height: hp('15%') }}
              />
              <View style={{ justifyContent: 'flex-start', width: wp('90%') }}>
                <Text style={{ textAlign: 'left', color: Colors.textSecondary, fontStyle: 'italic' }}>{item.type}</Text>
                <Text style={{ fontSize: FontSize.md, fontWeight: '500' }}>{item.title}</Text>
              </View>
            </Pressable>
          )}
          scrollEnabled
          style={{}}
        />
        <Pressable
          style={styles.portofolioCard}
          onPress={() => {
            const lastPortfolio = Portofolios[Portofolios.length - 1];
            handleCardPress(lastPortfolio);
          }}
        >
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
        </Pressable>
      </View>

      {/* Image Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Close Button */}
          <View style={{ alignItems: 'flex-end', paddingHorizontal: 15}}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <X size={28} color={Colors.black} />
            </Pressable>
          </View>

          {/* Main Image Display */}
          <View style={styles.mainImageContainer}>
            {selectedImage && (
              <Image
                source={selectedImage}
                style={styles.mainImage}
                resizeMode="cover"
              />
            )}
          </View>

          {/* Project Title */}
          {selectedPortfolio && (
            <View style={styles.projectInfoContainer}>
              <Text style={styles.projectType}>{selectedPortfolio.type}</Text>
              <Text style={styles.projectTitle}>{selectedPortfolio.title}</Text>
            </View>
          )}

          {/* Scrollable Thumbnails */}
          {selectedPortfolio && selectedPortfolio.images && (
            <View style={styles.thumbnailContainer}>
              <Text style={styles.thumbnailLabel}>Project Images</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.thumbnailScroll}
              >
                {selectedPortfolio.images.map((image, index) => (
                  <Pressable
                    key={index}
                    onPress={() => setSelectedImage(image)}
                    style={[
                      styles.thumbnail,
                      selectedImage === image && styles.selectedThumbnail
                    ]}
                  >
                    <Image
                      source={image}
                      style={styles.thumbnailImage}
                      resizeMode="cover"
                    />
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
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
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  closeButton: {
    padding: 5,
    justifyContent: 'center',
    position: 'absolute',
    top: hp('2%'),
    right: wp('4%'),
    zIndex: 1,
  },
  mainImageContainer: {
    height: hp('70%'),
    width: '100%',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  projectInfoContainer: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  projectType: {
    color: Colors.textSecondary,
    fontStyle: 'italic',
    fontSize: 12,
    marginBottom: 5,
  },
  projectTitle: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  thumbnailContainer: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    backgroundColor:'#e6e2e2b4'
  },
  thumbnailLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: hp('1.5%'),
    color: Colors.textPrimary,
  },
  thumbnailScroll: {
    flexGrow: 0,
  },
  thumbnail: {
    width: wp('20%'),
    height: hp('12%'),
    borderRadius: 8,
    marginRight: wp('2%'),
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: Colors.primary,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
})