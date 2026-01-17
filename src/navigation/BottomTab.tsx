import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homeScreen';
import { Home, Pickaxe } from 'lucide-react-native';
import { Colors } from '../utils/styles';
import ProjectScreen from '../screens/projectScreen';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Home color={Colors.success} size={size ?? 20} />,
                }}
            />
            <Tab.Screen
                name='projects'
                component={ProjectScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Pickaxe color={Colors.success} size={size ?? 20} />,
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTab

const styles = StyleSheet.create({})