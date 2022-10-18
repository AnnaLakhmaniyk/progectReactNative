import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EvilIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { db } from "../../../assets/firebase/config";
import {
  collection,
  getDocs,
  getDoc,
  arrayUnion,
  arrayRemove,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

function PostsScreen({ route, navigation }) {
  const [post, setPost] = useState([]);
  const { email, login, avatar, userId } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    let newPosts = [];
    querySnapshot.forEach((doc) => {
      newPosts.push({ ...doc.data(), id: doc.id });
    });
    setPost(newPosts);
  };

  const addLike = async (id) => {
    const result = await getDoc(doc(db, "posts", `${id}`));
    if (result.data().likes.includes(`${userId}`)) {
      await updateDoc(doc(db, "posts", `${id}`), {
        likes: arrayRemove(`${userId}`),
      });
    } else {
      await updateDoc(doc(db, "posts", `${id}`), {
        likes: arrayUnion(`${userId}`),
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      (snapshot) => {
        getAllPosts();
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.userBox}
        onPress={() => navigation.navigate("Profile")}
      >
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            style={{
              height: 60,
              width: 60,
              borderRadius: 16,
            }}
          ></Image>
        ) : (
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 16,
              backgroundColor: "#515151",
            }}
          ></View>
        )}
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.textName}>{login}</Text>
          <Text style={styles.textEmail}>{email}</Text>
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
                    navigation.navigate("Comments", {
                      photo: item.photo,
                      id: item.id,
                    });
                  }}
                >
                  <EvilIcons
                    name="comment"
                    size={24}
                    color="rgba(33, 33, 33, 0.8)"
                  />
                </TouchableOpacity>
                <Text style={styles.textPost}> {item.comments || 0}</Text>
              </View>
              <View style={styles.comentsInfo}>
                <TouchableOpacity onPress={() => addLike(item.id)}>
                  {item.likes.includes(`${userId}`) ? (
                    <AntDesign
                      name="like1"
                      size={22}
                      color="rgba(33, 33, 33, 0.8)"
                    />
                  ) : (
                    <AntDesign
                      name="like2"
                      size={22}
                      color="rgba(33, 33, 33, 0.8)"
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.textPost}> {item.likes?.length || 0}</Text>
              </View>

              <View style={styles.locationInfo}>
                <Ionicons
                  name="location-outline"
                  size={22}
                  color="rgba(33, 33, 33, 0.8)"
                />
                <Text
                  style={styles.textLocation}
                  onPress={() => {
                    navigation.navigate("Map", {
                      location: item.location,
                      title: item.locationName,
                    });
                  }}
                >
                  {item.locationName}
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
    color: "#212121",
    fontFamily: "Poppins-Medium",
    fontSize: 13,
  },
  textEmail: {
    color: "rgba(33, 33, 33, 0.8)",
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
    color: "#BDBDBD",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    textDecorationLine: "underline",
    marginLeft: 5,
  },
  comentsInfo: {
    flexDirection: "row",
  },
  locationInfo: {
    flexDirection: "row",
  },
});
export default PostsScreen;
