import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";

export const {width,height} =  Dimensions.get('screen');
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export const Routes = {
  // Auth
  GETSTARTED: 'getStarted',
  LOGIN: 'login',
  FORGOT_PASSWORD: 'forgotPassword',
  REGISTER: 'register',
  OTP:'otp',
  RESET_PASSWORD: 'reset',

  // Main
  HOME: 'home',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  SERVICES: 'service',
  SERVICE_DETAILS: 'serviceDetails',
  PROFILE_DETAILS: 'profileDetails',
  ENGINEERS:'engineers',
  PROJECTS:'projects',
  PROJECTS_DETAILS:'projectDetails',

  // Others
  DETAILS: 'Details',
} as const;


export type RootStackParamList = {
  [Routes.GETSTARTED]: undefined;
  [Routes.LOGIN]: undefined;
  [Routes.FORGOT_PASSWORD]: undefined;
  [Routes.REGISTER]: undefined;
  [Routes.OTP]: undefined;
  [Routes.RESET_PASSWORD]: undefined;
  [Routes.ENGINEERS]: undefined;
  [Routes.PROJECTS]: undefined;
  [Routes.PROJECTS_DETAILS]: undefined;

  [Routes.HOME]: undefined;
  [Routes.PROFILE]: { userId: string };
  [Routes.SETTINGS]: undefined;
  [Routes.SERVICES]: undefined;
  [Routes.SERVICE_DETAILS]: undefined;
  [Routes.PROFILE_DETAILS]: undefined;

  [Routes.DETAILS]: { id: string };
};