import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CarrouselScreen from '../screens/carousel'
import GetStartedScreen from '../screens/getStattedScreen'
import LoginScreen from '../screens/authenticationScreen/loginScreen'
import ForgotPasswordScreen from '../screens/authenticationScreen/forgotPassword'
import RegistrationScreen from '../screens/authenticationScreen/registrationScreen'
import OptScreen from '../screens/authenticationScreen/OtpScreen'
import ResetPasswordScreen from '../screens/authenticationScreen/ResetPassword'
import BottomTab from './BottomTab'
import ServiceScreen from '../screens/serviceScreen'
import ServicesDetailScreen from '../screens/serviveDetails'
import EngineerDetails from '../screens/engineerDetails'
import EngineerScreen from '../screens/engineers'
import ProjectDetailScreen from '../screens/projectDetails'
import PortofolioScreen from '../screens/portofolio'
import ReviewScreen from '../screens/reviews'
import MessageDetailScreen from '../screens/messageDetails'


const Stack = createNativeStackNavigator()

const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CarrouselScreen" component={CarrouselScreen} options={{
        headerShown: false,
        statusBarStyle: 'light',
      }} />
      <Stack.Screen name='getStarted' component={GetStartedScreen} options={{
        headerShown: false,
        statusBarHidden: false,
        statusBarStyle: 'light',
      }} />

      <Stack.Screen name='login' component={LoginScreen} options={{
        headerShown: false,
        statusBarStyle: 'light',
      }} />

      <Stack.Screen name='forgotPassword' component={ForgotPasswordScreen} options={{
        headerShown: false,
        statusBarStyle: 'light',
      }} />
      <Stack.Screen name='register' component={RegistrationScreen} options={{
        headerShown: false,
        statusBarStyle: 'light'
      }} />

      <Stack.Screen name='home' component={BottomTab} options={{
        headerShown: false,
        statusBarStyle: 'light'
      }} />

      <Stack.Screen name='otp' component={OptScreen} options={{
        headerShown: false,
        statusBarStyle: 'light'
      }} />
      <Stack.Screen name='reset' component={ResetPasswordScreen} options={{
        headerShown: false,
        statusBarStyle: 'light'
      }} />
      <Stack.Screen name='service' component={ServiceScreen} options={{
        headerShown: false,
        statusBarStyle: 'light',
      }} />
      <Stack.Screen name='serviceDetails' component={ServicesDetailScreen} options={{
        headerShown: false,
        statusBarStyle: 'light',
      }} />
      <Stack.Screen name='profileDetails' component={EngineerDetails} options={{
        headerShown: false,
        statusBarStyle: 'light',
      }} />
      <Stack.Screen name='engineers' component={EngineerScreen} options={{
        headerShown: false,
        statusBarStyle: 'light',
      }} />
      <Stack.Screen name='projectDetails' component={ProjectDetailScreen} options={{
        headerShown: false,
        statusBarStyle: 'light',
      }} />
      <Stack.Screen name='portofolio' component={PortofolioScreen} options={{
        headerShown: false,
        statusBarStyle: 'light',
      }} />
      <Stack.Screen name='review' component={ReviewScreen} options={{
        headerShown: false,
        statusBarStyle: 'light',
      }} />
      <Stack.Screen name='messageDetails' component={MessageDetailScreen} options={{
        headerShown: false,
        statusBarStyle: 'light',
      }} />
    </Stack.Navigator>
  )
}

export default RootNavigation