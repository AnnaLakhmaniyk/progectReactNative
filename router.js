import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./component/Screens/RegistrationScreen";
import LoginScreen from "./component/Screens/LoginScreen";
import Home from "./component/Screens/mainScreens/Home";
const Stack = createStackNavigator();

export function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </>
    );
  }
  return (
    <Stack.Screen
      options={{ headerShown: false }}
      name="Home "
      component={Home}
    />
  );
}
