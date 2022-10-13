import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function CreatePostsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text>CreatePostsScreen</Text>
      </View>
      <View style={styles.bottom}>
        <TouchableHighlight style={styles.delete}>
          <AntDesign name="delete" size={24} color="#BDBDBD" />
        </TouchableHighlight>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  containerText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    height: 83,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CreatePostsScreen;
