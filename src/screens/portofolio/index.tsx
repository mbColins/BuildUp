import { FlatList, Image, ImageProps, Pressable, StyleSheet, Text, View, Modal, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomeHeader from '../../components/CustomeHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, FontSize } from '../../utils/styles';
import { ChevronLeft } from 'lucide-react-native';


type portfolioProps = {
  img: ImageProps,
  type: string,
  title: string,
  description?: string,
  images?: ImageProps[]
}

const Portfolios: portfolioProps[] = [
  {
    img: require('../../assets/images/getStarted.jpg'),
    type: "Residential Building",
    title: "Modern Residential Building in Douala",
    description: "A 5-story residential complex with modern architecture and sustainable design features.",
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
    type: "Commercial Complex",
    title: "Office Complex in Douala",
    description: "State-of-the-art commercial building with offices and retail spaces.",
    images: [
      require('../../assets/images/structure.jpg'),
      require('../../assets/images/getStarted.jpg'),
      require('../../assets/images/structure.jpg'),
    ]
  },
  {
    img: require('../../assets/images/structure.jpg'),
    type: "Industrial Facility",
    title: "Manufacturing Plant in Limbe",
    description: "Large-scale industrial facility with modern infrastructure.",
    images: [
      require('../../assets/images/structure.jpg'),
      require('../../assets/images/getStarted.jpg'),
    ]
  },
]


const PortfolioScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<portfolioProps | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);

  const handleCardPress = (portfolio: portfolioProps) => {
    setSelectedPortfolio(portfolio);
    setSelectedImage(portfolio.images ? portfolio.images[0] : portfolio.img);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomeHeader text='My Portfolio' />
      <View style={styles.contentContainer}>
        <Text style={styles.descriptionText}>A collection of my completed projects</Text>
        <FlatList
          data={Portfolios}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable
              style={styles.portfolioCard}
              onPress={() => handleCardPress(item)}
            >
              <Image
                source={item.img}
                style={styles.cardImage}
                resizeMode='cover'
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardType}>{item.type}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                {item.description && <Text style={styles.cardDescription}>{item.description}</Text>}
              </View>
            </Pressable>
          )}
          scrollEnabled
          nestedScrollEnabled
        />
      </View>

      {/* Project Details Modal */}
      <Modal
        visible={modalVisible}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Header with Back Button */}
          <View style={styles.modalHeader}>
            <Pressable
              style={styles.backButton}
              onPress={() => setModalVisible(false)}
            >
              <ChevronLeft size={28} color='#000' />
            </Pressable>
            <Text style={styles.modalHeaderTitle}>Project Details</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
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

            {/* Project Information */}
            {selectedPortfolio && (
              <View style={styles.projectInfoContainer}>
                <Text style={styles.projectType}>{selectedPortfolio.type}</Text>
                <Text style={styles.projectTitle}>{selectedPortfolio.title}</Text>
                {selectedPortfolio.description && (
                  <Text style={styles.projectDescription}>{selectedPortfolio.description}</Text>
                )}
              </View>
            )}

            {/* Project Gallery */}
            {selectedPortfolio && selectedPortfolio.images && (
              <View style={styles.galleryContainer}>
                <Text style={styles.galleryTitle}>Gallery</Text>
                <View style={styles.thumbnailGrid}>
                  {selectedPortfolio.images.map((image, index) => (
                    <Pressable
                      key={index}
                      onPress={() => setSelectedImage(image)}
                      style={[
                        styles.thumbnailItem,
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
                </View>
              </View>
            )}

            <View style={{ height: hp('2%') }} />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}

export default PortfolioScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
    paddingHorizontal: wp('2%'),
    marginBottom: hp('1.5%'),
  },
  
  // Portfolio Card Styles
  portfolioCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: hp('1%'),
    marginHorizontal: wp('1%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  cardImage: {
    width: '100%',
    height: hp('20%'),
    backgroundColor: '#f0f0f0',
  },
  cardContent: {
    padding: wp('4%'),
  },
  cardType: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: hp('0.5%'),
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: hp('0.8%'),
    lineHeight: 22,
  },
  cardDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: wp('2%'),
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  modalScroll: {
    flex: 1,
  },
  mainImageContainer: {
    width: '100%',
    height: hp('50%'),
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  projectInfoContainer: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  projectType: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: hp('0.5%'),
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: hp('1%'),
    lineHeight: 28,
  },
  projectDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },

  // Gallery Styles
  galleryContainer: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2.5%'),
  },
  galleryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: hp('1.5%'),
  },
  thumbnailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp('2%'),
  },
  thumbnailItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'transparent',
    backgroundColor: '#f0f0f0',
  },
  selectedThumbnail: {
    borderColor: Colors.success,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
})