import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import React from 'react'
import { Colors } from '../utils/styles'

type EngineerProfile = {
    id: number
    name: string
    specialty: string
    bio: string
    experienceYears: number
    location: string
    available: boolean
    avatar: ImageSourcePropType,
}

type EngineerCardProps = {
    engineer: EngineerProfile
    onPress?: () => void // optional callback method
}

const EngineerCard = ({ engineer, onPress }: EngineerCardProps) => {
    return (
        <Pressable style={styles.engineerCard} onPress={onPress}>
            <Image source={engineer.avatar} style={styles.avatar} />
            <View style={styles.engineerInfo}>
                <Text style={styles.name}>{engineer.name}</Text>
                <Text style={styles.specialty}>{engineer.specialty}</Text>
                <Text style={styles.meta}>
                    {engineer.experienceYears} yrs • {engineer.location}
                </Text>
                <View style={{ width: wp('65%'), justifyContent: 'flex-end' }}>
                    <Text
                        style={[
                            styles.status,
                            { color: engineer.available ? Colors.success : Colors.error },
                        ]}
                    >
                        {engineer.available ? 'Available' : 'Unavailable'}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

export default EngineerCard

const styles = StyleSheet.create({
    engineerCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 12,
        marginHorizontal: wp('4%'),
        marginVertical: 6,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    engineerInfo: { flex: 1 },
    name: { fontSize: 15, fontWeight: '600' },
    specialty: { fontSize: 13, color: '#555', marginTop: 2 },
    meta: { fontSize: 12, color: '#888', marginTop: 2 },
    status: { fontSize: 12, fontWeight: '500', marginTop: 4, textAlign: 'right' },

})