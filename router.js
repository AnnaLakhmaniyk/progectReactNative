import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authStateChangeUser } from "./redux/authOperation";

import RegistrationScreen from "./component/Screens/RegistrationScreen";
import LoginScreen from "./component/Screens/LoginScreen";
import Home from "./component/Screens/mainScreens/Home";

const Stack = createStackNavigator();

export function UseRoute() {
  const { state } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [state]);
  return (
    <Stack.Navigator>
      {!state ? (
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
      ) : (
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home "
          component={Home}
        />
      )}
    </Stack.Navigator>
  );
}
