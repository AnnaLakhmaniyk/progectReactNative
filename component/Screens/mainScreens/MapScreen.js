import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
function MapScreen({ route }) {
  console.log(route.params.location);
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          longitude: route.params.location.coords.longitude,
          latitude: route.params.location.coords.latitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
            longitude: route.params.location.coords.longitude,
            latitude: route.params.location.coords.latitude,
          }}
          title={route.params.title}
        ></Marker>
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    color: "#515151",
    fontFamily: "Poppins-Medium",
  },
});
export default MapScreen;
