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
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/authOperation";
import { authSlice } from "../../redux/authReducer";

function RegistrationScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [show, setShow] = useState(true);
  const [focusLogin, setFocusLogin] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => dimensionsHandler.remove();
  }, []);
  const currentLoginStyle = focusLogin ? styles.focus : styles.input;
  const currentEmailStyle = focusEmail ? styles.focus : styles.input;
  const currentPasswordStyle = focusPassword ? styles.focus : styles.input;

  const inputLogin = (text) => {
    setLogin(text.trim());
  };

  const inputEmail = (text) => {
    setEmail(text.trim());
  };

  const inputPassword = (text) => {
    setPassword(text.trim());
  };

  const reset = () => {
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const handleClick = async () => {
    Keyboard.dismiss();
    if (!login && !email && !password) {
      return;
    }
    try {
      const user = await authSignUpUser({
        email,
        password,
        login,
      });
      console.log(user.uid);
      dispatch(
        authSlice.actions.updateUser({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
        })
      );
      reset();
    } catch (e) {
      console.log(e);
    }
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
      <View style={styles.containerEL}>
        <View style={styles.avatar}>
          <View style={styles.border}>
            <Text style={styles.plus}>+</Text>
          </View>
        </View>
        <KeyboardAvoidingView behavior={keyboardVerticalOffset}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Registration</Text>
            <View
              style={{
                marginBottom:
                  focusLogin || focusEmail || focusPassword ? 150 : 43,
              }}
            >
              <TextInput
                style={currentLoginStyle}
                onFocus={() => setFocusLogin(true)}
                onBlur={() => setFocusLogin(false)}
                placeholder="Login"
                value={login}
                name="login"
                onChangeText={inputLogin}
              />
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
                  style={{ ...currentPasswordStyle, marginBottom: 0 }}
                  onFocus={() => setFocusPassword(true)}
                  onBlur={() => setFocusPassword(false)}
                  placeholder="Password"
                  value={password}
                  name="password"
                  secureTextEntry={show}
                  onChangeText={inputPassword}
                />
                <Text onPress={clickPassword} style={styles.showPassword}>
                  show
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleClick}
            >
              <Text style={styles.textButton}>Registration</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.textLink}>Already have an account? Sign in</Text>
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
  containerEL: {
    backgroundColor: "#fff",
    paddingTop: 92,
    paddingBottom: 66,
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    top: -60,
    borderRadius: 16,
  },
  border: {
    position: "absolute",
    width: 25,
    height: 25,
    bottom: 14,
    right: -12.5,
    borderRadius: 50,
    borderColor: "#FF6C00",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    color: "#FF6C00",
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
    marginBottom: 16,
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

export default RegistrationScreen;
