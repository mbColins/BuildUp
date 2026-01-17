import { ImageBackground, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../utils/styles'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { HardHat, Map, MapPin, UtilityPole } from 'lucide-react-native';



type recentProjectsProps = {
    id: number
    title: string
    description: string
    category: 'kitchen' | 'bathroom' | 'roof' | 'structural'
    location: string
    city: string
    status: 'completed' | 'ongoing'
    durationWeeks: number
    budgetXaf?: number

    engineerName: string
    engineerAvatar: ImageSourcePropType

    rating: number
    reviewsCount: number
    beforeImg: ImageSourcePropType
    afterImg: ImageSourcePropType
    gallery?: ImageSourcePropType[]

    createdAt: string
    onPress: () => void
}

type RecentProjectsCardProps = {
  item: recentProjectsProps
  onPress: () => void
}


const RecentProjectsCard = ({ item, onPress }: RecentProjectsCardProps) => {
  return (
    <Pressable style={styles.projectCard} onPress={onPress}>

      {/* Header */}
      <View style={styles.header}>
        <HardHat size={16} color={Colors.success} />
        <Text style={styles.title}>{item.title}</Text>
      </View>

      {/* Images */}
      <View style={styles.projectImages}>
        <ImageBackground source={item.beforeImg} style={styles.projectImage}>
          <View style={styles.imageLabel}>
            <Text style={styles.imageLabelText}>BEFORE</Text>
          </View>
        </ImageBackground>

        <ImageBackground source={item.afterImg} style={styles.projectImage}>
          <View style={styles.imageLabel}>
            <Text style={styles.imageLabelText}>AFTER</Text>
          </View>
        </ImageBackground>
      </View>

      {/* Meta info */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <MapPin size={12} color={Colors.success} />
          <Text style={styles.metaText}>{item.location}</Text>
        </View>

        <View style={styles.metaItem}>
          <UtilityPole size={12} color={Colors.success} />
          <Text style={styles.metaText}>{item.category}</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>{item.description}</Text>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Budget: {item.budgetXaf} XAF
          </Text>
        </View>

        <Text style={styles.footerText}>
          Engineer: {item.engineerName}
        </Text>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>{item.createdAt}</Text>
          <Text
            style={[
              styles.status,
              { color: item.status === 'completed' ? Colors.success : Colors.error },
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>

    </Pressable>
  )
}


export default RecentProjectsCard

const styles = StyleSheet.create({

  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginVertical: 8,
    elevation: 2,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
  },

  projectImages: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 6,
  },

  projectImage: {
    height: 90,
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },

  imageLabel: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 2,
    alignItems: 'center',
  },

  imageLabelText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },

  metaRow: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 4,
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  metaText: {
    fontSize: 12,
    color: Colors.success,
  },

  description: {
    fontSize: 12,
    color: '#444',
    marginVertical: 4,
  },

  footer: {
    marginTop: 6,
    gap: 4,
  },

  badge: {
    backgroundColor: Colors.success,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },

  badgeText: {
    fontSize: 12,
    color: '#fff',
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  footerText: {
    fontSize: 11,
    color: '#666',
    fontWeight:'500'
  },

  status: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
})



