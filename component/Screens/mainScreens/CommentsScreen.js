import {
    StyleSheet,
    Text,
    View,
  } from "react-native";
function CommentsScreen(){
    return (<View style={styles.container}>
        <Text>CCommentsScreen</Text>
    </View>)

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
     justifyContent:"center",
     alignItems:"center"
    },
  });
  export default CommentsScreen;