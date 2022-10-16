import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
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
import * as Location from "expo-location";

function CreatePostsScreen({ navigation }) {
  const [snap, setSnap] = useState(null);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState("");
  const [coordinatPhoto, setCoordinatPhoto] = useState({});
  const [photoName, setPhotoName] = useState("");

  const [focus, setFocus] = useState(false);
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
      const photo = await snap.takePictureAsync();
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setCoordinatPhoto(location.coords);
      setPhoto(photo.uri);
    } catch (e) {
      console.log(e);
    }
  };
  const reset = () => {
    setLocation("");
    setPhotoName("");
    setPhoto("");
    setCoordinatPhoto({});
  };
  const onSubmit = async () => {
    try {
      reset();
      navigation.navigate("Posts", {
        photo,
        location,
        photoName,
        coordinatPhoto,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const keyboardVerticalOffset = Platform.OS === "ios" ? "padding" : "height";
  return (
    <View style={styles.container}>
      <View style={styles.containerCamera}>
        <Camera style={styles.camera} ref={setSnap}>
          {photo && (
            <View style={styles.containerPrevPhoto}>
              <Image source={{ uri: photo }} style={styles.prevPhoto}></Image>
            </View>
          )}
          <TouchableOpacity style={styles.buttonCamera} onPress={takePhoto}>
            <MaterialIcons name="photo-camera" size={24} color="#121212" />
          </TouchableOpacity>
        </Camera>
        <TouchableOpacity activeOpacity={0.8} style={styles.addPhoto}>
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
              onChangeText={setLocation}
              value={location}
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
              backgroundColor: !photo ? "#515151" : "#FF6C00",
            }}
            disabled={!photo}
            onPress={onSubmit}
          >
            <View style={styles.textButton}>
              <Text
                style={{
                  ...styles.btnText,
                  color: !photo ? "#fff" : "#000",
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
  //   containerCamera: {
  //     marginBottom: 20,
  //   },
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
