import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React from 'react'
import CustomeHeader from '../../components/CustomeHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, FontSize } from '../../utils/styles';
import { ArrowRight, CircleArrowRight, MapPin, Star, MessageCircle } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, Routes } from '../../utils/tools';
import { SafeAreaView } from 'react-native-safe-area-context';

type workExperienceProps = {
  id: number,
  experience: string
}

type skilProps = {
  id: number,
  skill: string
}

type portofolioProps = {
  id: number,
  description: string
}

type ratingProps = {
  id: number,
  rate: string,
  client: string,
  star: number
}

type certificationProps = {
  id: number,
  certificate: string
}

const WorkExperience: workExperienceProps[] = [
  {
    id: 1,
    experience: "Project Manager, Jumbe construction (2018 - 2022)"
  },
  {
    id: 2,
    experience: " Site engineer, NovaBuilding insfratstructure (2015 - 2018)"
  },
]

const Skils: skilProps[] = [
  {
    id: 1,
    skill: "AutoCad"
  },
  {
    id: 2,
    skill: "Revit"
  },
  {
    id: 3,
    skill: "STAAD"
  },
  {
    id: 4,
    skill: "project management"
  },
  {
    id: 5,
    skill: "Structural Design"
  },
  {
    id: 6,
    skill: "Cost estimation"
  },
]

const Projects: portofolioProps[] = [
  {
    id: 1,
    description: 'Residential building project: Managed 1M XAF and delivered the project on time'
  },
  {
    id: 2,
    description: 'Industrial facility infrastructure: Designed and supervised construction'
  },
]

const Ratings: ratingProps[] = [
  {
    id: 1,
    rate: 'John delivers quality Work on time',
    client: "Client A",
    star: 4
  },
  {
    id: 2,
    rate: 'John delivers quality Work on time',
    client: "Client B",
    star: 4
  },
  {
    id: 3,
    rate: 'Excelent commumication and project management',
    client: "Client C",
    star: 4
  },
]

const Certifications: certificationProps[] = [
  {
    id: 1,
    certificate: "Bachelor in civil engineering, University of Douala (2015)"
  },
  {
    id: 2,
    certificate: "Professional Engineer (PE) license cameroon (2018)"
  },
]


// Reusable Section Card Component
const SectionCard = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.sectionCard}>
    {children}
  </View>
);

// Reusable List Item Component
const ListItem = ({ text }: { text: string }) => (
  <View style={styles.listItem}>
    <CircleArrowRight size={15} color={Colors.success} />
    <Text style={styles.listItemText}>{text}</Text>
  </View>
);

