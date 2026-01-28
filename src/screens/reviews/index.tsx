import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../utils/styles';
import { Star } from 'lucide-react-native';
import CustomeHeader from '../../components/CustomeHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

type ReviewProps = {
  id: number,
  client: string,
  rating: number,
  comment: string,
  date: string,
  project: string
}

const Reviews: ReviewProps[] = [
  {
    id: 1,
    client: "Client A",
    rating: 5,
    comment: "Excellent work! John delivered quality work on time. Very professional and attentive to details. Would definitely hire again.",
    date: "2 weeks ago",
    project: "Residential building in Douala"
  },
  {
    id: 2,
    client: "Client B",
    rating: 4,
    comment: "Great communication and project management. The project was completed within budget. Minor delays at the beginning but resolved quickly.",
    date: "1 month ago",
    project: "Office Complex in Douala"
  },
  {
    id: 3,
    client: "Client C",
    rating: 5,
    comment: "Outstanding service! John is very knowledgeable about civil engineering. He provided valuable suggestions that improved the project outcome.",
    date: "2 months ago",
    project: "Manufacturing Plant in Limbe"
  },
  {
    id: 4,
    client: "Client D",
    rating: 4,
    comment: "Professional and reliable. The work quality is exceptional. Would recommend to anyone looking for a competent civil engineer.",
    date: "3 months ago",
    project: "Apartment Complex in Yaoundé"
  },
  {
    id: 5,
    client: "Client E",
    rating: 5,
    comment: "Fantastic experience working with John. Exceeded expectations in every way. Highly recommended for any construction project.",
    date: "4 months ago",
    project: "Residential building in Douala"
  },
  {
    id: 6,
    client: "Client F",
    rating: 4,
    comment: "Very satisfied with the project completion. Good attention to safety standards and quality assurance throughout the project.",
    date: "5 months ago",
    project: "Commercial Complex"
  },
];

const ReviewScreen = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const averageRating = (Reviews.reduce((sum, review) => sum + review.rating, 0) / Reviews.length).toFixed(1);
  const totalReviews = Reviews.length;

  const filteredReviews = selectedRating 
    ? Reviews.filter(review => review.rating === selectedRating)
    : Reviews;

  const getRatingCounts = () => {
    const counts: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    Reviews.forEach(review => {
      counts[review.rating]++;
    });
    return counts;
  };

  const ratingCounts = getRatingCounts();

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            color={star <= rating ? Colors.star : '#e0e0e0'}
            fill={star <= rating ? Colors.star : '#e0e0e0'}
          />
        ))}
      </View>
    );
  };

  const RatingBar = ({ rating, count }: { rating: number, count: number }) => {
    const percentage = (count / Reviews.length) * 100;
    return (
      <View style={styles.ratingBarRow}>
        <Text style={styles.ratingLabel}>{rating}★</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${percentage}%` }]} />
        </View>
        <Text style={styles.ratingCount}>{count}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomeHeader text='All Reviews' />

      {/* Rating Summary */}
      <View style={styles.ratingSection}>
        <View style={styles.overallRatingContainer}>
          <Text style={styles.averageRating}>{averageRating}</Text>
          <View>
            {renderStars(Math.round(parseFloat(averageRating)))}
            <Text style={styles.totalReviewsText}>{totalReviews} reviews</Text>
          </View>
        </View>

        {/* Rating Breakdown */}
        <View style={styles.ratingBreakdown}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <RatingBar key={rating} rating={rating} count={ratingCounts[rating]} />
          ))}
        </View>
      </View>

      {/* Filter Button */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Filter by Rating:</Text>
        <View style={styles.filterButtons}>
          <Pressable
            style={[
              styles.filterButton,
              selectedRating === null && styles.filterButtonActive
            ]}
            onPress={() => setSelectedRating(null)}
          >
            <Text style={[
              styles.filterButtonText,
              selectedRating === null && styles.filterButtonTextActive
            ]}>
              All
            </Text>
          </Pressable>
          {[5, 4, 3].map((rating) => (
            <Pressable
              key={rating}
              style={[
                styles.filterButton,
                selectedRating === rating && styles.filterButtonActive
              ]}
              onPress={() => setSelectedRating(rating)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedRating === rating && styles.filterButtonTextActive
              ]}>
                {rating}★
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Reviews List */}
      <FlatList
        data={filteredReviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            {/* Header */}
            <View style={styles.reviewHeader}>
              <View style={styles.clientInfo}>
                <View style={styles.clientAvatar}>
                  <Text style={styles.avatarText}>{item.client.charAt(0)}</Text>
                </View>
                <View style={styles.clientDetails}>
                  <Text style={styles.clientName}>{item.client}</Text>
                  <Text style={styles.projectName}>{item.project}</Text>
                </View>
              </View>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>

            {/* Rating */}
            <View style={styles.reviewRatingContainer}>
              {renderStars(item.rating)}
            </View>

            {/* Comment */}
            <Text style={styles.reviewComment}>{item.comment}</Text>

            {/* Helpful Button */}
            <View style={styles.helpfulSection}>
              <Pressable style={styles.helpfulButton}>
                <Text style={styles.helpfulText}>Helpful?</Text>
              </Pressable>
            </View>
          </View>
        )}
        scrollEnabled
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

export default ReviewScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  // Rating Summary Section
  ratingSection: {
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  overallRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('4%'),
    marginBottom: hp('2%'),
  },
  averageRating: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.star,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: hp('0.5%'),
  },
  totalReviewsText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: hp('0.5%'),
  },

  // Rating Breakdown
  ratingBreakdown: {
    gap: hp('1%'),
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
  },
  ratingLabel: {
    width: wp('8%'),
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.star,
    borderRadius: 3,
  },
  ratingCount: {
    width: wp('6%'),
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'right',
  },

  // Filter Section
  filterSection: {
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginBottom: hp('1%'),
  },
  filterButtons: {
    flexDirection: 'row',
    gap: wp('2%'),
  },
  filterButton: {
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.7%'),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  filterButtonActive: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterButtonTextActive: {
    color: '#fff',
  },

  // List Content
  listContent: {
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
  },

  // Review Card
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: wp('4%'),
    marginVertical: hp('1%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp('1.5%'),
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
    flex: 1,
  },
  clientAvatar: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  clientDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: hp('0.3%'),
  },
  projectName: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  dateText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },

  // Review Rating
  reviewRatingContainer: {
    marginBottom: hp('1%'),
  },

  // Review Comment
  reviewComment: {
    fontSize: 13,
    color: '#444',
    lineHeight: 20,
    marginBottom: hp('1.5%'),
  },

  // Helpful Section
  helpfulSection: {
    paddingTop: hp('1%'),
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  helpfulButton: {
    paddingVertical: hp('0.7%'),
  },
  helpfulText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.success,
  },
})