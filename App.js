import React, { useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "./component/Screens/RegistrationScreen";
import LoginScreen from "./component/Screens/LoginScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from "./router";

// function useRoute(isAuth) {
//   if (!isAuth) {
//     return (
//       <>
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="Login"
//           component={LoginScreen}
//         />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="Registration"
//           component={RegistrationScreen}
//         />
//       </>
//     );
//   }
//   return (
//     <Stack.Screen
//       options={{ headerShown: false }}
//       name="Home "
//       component={Home}
//     />
//   );
// }

export default function App() {
  const routing = useRoute({});

  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <Stack.Navigator>{routing}</Stack.Navigator>
        </NavigationContainer>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    // alignItems: "center",
  },
});
