import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomeHeader from '../../components/CustomeHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../utils/styles';
import { ArrowRight, CircleArrowRight, MapPin,Star } from 'lucide-react-native';
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
    description: 'Rsidential building project: Managed 1M xaf and delivered the project on time'
  },
  {
    id: 2,
    description: 'Industrial facility insfratstructure: Designed and supervised construction'
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
    certificate: " Bachelo in civil engineering, University of Douala(2015)"
  },
  {
    id: 2,
    certificate: " Professional engineer(PE) liscense cameroon (2018)"
  },
]


const EngineerDetails = () => {

  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>()

  return (
    <SafeAreaView style={styles.container}>
      <CustomeHeader text='Engineer profile' />
      <View style={styles.engContainer}>
        <Image
          source={require('../../assets/images/structure.jpg')}
          style={styles.engProfileImg}
          resizeMode='stretch'
        />
        <View style={{ padding: 4, flexDirection: 'row', gap: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: '500' }}>John doe,</Text>
          <Text style={{ fontSize: 15, fontWeight: '500', fontStyle: 'italic', color: Colors.textSecondary }}>doe@gmail.com,</Text>
          <Text style={{ fontSize: 15, fontWeight: '500', fontStyle: 'italic', color: Colors.success }}>civil engineer</Text>
        </View>
      </View>
      <ScrollView style={styles.engDetails}>
        <Text style={{ marginTop: 10, fontSize: 20 }}>Bio/Summary</Text>
        <View style={styles.educationCard}>
          <Text style={{ padding: 5, fontSize: 14 }}>Expericed civil engineery with 5+ years of experience in construction project management, specializing in residential and industrial iprojects in cameroon</Text>
        </View>

        <Text style={{ marginTop: 10, fontSize: 20 }}>Work experience</Text>
        <View style={styles.educationCard}>
          {
            WorkExperience.map((item) => (
              <Text style={{ padding: 5, fontSize: 14, width: wp('90%') }}><CircleArrowRight size={15} /> {item.experience}</Text>
            ))
          }
        </View>
        <Text style={{ marginTop: 10, fontSize: 20 }}>Skills</Text>
        <View style={styles.educationCard}>
          {
            Skils.map((item) => (
              <Text style={{ padding: 5, fontSize: 14, width: wp('90%') }}><CircleArrowRight size={15} /> {item.skill} </Text>
            ))
          }
        </View>

        <Text style={{ marginTop: 10, fontSize: 20 }}>Portofolio/Projects</Text>
        <View style={styles.educationCard}>
          {
            Projects.map((item) => (
              <Text style={{ padding: 5, fontSize: 14, width: wp('90%') }}><CircleArrowRight size={15} /> {item.description} </Text>
            ))
          }
          <View>
            <TouchableOpacity
            onPress = {() => navigation.navigate(Routes.PORTOFOLIO)}
            style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 10, padding: 4 }}>
              <Text style={{ color: Colors.success, fontStyle: 'italic' }}>visit my portofolio for more details</Text>
              <ArrowRight color={Colors.success} size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ marginTop: 10, fontSize: 20 }}>Ratings & Review</Text>
        <View style={styles.educationCard}>
          <Text>Reviews ({Ratings.length})</Text>
          {
            Ratings.map((item) => (
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0.3, borderRadius: 10, padding: 4, borderColor: Colors.textSecondary, margin: 4, width: wp('90%') }}>
                <View>
                  <Text style={{ width: wp('75%') }}>{item.rate}</Text>
                  <Text style={{ fontWeight: '500', marginTop: 4 }}>{item.client}</Text>
                </View>
                <Text><Star size={14} color={Colors.star} /> ({item.star}) </Text>
              </View>
            )).slice(0, 4)
          }
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: '10', justifyContent: 'center', marginTop: 5 }}>
            <Text style={{ color: Colors.success }}>see what users say about john doe</Text>
            <ArrowRight size={20} color={Colors.success} />
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 10, fontSize: 20 }}>Education & Certification</Text>
        <View style={styles.educationCard}>
          {
            Certifications.map((item) => (
              <Text style={{ padding: 5, fontSize: 14, width: wp('90%') }}><CircleArrowRight size={15} /> {item.certificate} </Text>
            ))
          }
        </View>
        <Text style={{ marginTop: 10, fontSize: 20 }}>Pricing</Text>
        <View style={styles.educationCard}>
          <Text style={{ padding: 5, fontSize: 14, width: wp('90%') }}><CircleArrowRight size={15} /> Pricing  is fixed based on the project and the town where where the poject have to be realised</Text>
        </View>
        <Text style={{ marginTop: 10, fontSize: 20 }}>Location & Availability</Text>
        <View style={styles.educationCard}>
          <View style={{ display: 'flex', flexDirection: 'row', width: wp('90%'), justifyContent: 'space-between' }}>
            <View style={{ width: wp('70%') }}>
              <Text style={{ padding: 5, fontSize: 14, width: wp('70%') }}><CircleArrowRight size={15} /> Douala, Cameroon, Akwa-nord</Text>
              <Text style={{ padding: 5, fontSize: 14, width: wp('70%') }}><CircleArrowRight size={15} /> Tel: 657 15 93 01</Text>
              <Text style={{ padding: 5, fontSize: 14, width: wp('70%') }}><CircleArrowRight size={15} /> Open from Monday - Friday, 8AM - 5PM</Text>
            </View>
            <Pressable>
              <MapPin color={Colors.success} />
            </Pressable>
          </View>
          <Text style={{ textAlign: 'center', color: Colors.success }}>Available for all your construction works</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EngineerDetails

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  engContainer: { display: 'flex', flexDirection: 'column', borderBottomWidth: 0.3, borderColor: Colors.textSecondary, alignItems: 'center', backgroundColor: "#f8fcf8" },
  engProfileImg: { height: hp('15'), width: wp('40'), borderRadius: 15, marginTop: 8 },
  engDetails: { paddingHorizontal: wp('2%') },
  educationCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: hp('1%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: wp('95%'),
    flexDirection: 'column',
    alignContent: 'center',
    padding: 5
  },
})