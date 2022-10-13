import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Keyboard,
    Dimensions,
    ImageBackground,
  } from "react-native";
  import { useEffect, useState } from "react";
  
  function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(true);
    const [focusEmail, setFocusEmail] = useState(false);
    const [focusPassword, setFocusPassword] = useState(false);
  
    useEffect(() => {
      const onChange = () => {
        const width = Dimensions.get("window").width;
      };
      const dimensionsHandler = Dimensions.addEventListener("change", onChange);
      return () => dimensionsHandler.remove();
    }, []);
    const currentEmailStyle = focusEmail ? styles.focus : styles.input;
    const currentPasswordStyle = focusPassword? styles.focus : styles.input;
  
    const inputEmail = (text) => {
      setEmail(text.trim());
    };
  
    const inputPassword = (text) => {
      setPassword(text.trim());
    };
  
    const reset = () => {
      setEmail("");
      setPassword("");
    };
  
    const handleClick = () => {
      Keyboard.dismiss();
      if (!email && !password) {
        return;
      }
      console.log(
        `email ${email},password ${password} `
      );
      reset();
    };
  
    const clickPassword = () => {
      if (show) {
        return setShow(false);
      }
      return setShow(true);
    };
  
    const keyboardVerticalOffset = Platform.OS === "ios" ? "padding" : "height";
  
    return (
        <ImageBackground
        source={{ uri: "https://i.postimg.cc/d1MrrJNz/Photo-BG.png" }}
        style={styles.image}
      >
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={keyboardVerticalOffset}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Sign in</Text>
            <View style={{marginBottom:focusEmail||focusPassword?120:43} } >
              <TextInput
                style={currentEmailStyle}
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
                placeholder="You address email"
                value={email}
                name="email"
                onChangeText={inputEmail}
              />
              <View>
                <TextInput
                  style={{...currentPasswordStyle, marginBottom:0}}
                  onFocus={() => setFocusPassword(true)}
                  onBlur={() => setFocusPassword(false)}
                  placeholder="Password"
                  value={password}
                  name="password"
                  secureTextEntry={show}
                  onChangeText={inputPassword}
                />
                <Text
                  onPress={clickPassword}
                  style={styles.showPassword}
                >
                  show
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleClick}
            >
              <Text style={styles.textButton}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
        <Text style={styles.textLink} >Don't have an account? Registration</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        // alignItems: "center",
      },
    container: {
      backgroundColor: "#fff",
      paddingTop: 32,
      paddingBottom: 114,
      marginTop: "auto",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      alignItems: "center",
    },
    formContainer: {
      width: 343,
    },
    title: {
      color: "#212121",
      marginBottom: 32,
      textAlign: "center",
      fontSize: 30,
      fontFamily: "Poppins-Medium",
    },
    input: {
      marginBottom: 16,
      height: 50,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#E8E8E8",
      backgroundColor: "#F6F6F6",
      paddingLeft: 16,
      fontSize: 16,
    },
    focus: {
      marginBottom: 16,
      height: 50,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#FF6C00",
      backgroundColor: "#FFFFFF",
      paddingLeft: 16,
      fontSize: 16,
    },
    showPassword: {
      position: "absolute",
      bottom: 15,
      right: 15,
      color: "#1B4371",
      fontSize: 16,
      fontFamily: "Poppins-Medium",
    },
    buttonContainer: {
      backgroundColor: "#FF6C00",
      borderRadius: 100,
      height: 51,
    marginBottom:16,
      justifyContent: "center",
    },
    textButton: {
      color: "#fff",
      textAlign: "center",
      fontSize: 16,
      fontFamily: "Poppins-Medium",
    },
    textLink: {
      textAlign: "center",
      fontSize: 16,
      color: "#1B4371",
      fontFamily: "Poppins-Medium",
    },
  });
  
  export default LoginScreen;
  