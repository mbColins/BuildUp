import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CarrouselScreen from '../screens/carousel'
import GetStartedScreen from '../screens/getStattedScreen'
import LoginScreen from '../screens/authenticationScreen/loginScreen'
import ForgotPasswordScreen from '../screens/authenticationScreen/forgotPassword'


const Stack = createNativeStackNavigator()

const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CarrouselScreen" component={CarrouselScreen} options={{
       headerShown:false,
       statusBarStyle:'dark',
      }} />
      <Stack.Screen name='getStarted' component={GetStartedScreen} options={{
        headerShown:false,
        statusBarHidden:false,
        statusBarStyle:'dark',
      }}/>

    <Stack.Screen name='login' component={LoginScreen} options={{
      headerShown:false,
       statusBarStyle:'dark',
    }}/>

    <Stack.Screen name='forgotPassword' component={ForgotPasswordScreen} options={{
      headerShown:false,
       statusBarStyle:'dark',
    }}/>
    </Stack.Navigator>
  )
}

export default RootNavigation