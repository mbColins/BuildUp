import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput as RNTextInput,
  ImageSourcePropType,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomeHeader from '../../components/CustomeHeader'
import TextInput from '../../components/TextInput'
import { Colors, FontSize, FontWeight, Spacing, Radius } from '../../utils/styles'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { Search, MessageCircle, Phone, MoreVertical, Plus, Route } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp, Routes } from '../../utils/tools'

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: Date
}

interface Conversation {
  id: string
  engineerId: string
  engineerName: string
  engineerAvatar: ImageSourcePropType
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  messages: Message[]
}

const MessageScreen = () => {
  const navigation = useNavigation<NavigationProp>()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([])

  // Mock Data - Conversations
  const conversations: Conversation[] = [
    {
      id: '1',
      engineerId: '1',
      engineerName: 'Robert Martinez',
      engineerAvatar: require('../../assets/images/eng.jpg'),
      lastMessage: 'The project timeline looks good, let\'s start with the foundation work',
      lastMessageTime: '2 mins ago',
      unreadCount: 2,
      isOnline: true,
      messages: [],
    },
    {
      id: '2',
      engineerId: '2',
      engineerName: 'Elena Gonzalez',
      engineerAvatar: require('../../assets/images/eng.jpg'),
      lastMessage: 'I\'ve reviewed the structural design. Everything looks perfect!',
      lastMessageTime: '15 mins ago',
      unreadCount: 0,
      isOnline: true,
      messages: [],
    },
    {
      id: '3',
      engineerId: '3',
      engineerName: 'Ahmed Hassan',
      engineerAvatar: require('../../assets/images/eng.jpg'),
      lastMessage: 'When would you like to schedule the site visit?',
      lastMessageTime: '1 hour ago',
      unreadCount: 1,
      isOnline: false,
      messages: [],
    },
    {
      id: '4',
      engineerId: '4',
      engineerName: 'David Chen',
      engineerAvatar: require('../../assets/images/eng.jpg'),
      lastMessage: 'The cost estimation report is ready for review',
      lastMessageTime: '3 hours ago',
      unreadCount: 0,
      isOnline: false,
      messages: [],
    },
    {
      id: '5',
      engineerId: '5',
      engineerName: 'Sarah Johnson',
      engineerAvatar: require('../../assets/images/eng.jpg'),
      lastMessage: 'Thanks for the update! Looking forward to the next phase',
      lastMessageTime: '5 hours ago',
      unreadCount: 0,
      isOnline: true,
      messages: [],
    },
    {
      id: '6',
      engineerId: '5',
      engineerName: 'Sarah Johnson',
      engineerAvatar: require('../../assets/images/eng.jpg'),
      lastMessage: 'Thanks for the update! Looking forward to the next phase',
      lastMessageTime: '5 hours ago',
      unreadCount: 0,
      isOnline: true,
      messages: [],
    },
    {
      id: '7',
      engineerId: '5',
      engineerName: 'Sarah Johnson',
      engineerAvatar: require('../../assets/images/eng.jpg'),
      lastMessage: 'Thanks for the update! Looking forward to the next phase',
      lastMessageTime: '5 hours ago',
      unreadCount: 0,
      isOnline: true,
      messages: [],
    },
    {
      id: '8',
      engineerId: '5',
      engineerName: 'Sarah Johnson',
      engineerAvatar: require('../../assets/images/eng.jpg'),
      lastMessage: 'Thanks for the update! Looking forward to the next phase',
      lastMessageTime: '5 hours ago',
      unreadCount: 0,
      isOnline: true,
      messages: [],
    },
    {
      id: '9',
      engineerId: '5',
      engineerName: 'Sarah Johnson',
      engineerAvatar: require('../../assets/images/eng.jpg'),
      lastMessage: 'Thanks for the update! Looking forward to the next phase',
      lastMessageTime: '5 hours ago',
      unreadCount: 0,
      isOnline: true,
      messages: [],
    },
  ]

  const handleMessageDetailNav = () => {
    navigation.navigate(Routes.MESSAGE_DETAILS)
  }

  const handleSearch = (text: string) => {
    setSearchQuery(text)
    if (text.trim() === '') {
      setFilteredConversations([])
    } else {
      const filtered = conversations.filter((conv) =>
        conv.engineerName.toLowerCase().includes(text.toLowerCase())
      )
      setFilteredConversations(filtered)
    }
  }

  const displayConversations = searchQuery.trim() ? filteredConversations : conversations

  const renderConversation = ({ item }: { item: Conversation }) => (
    <TouchableOpacity onPress={handleMessageDetailNav}  style={styles.conversationCard} activeOpacity={0.7}>
      <View style={styles.conversationContent}>
        <View style={styles.avatarContainer}>
          <Image source={item.engineerAvatar} style={styles.avatar} />
          {item.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.messageInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.engineerName}>{item.engineerName}</Text>
            <Text style={styles.timestamp}>{item.lastMessageTime}</Text>
          </View>
          <Text
            numberOfLines={1}
            style={[
              styles.lastMessage,
              item.unreadCount > 0 && styles.unreadMessage,
            ]}
          >
            {item.lastMessage}
          </Text>
        </View>
        {item.unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <CustomeHeader text="Messages" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={18} color={Colors.textSecondary} />
        <RNTextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          placeholderTextColor={Colors.textSecondary}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.trim() !== '' && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Text style={styles.clearButton}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Conversations List */}
      {displayConversations.length > 0 ? (
        <FlatList
          data={displayConversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : searchQuery.trim() ? (
        <View style={styles.emptyContainer}>
          <MessageCircle size={48} color={Colors.textSecondary} />
          <Text style={styles.emptyTitle}>No conversations found</Text>
          <Text style={styles.emptySubtitle}>
            Try searching with a different name
          </Text>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <MessageCircle size={48} color={Colors.textSecondary} />
          <Text style={styles.emptyTitle}>No messages yet</Text>
          <Text style={styles.emptySubtitle}>
            Start a conversation with an engineer
          </Text>
        </View>
      )}

      {/* Floating Action Button - New Chat */}
      <TouchableOpacity style={styles.fabButton} activeOpacity={0.8}>
        <View style={styles.fabContent}>
          <Plus size={28} color="#fff" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default MessageScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.border,
    borderRadius: Radius.lg,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    paddingVertical: Spacing.sm,
  },
  clearButton: {
    fontSize: 18,
    color: Colors.textSecondary,
    padding: Spacing.sm,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: 100,
  },
  conversationCard: {
    marginBottom: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
  },
  conversationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  messageInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  engineerName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    flex: 1,
  },
  timestamp: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginLeft: Spacing.sm,
  },
  lastMessage: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  unreadMessage: {
    color: Colors.textPrimary,
    fontWeight: FontWeight.semibold,
  },
  badge: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.sm,
  },
  badgeText: {
    color: '#fff',
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },
  fabButton: {
    position: 'absolute',
    bottom: Spacing.xl,
    right: Spacing.lg,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  fabContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
