import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";

export const {width,height} =  Dimensions.get('screen');
export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export const Routes = {
  // Auth
  GETSTARTED: 'getStarted',
  LOGIN: 'login',
  FORGOT_PASSWORD: 'forgotPassword',
  REGISTER: 'Register',

  // Main
  HOME: 'Home',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',

  // Others
  DETAILS: 'Details',
} as const;


export type RootStackParamList = {
  [Routes.GETSTARTED]: undefined;
  [Routes.LOGIN]: undefined;
  [Routes.FORGOT_PASSWORD]: undefined;
  [Routes.REGISTER]: undefined;

  [Routes.HOME]: undefined;
  [Routes.PROFILE]: { userId: string };
  [Routes.SETTINGS]: undefined;

  [Routes.DETAILS]: { id: string };
};