import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, FontSize, FontWeight, Spacing, Radius } from '../../utils/styles'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { ArrowLeft, Phone, Video, MoreVertical, Send, Paperclip } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '../../utils/tools'

interface ChatMessage {
  id: string
  senderId: string
  text: string
  timestamp: string
  isOwn: boolean
}

interface Engineer {
  id: string
  name: string
  avatar: ImageSourcePropType
  specialty: string
  isOnline: boolean
}

const MessageDetailScreen = () => {
  const navigation = useNavigation<NavigationProp>()
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const scrollViewRef = useRef<ScrollView>(null)

  // Mock Engineer Data
  const engineer: Engineer = {
    id: '1',
    name: 'Robert Martinez',
    avatar: require('../../assets/images/eng.jpg'),
    specialty: 'Civil Engineer',
    isOnline: true,
  }

  // Mock Messages Data
  const initialMessages: ChatMessage[] = [
    {
      id: '1',
      senderId: 'engineer',
      text: 'Hello! I received your project details. The scope looks interesting.',
      timestamp: '10:30 AM',
      isOwn: false,
    },
    {
      id: '2',
      senderId: 'user',
      text: 'Hi Robert! Thanks for getting back to me. What are your initial thoughts?',
      timestamp: '10:35 AM',
      isOwn: true,
    },
    {
      id: '3',
      senderId: 'engineer',
      text: 'The timeline and budget seem reasonable. I\'d need to do a site visit to assess the ground conditions.',
      timestamp: '10:40 AM',
      isOwn: false,
    },
    {
      id: '4',
      senderId: 'engineer',
      text: 'When would be a good time for that?',
      timestamp: '10:40 AM',
      isOwn: false,
    },
    {
      id: '5',
      senderId: 'user',
      text: 'How about next Tuesday or Wednesday? I\'m flexible with the timing.',
      timestamp: '10:45 AM',
      isOwn: true,
    },
    {
      id: '6',
      senderId: 'engineer',
      text: 'Perfect! Tuesday works for me. Let\'s say 2 PM at the site?',
      timestamp: '10:50 AM',
      isOwn: false,
    },
  ]

  useEffect(() => {
    setMessages(initialMessages)
    // Scroll to bottom when messages load
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }, [])

  const handleSendMessage = () => {
    if (messageText.trim().length === 0) return

    const newMessage: ChatMessage = {
      id: (messages.length + 1).toString(),
      senderId: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    }

    setMessages([...messages, newMessage])
    setMessageText('')

    // Auto scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View
      style={[
        styles.messageContainer,
        item.isOwn ? styles.ownMessageContainer : styles.otherMessageContainer,
      ]}
    >
      {!item.isOwn && (
        <Image source={engineer.avatar} style={styles.messageAvatar} />
      )}
      <View
        style={[
          styles.messageBubble,
          item.isOwn ? styles.ownBubble : styles.otherBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.isOwn ? styles.ownMessageText : styles.otherMessageText,
          ]}
        >
          {item.text}
        </Text>
        <Text
          style={[
            styles.messageTime,
            item.isOwn ? styles.ownMessageTime : styles.otherMessageTime,
          ]}
        >
          {item.timestamp}
        </Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.engineerInfo}>
            <View style={styles.engineerHeader}>
              <Image source={engineer.avatar} style={styles.headerAvatar} />
              <View style={styles.engineerDetails}>
                <Text style={styles.engineerName}>{engineer.name}</Text>
                <View style={styles.onlineStatus}>
                  <View
                    style={[
                      styles.onlineDot,
                      {
                        backgroundColor: engineer.isOnline
                          ? Colors.success
                          : Colors.textSecondary,
                      },
                    ]}
                  />
                  <Text style={styles.onlineText}>
                    {engineer.isOnline ? 'Active now' : 'Offline'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Phone size={20} color="#fff" />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.headerButton}>
            <Video size={20} color="#fff" />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.headerButton}>
            <MoreVertical size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages List */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image source={engineer.avatar} style={styles.emptyAvatar} />
            <Text style={styles.emptyTitle}>Start a conversation</Text>
            <Text style={styles.emptySubtitle}>
              Say hello to {engineer.name}
            </Text>
          </View>
        ) : (
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.messagesList}
          />
        )}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip size={20} color={Colors.primary} />
          </TouchableOpacity>
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            placeholderTextColor={Colors.textSecondary}
            value={messageText}
            onChangeText={setMessageText}
            multiline
            maxHeight={100}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                opacity: messageText.trim().length === 0 ? 0.5 : 1,
              },
            ]}
            onPress={handleSendMessage}
            disabled={messageText.trim().length === 0}
          >
            <Send size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default MessageDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.success,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  engineerInfo: {
    flex: 1,
  },
  engineerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  engineerDetails: {
    flex: 1,
  },
  engineerName: {
    color: '#fff',
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: 2,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  onlineText: {
    color: '#fff',
    fontSize: FontSize.xs,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  messagesContent: {
    paddingVertical: Spacing.lg,
  },
  messagesList: {
    paddingVertical: Spacing.md,
  },
  messageContainer: {
    marginBottom: Spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
  ownMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  ownBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: Radius.sm,
  },
  otherBubble: {
    backgroundColor: Colors.border,
    borderBottomLeftRadius: Radius.sm,
  },
  messageText: {
    fontSize: FontSize.md,
    lineHeight: 20,
  },
  ownMessageText: {
    color: '#fff',
    fontWeight: FontWeight.medium,
  },
  otherMessageText: {
    color: Colors.textPrimary,
  },
  messageTime: {
    fontSize: FontSize.xs,
    marginTop: Spacing.xs,
  },
  ownMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  otherMessageTime: {
    color: Colors.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
  },
  emptyAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.border,
  },
  messageInput: {
    flex: 1,
    backgroundColor: Colors.border,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
