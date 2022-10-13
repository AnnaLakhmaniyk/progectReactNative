import {
    StyleSheet,
    Text,
    View,
  } from "react-native";
function MapScreen(){
    return (<View style={styles.container}>
        <Text>MapScreen</Text>
    </View>)

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
     justifyContent:"center",
     alignItems:"center"
    },
  });
  export default MapScreen;