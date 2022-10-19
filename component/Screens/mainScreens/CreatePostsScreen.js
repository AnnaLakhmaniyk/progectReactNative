import { Camera } from "expo-camera";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import uuid from "react-native-uuid";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "../../../assets/firebase/config";

function CreatePostsScreen({ navigation }) {
  const [snap, setSnap] = useState(null);
  const [photoUri, setPhotoUri] = useState("");
  const [locationName, setLocationName] = useState("");
  const [photoName, setPhotoName] = useState("");

  const [focus, setFocus] = useState(false);
  const { userId, login } = useSelector((state) => state.auth);
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => dimensionsHandler.remove();
  }, []);

  const takePhoto = async () => {
    if (!snap) {
      console.log("error");
      return;
    }
    try {
      // const { status } = await Camera.getCameraPermissionsAsync();
      // if (status !== "granted") {
      //   console.log("Permission to access camera was denied");
      //   return;
      // }
      const photo = await snap.takePictureAsync();
      setPhotoUri(photo.uri);
    } catch (e) {
      console.log(e);
    }
  };
  const uploadePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhotoUri(result.uri);
    }
  };
  const uploadePhotoToServer = async () => {
    try {
      const postId = uuid.v4().split("-").join("");
      const response = await fetch(photoUri);
      const file = await response.blob();
      const storageRef = await ref(storage, `posts/${postId}`);
      await uploadBytesResumable(storageRef, file);
      const photo = await getDownloadURL(storageRef);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});

      return { photo, location };
    } catch (err) {
      console.log(err);
    }
  };
  const createPost = async () => {
    try {
      const { photo, location } = await uploadePhotoToServer();
      await addDoc(collection(db, "posts"), {
        photo,
        name: photoName,
        locationName,
        location,
        userId,
        login,
        comments: 0,
        likes: [],
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const reset = () => {
    setPhotoName("");
    setPhotoUri("");
    setLocationName("");
  };
  const onSubmit = async () => {
    Keyboard.dismiss();
    if (!locationName && !photoName) {
      return;
    }
    try {
      await createPost();
      navigation.navigate("Posts", {
        photoUri,
      });
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  const keyboardVerticalOffset = Platform.OS === "ios" ? "padding" : "height";
  return (
    <View style={styles.container}>
      <View style={styles.containerCamera}>
        <Camera style={styles.camera} ref={setSnap}>
          {photoUri && (
            <View style={styles.containerPrevPhoto}>
              <Image
                source={{ uri: photoUri }}
                style={styles.prevPhoto}
              ></Image>
            </View>
          )}
          <TouchableOpacity style={styles.buttonCamera} onPress={takePhoto}>
            <MaterialIcons name="photo-camera" size={24} color="#121212" />
          </TouchableOpacity>
        </Camera>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.addPhoto}
          onPress={() => uploadePhoto()}
        >
          <Text style={styles.upLoadPhotoText}>Upload photo</Text>
        </TouchableOpacity>
      </View>
      {/* input ----------------------------------------- */}
      <View style={{ marginTop: focus ? 8 : 43 }}>
        <KeyboardAvoidingView behavior={keyboardVerticalOffset}>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#515151"
              placeholder="Name..."
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onChangeText={setPhotoName}
              value={photoName}
            ></TextInput>
          </View>

          <View>
            <TextInput
              style={{ ...styles.input, paddingLeft: 36 }}
              placeholderTextColor="#515151"
              placeholder="Location"
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onChangeText={setLocationName}
              value={locationName}
            ></TextInput>
            <Ionicons
              name="location-outline"
              size={24}
              color="#515151"
              style={styles.locationIcon}
            />
          </View>

          {/* btn create post */}
          <TouchableOpacity
            style={{
              ...styles.buttonSubmit,
              backgroundColor: !(photoUri && photoName && locationName)
                ? "#515151"
                : "#FF6C00",
            }}
            disabled={!(photoUri && photoName && locationName)}
            onPress={onSubmit}
          >
            <View style={styles.textButton}>
              <Text
                style={{
                  ...styles.btnText,
                  color: !(photoUri && photoName && locationName)
                    ? "#fff"
                    : "#000",
                }}
              >
                Create
              </Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.bottom}>
        <TouchableHighlight style={styles.delete} onPress={reset}>
          <AntDesign name="delete" size={24} color="#BDBDBD" />
        </TouchableHighlight>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  camera: {
    position: "relative",
    height: 240,
    marginTop: 35,
    borderRadius: 8,
    backgroundColor: "#515151",
    justifyContent: "center",
    alignItems: "center",
  },
  containerPrevPhoto: {
    position: "absolute",
    borderColor: "#ff0000",
    top: 15,
    left: 15,
    borderWidth: 1,
    zIndex: 1,
  },
  prevPhoto: {
    height: 150,
    width: 150,
  },
  buttonCamera: {
    backgroundColor: "#fff",
    height: 60,
    width: 60,
    borderRadius: 30,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  addPhoto: { marginTop: 8 },
  upLoadPhotoText: {
    color: "#515151",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 40,
  },
  input: {
    color: "#515151",
    padding: 5,
    borderRadius: 5,
    borderColor: "#515151",
    borderWidth: 1,
    height: 40,
    paddingLeft: 16,
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  locationIcon: {
    position: "absolute",
    left: 10,
    top: 7,
  },
  buttonSubmit: {
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    marginTop: 30,
  },
  textButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  delete: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    marginTop: 120,
    height: 83,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CreatePostsScreen;
