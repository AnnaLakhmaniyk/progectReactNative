import { StyleSheet, View, TouchableOpacity, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
import CreatePostsScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import MapScreen from "./MapScreen";
import CommentsScreen from "./CommentsScreen";
function Home({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Posts",
          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 20 }}
              onPress={() => alert("This is a button!")}
            />
          ),

          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign
              name="appstore-o"
              size={size}
              color={focused ? "#FF6C00" : { color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "CreatePosts",
          tabBarStyle: { display: "none" },
          headerLeft: () => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.back}
                onPress={() => navigation.navigate("Posts")}
              >
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color="rgba(33, 33, 33, 0.8)"
                />
              </TouchableOpacity>
            );
          },
          tabBarIcon: ({ size }) => {
            return (
              <View style={styles.plus}>
                <AntDesign name="plussquareo" size={size} color="#FFF" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign
              name="user"
              size={size}
              color={focused ? "#FF6C00" : { color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.back}
              onPress={() => navigation.navigate("Posts")}
            >
              <AntDesign
                name="arrowleft"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
          tabBarButton: () => null,
          tabBarVisible: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.back}
              onPress={() => navigation.navigate("Posts")}
            >
              <AntDesign
                name="arrowleft"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
          tabBarButton: () => null,
          tabBarVisible: false,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
  back: {
    marginLeft: 16,
    width: 24,
    height: 24,
  },
});
export default Home;
