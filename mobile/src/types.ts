/*
** EPITECH PROJECT, 2024
** mobile
** File description:
** types
*/

// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// export type RootStackParamList = {
//   Home: {
//     navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
//   }
//   Settings: undefined;
//   Connection: undefined;
//   Login: undefined;
// };

// export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, T>;
export type RootStackParamList = {
  Connection: undefined;
  Login: undefined;
  Home: undefined;
  Settings: undefined;
  Library: undefined;
};