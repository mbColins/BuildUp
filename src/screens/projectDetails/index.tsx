import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomeHeader from '../../components/CustomeHeader'
import { Colors, FontSize, FontWeight, Spacing, Radius } from '../../utils/styles'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Star, MessageSquare, User, Calendar, MapPin, Award, Route } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp, Routes } from '../../utils/tools'

interface Milestone {
  id: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'pending'
}

interface Review {
  id: string
  engineerName: string
  rating: number
  comment: string
  date: string
}

const ProjectDetailScreen = () => {
  const navigation = useNavigation<NavigationProp>()
  const [isSaved, setIsSaved] = useState(false)

  // Mock Data
  const projectData = {
    id: '1',
    title: 'Highway Expansion & Bridge Construction',
    category: 'Civil Engineering',
    image: require('../../assets/images/eng.jpg'),
    budget: 250000,
    duration: '18 months',
    status: 'In Progress',
    progress: 45,
    description:
      'Construction and design of a new 8-lane highway expansion project with a modern steel-cable suspension bridge spanning 450 meters. The project includes site preparation, foundation work, structural design, traffic management systems, and environmental impact mitigation. All work must comply with international building codes and safety standards.',
    technologies: ['AutoCAD', 'BIM', 'STAAD Pro', 'Civil 3D', 'QGIS', 'SAP2000'],
    engineer: {
      id: '1',
      name: 'Robert Martinez',
      avatar: require('../../assets/images/eng.jpg'),
      specialty: 'Civil Engineer',
      experienceYears: 12,
      rating: 4.9,
      reviewCount: 31,
    },
    milestones: [
      {
        id: '1',
        title: 'Site Survey & Soil Investigation',
        description: 'Geological survey and soil testing',
        status: 'completed',
      },
      {
        id: '2',
        title: 'Structural Design & Engineering',
        description: 'Complete design and structural analysis',
        status: 'in-progress',
      },
      {
        id: '3',
        title: 'Foundation & Excavation Work',
        description: 'Excavation and foundation pouring',
        status: 'pending',
      },
      {
        id: '4',
        title: 'Bridge & Main Structure Construction',
        description: 'Build bridge and main highway structure',
        status: 'pending',
      },
      {
        id: '5',
        title: 'Road Finishing & Safety Systems',
        description: 'Asphalt laying, markings, and safety installations',
        status: 'pending',
      },
    ] as Milestone[],
    reviews: [
      {
        id: '1',
        engineerName: 'Ahmed Hassan',
        rating: 5,
        comment: 'Outstanding structural design and project management. Very detail-oriented.',
        date: '1 month ago',
      },
      {
        id: '2',
        engineerName: 'Elena Garcia',
        rating: 5,
        comment: 'Excellent coordination with contractors and safety protocols.',
        date: '2 months ago',
      },
      {
        id: '3',
        engineerName: 'David Chen',
        rating: 4,
        comment: 'Professional approach and comprehensive documentation.',
        date: '3 months ago',
      },
    ] as Review[],
  }

  const handleMessageEngineer = () => {
    // Navigate back to home (BottomTab) and then to messages
    navigation.navigate('home' as any, { screen: 'messages' })
    console.log('Message engineer:', projectData.engineer.name)
  }

  const renderMilestone = ({ item }: { item: Milestone }) => {
    const statusColors = {
      completed: Colors.success,
      'in-progress': Colors.primary,
      pending: Colors.textSecondary,
    }

    return (
      <View style={styles.milestoneCard}>
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: statusColors[item.status] },
          ]}
        />
        <View style={styles.milestoneContent}>
          <Text style={styles.milestoneTitle}>{item.title}</Text>
          <Text style={styles.milestoneDescription}>{item.description}</Text>
          <Text
            style={[
              styles.milestoneStatus,
              { color: statusColors[item.status] },
            ]}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
    )
  }

  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View>
          <Text style={styles.reviewerName}>{item.engineerName}</Text>
          <Text style={styles.reviewDate}>{item.date}</Text>
        </View>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              color={i < item.rating ? Colors.star : '#CCCCCC'}
              fill={i < item.rating ? Colors.star : 'transparent'}
            />
          ))}
        </View>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  )

  const renderTechTag = (tech: string, index: number) => (
    <View key={index} style={styles.techTag}>
      <Text style={styles.techText}>{tech}</Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <CustomeHeader text="Project Details" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Project Image */}
        <View style={styles.imageContainer}>
          <Image
            source={projectData.image}
            style={styles.projectImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setIsSaved(!isSaved)}
          >
            <Text style={styles.saveButtonText}>{isSaved ? '♥' : '♡'}</Text>
          </TouchableOpacity>
        </View>

        {/* Project Title & Status */}
        <View style={styles.headerSection}>
          <View>
            <Text style={styles.projectTitle}>{projectData.title}</Text>
            <Text style={styles.category}>{projectData.category}</Text>
          </View>
        </View>

        {/* Status & Progress */}
        <View style={styles.statusSection}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{projectData.status}</Text>
          </View>
          <View style={styles.progressSection}>
            <Text style={styles.progressLabel}>Progress</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${projectData.progress}%` },
                ]}
              />
            </View>
            <Text style={styles.progressPercent}>{projectData.progress}%</Text>
          </View>
        </View>

        {/* Key Details */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailCard}>
            <View style={styles.detailIcon}>
              <Award size={20} color={Colors.primary} />
            </View>
            <Text style={styles.detailLabel}>Budget</Text>
            <Text style={styles.detailValue}>${projectData.budget.toLocaleString()}</Text>
          </View>
          <View style={styles.detailCard}>
            <View style={styles.detailIcon}>
              <Calendar size={20} color={Colors.primary} />
            </View>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{projectData.duration}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{projectData.description}</Text>
        </View>

        {/* Technologies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technologies</Text>
          <View style={styles.techContainer}>
            {projectData.technologies.map((tech, index) =>
              renderTechTag(tech, index)
            )}
          </View>
        </View>

        {/* Engineer Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assigned Engineer</Text>
          <View style={styles.engineerCard}>
            <Image
              source={projectData.engineer.avatar}
              style={styles.engineerAvatar}
            />
            <View style={styles.engineerInfo}>
              <Text style={styles.engineerName}>{projectData.engineer.name}</Text>
              <Text style={styles.engineerSpecialty}>
                {projectData.engineer.specialty}
              </Text>
              <View style={styles.engineerMeta}>
                <Star
                  size={14}
                  color={Colors.star}
                  fill={Colors.star}
                />
                <Text style={styles.engineerRating}>
                  {projectData.engineer.rating} ({projectData.engineer.reviewCount} reviews)
                </Text>
              </View>
              <View style={styles.engineerMetaRow}>
                <Award size={14} color={Colors.textSecondary} />
                <Text style={styles.experienceText}>
                  {projectData.engineer.experienceYears} years experience
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Milestones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Milestones</Text>
          <FlatList
            data={projectData.milestones}
            renderItem={renderMilestone}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Engineer Reviews</Text>
            <Text style={styles.reviewCount}>
              {projectData.reviews.length}
            </Text>
          </View>
          <FlatList
            data={projectData.reviews}
            renderItem={renderReview}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Spacer for button */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Message Button */}
      <TouchableOpacity
        style={styles.messageButton}
        onPress={handleMessageEngineer}
      >
        <MessageSquare size={20} color="#fff" />
        <Text style={styles.messageButtonText}>Message Engineer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ProjectDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    position: 'relative',
    width: wp('100%'),
    height: hp('25%'),
  },
  projectImage: {
    width: '100%',
    height: '100%',
  },
  saveButton: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  headerSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  projectTitle: {
    fontSize: FontSize.description,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  category: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
  },
  statusSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  statusBadge: {
    backgroundColor: `${Colors.success}20`,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: Colors.success,
    fontWeight: FontWeight.semibold,
    fontSize: FontSize.sm,
  },
  progressSection: {
    gap: Spacing.xs,
  },
  progressLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.semibold,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
  },
  progressPercent: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  detailsGrid: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  detailCard: {
    flex: 1,
    backgroundColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  detailIcon: {
    marginBottom: Spacing.sm,
  },
  detailLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  detailValue: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  techTag: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.xl,
  },
  techText: {
    color: '#fff',
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  engineerCard: {
    flexDirection: 'row',
    backgroundColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  engineerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  engineerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  engineerName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  engineerSpecialty: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginVertical: Spacing.xs,
  },
  engineerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginVertical: Spacing.xs,
  },
  engineerRating: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  engineerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  experienceText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  milestoneCard: {
    flexDirection: 'row',
    backgroundColor: Colors.border,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.md,
    alignItems: 'flex-start',
  },
  statusIndicator: {
    width: 4,
    height: '100%',
    borderRadius: Radius.sm,
    marginTop: Spacing.sm,
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  milestoneDescription: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  milestoneStatus: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  reviewCount: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  reviewCard: {
    backgroundColor: Colors.border,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  reviewerName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  reviewDate: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewComment: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  bottomSpacer: {
    height: Spacing.lg,
  },
  messageButton: {
    position: 'absolute',
    bottom: 0,
    left: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: Colors.success,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
    height: 56,
  },
  messageButtonText: {
    color: '#fff',
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
})