// Reusable Section Title Component
const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const EngineerDetails = () => {

  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();

  const handleContact = () => {
    Alert.alert('Contact Engineer', 'Choose communication method:', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      { text: 'Call', onPress: () => Alert.alert('Call', '657 15 93 01') },
      { text: 'Message', onPress: () => navigation.navigate(Routes.MESSAGEDETAILS) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomeHeader text='Engineer Profile' />
      
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={require('../../assets/images/structure.jpg')}
          style={styles.profileImage}
          resizeMode='cover'
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileRole}>Civil Engineer</Text>
          <Text style={styles.profileEmail}>doe@gmail.com</Text>
          <View style={styles.ratingBadge}>
            <Star size={14} color={Colors.star} fill={Colors.star} />
            <Text style={styles.ratingText}>4.5 (12 reviews)</Text>
          </View>
        </View>
      </View>

      {/* Contact Button */}
      <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
        <MessageCircle size={20} color='white' />
        <Text style={styles.contactButtonText}>Contact Now</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Bio Section */}
        <SectionTitle title='About' />
        <SectionCard>
          <Text style={styles.bioText}>
            Experienced civil engineer with 5+ years of experience in construction project management, specializing in residential and industrial projects in Cameroon.
          </Text>
        </SectionCard>

        {/* Work Experience Section */}
        <SectionTitle title='Work Experience' />
        <SectionCard>
          {WorkExperience.map((item) => (
            <ListItem key={item.id} text={item.experience} />
          ))}
        </SectionCard>

        {/* Skills Section */}
        <SectionTitle title='Skills' />
        <SectionCard>
          <View style={styles.skillsGrid}>
            {Skils.map((item) => (
              <View key={item.id} style={styles.skillTag}>
                <Text style={styles.skillText}>{item.skill}</Text>
              </View>
            ))}
          </View>
        </SectionCard>

        {/* Portfolio Section */}
        <SectionTitle title='Portfolio & Projects' />
        <SectionCard>
          {Projects.map((item) => (
            <ListItem key={item.id} text={item.description} />
          ))}
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.PORTOFOLIO)}
            style={styles.viewMoreLink}>
            <Text style={styles.viewMoreText}>View Full Portfolio</Text>
            <ArrowRight color={Colors.success} size={18} />
          </TouchableOpacity>
        </SectionCard>

        {/* Ratings Section */}
        <SectionTitle title={`Ratings & Reviews (${Ratings.length})`} />
        <SectionCard>
          {Ratings.slice(0, 3).map((item) => (
            <View key={item.id} style={styles.reviewCard}>
              <View style={styles.reviewContent}>
                <Text style={styles.reviewText}>{item.rate}</Text>
                <Text style={styles.clientName}>{item.client}</Text>
              </View>
              <View style={styles.reviewRating}>
                <Star size={14} color={Colors.star} fill={Colors.star} />
                <Text style={styles.starCount}>{item.star}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity 
            onPress={() => navigation.navigate(Routes.REVIEWS)}
            style={styles.viewMoreLink}>
            <Text style={styles.viewMoreText}>See All Reviews</Text>
            <ArrowRight color={Colors.success} size={18} />
          </TouchableOpacity>
        </SectionCard>

        {/* Certifications Section */}
        <SectionTitle title='Education & Certifications' />
        <SectionCard>
          {Certifications.map((item) => (
            <ListItem key={item.id} text={item.certificate} />
          ))}
        </SectionCard>

        {/* Pricing Section */}
        <SectionTitle title='Pricing' />
        <SectionCard>
          <Text style={styles.pricingText}>
            Pricing is fixed based on the project scope and the location where the project will be realized.
          </Text>
        </SectionCard>

        {/* Location & Availability */}
        <SectionTitle title='Location & Availability' />
        <SectionCard>
          <View style={styles.locationContent}>
            <View style={styles.locationDetails}>
              <ListItem text='Douala, Cameroon, Akwa-Nord' />
              <ListItem text='Tel: 657 15 93 01' />
              <ListItem text='Monday - Friday, 8AM - 5PM' />
            </View>
            <Pressable style={styles.mapButton}>
              <MapPin color={Colors.success} size={28} />
            </Pressable>
          </View>
          <Text style={styles.availabilityText}>Available for all your construction works</Text>
        </SectionCard>

        <View style={{ height: hp('3%') }} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default EngineerDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  
  // Profile Header Styles
  profileHeader: {
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('4%'),
  },
  profileImage: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: 12,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: hp('0.5%'),
  },
  profileRole: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.success,
    marginBottom: hp('0.3%'),
  },
  profileEmail: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: hp('1%'),
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fff9e6',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    borderRadius: 12,
    width: 'auto',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.star,
  },

  // Contact Button
  contactButton: {
    marginHorizontal: wp('4%'),
    marginVertical: hp('2%'),
    backgroundColor: Colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: hp('1.5%'),
    borderRadius: 25,
    elevation: 3,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  // Scroll Content
  scrollContent: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
  },

  // Section Styles
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: wp('3%'),
    marginBottom: hp('1.5%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  // List Item Styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: wp('2.5%'),
    marginVertical: hp('0.8%'),
    paddingRight: wp('2%'),
  },
  listItemText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
  },

  // Bio Text
  bioText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
    textAlign: 'justify',
  },

  // Skills Grid
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp('2%'),
  },
  skillTag: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.success,
  },
  skillText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.success,
  },

  // View More Links
  viewMoreLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: hp('1.5%'),
    marginTop: hp('1%'),
  },
  viewMoreText: {
    color: Colors.success,
    fontWeight: '600',
    fontSize: 13,
  },

  // Review Card
  reviewCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: wp('3%'),
    marginVertical: hp('0.8%'),
    backgroundColor: '#fafafa',
  },
  reviewContent: {
    flex: 1,
    marginRight: wp('2%'),
  },
  reviewText: {
    fontSize: 13,
    color: '#444',
    lineHeight: 19,
    marginBottom: hp('0.5%'),
  },
  clientName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starCount: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.star,
  },

  // Pricing Text
  pricingText: {
    fontSize: 13,
    color: '#444',
    lineHeight: 20,
    textAlign: 'justify',
  },

  // Location Content
  locationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  locationDetails: {
    flex: 1,
  },
  mapButton: {
    padding: wp('2%'),
    marginLeft: wp('2%'),
  },
  availabilityText: {
    textAlign: 'center',
    color: Colors.success,
    fontWeight: '600',
    fontSize: 13,
    marginTop: hp('1.5%'),
    paddingTop: hp('1%'),
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});