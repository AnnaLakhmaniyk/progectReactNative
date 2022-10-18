import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
function PostsScreen({ route, navigation }) {
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPost((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.userBox}
        // onPress={() => navigation.navigate("Profile")}
      >
        <View
          style={{
            height: 60,
            width: 60,
            borderRadius: 16,
            backgroundColor: "#515151",
          }}
        ></View>
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.textName}>Login</Text>
          <Text style={styles.textEmail}>email</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={post}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 32,
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 360, height: 240 }}
            />

            <View style={{ marginTop: 8 }}>
              <Text style={styles.textPost}>{item.photoName}</Text>
            </View>
            <View style={styles.postInfoBox}>
              <View style={styles.comentsInfo}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Comments");
                  }}
                >
                  <EvilIcons name="comment" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <Text style={styles.textPost}> 0</Text>
              </View>

              <View style={styles.locationInfo}>
                <Ionicons name="location-outline" size={20} color="#BDBDBD" />
                <Text
                  style={styles.textLocation}
                  onPress={() => {
                    navigation.navigate("Map", {
                      location: item.coordinatPhoto,
                      title: item.location,
                    });
                  }}
                >
                  {item.location}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 32,
  },
  userBox: {
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  textName: {
    color: "#515151",
    fontFamily: "Poppins-Medium",
    fontSize: 13,
  },
  textEmail: {
    color: "#BDBDBD",
    fontFamily: "Poppins-Medium",
    fontSize: 11,
  },
  textPost: {
    color: "#BDBDBD",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  postInfoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 11,
  },
  textLocation: {
    color: "#BDBDBD ",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  comentsInfo: {
    flexDirection: "row",
  },
  locationInfo: {
    flexDirection: "row",
  },
});
export default PostsScreen;
