import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const Start = ({ navigation }) => {
  // sets the state for the name inputted
  const [name, setName] = useState("");
  // sets the state for the background color chosen for the chat screen
  const [backgroundColor, setBackgroundColor] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const colorHandler = (color) => {
    setBackgroundColor(color);
    setSelectedColor(color);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../img/Background Image.png")}
        style={{ width: "100%", height: "100%", alignItems: "center" }}
      >
        <Text style={styles.appTitle}>Fukui's Chat App</Text>
        <View style={styles.whiteBox}>
          <View style={styles.inputBox}>
            <Svg width="20" height="20" viewBox="0 0 22 22">
              <Path
                d="M12,13.2533333 C15.24,13.2533333 21.6,14.830125 21.6,18.105 L21.6,20.5308333 L2.4,20.5308333 L2.4,18.105 C2.4,14.830125 8.76,13.2533333 12,13.2533333 Z M20.64,19.5708333 L20.64,18.105 C20.64,16.0913979 15.9773097,14.2133333 12,14.2133333 C8.02269035,14.2133333 3.36,16.0913979 3.36,18.105 L3.36,19.5708333 L20.64,19.5708333 Z M12,11.36 C9.624,11.36 7.68,9.443 7.68,7.1 C7.68,4.757 9.624,2.84 12,2.84 C14.376,2.84 16.32,4.757 16.32,7.1 C16.32,9.443 14.376,11.36 12,11.36 Z M12,10.4 C13.8487889,10.4 15.36,8.90977792 15.36,7.1 C15.36,5.29022208 13.8487889,3.8 12,3.8 C10.1512111,3.8 8.64,5.29022208 8.64,7.1 C8.64,8.90977792 10.1512111,10.4 12,10.4 Z"
                id="path-1"
              />
            </Svg>
            <TextInput
              style={styles.inputText}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
            />
          </View>
          <Text style={styles.chooseBackground}>Choose Background Color:</Text>
          <View style={styles.colorContainer}>
            <TouchableOpacity
              style={[
                styles.blackColor,
                selectedColor === "#090C08" && {
                  borderWidth: 2,
                  borderColor: "white", // White border
                  shadowColor: "black", // Black shadow
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 1.0,
                  shadowRadius: 8,
                  borderRadius: 25,
                },
              ]}
              onPress={() => colorHandler("#090C08")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.grayColor,
                selectedColor === "#00094B" && {
                  borderWidth: 2,
                  borderColor: "white", // White border
                  shadowColor: "black", // Black shadow
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 1.0,
                  shadowRadius: 8,
                  borderRadius: 25,
                },
              ]}
              onPress={() => colorHandler("#00094B")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.blueColor,
                selectedColor === "#00157F" && {
                  borderWidth: 2,
                  borderColor: "white", // White border
                  shadowColor: "black", // Black shadow
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 1.0,
                  shadowRadius: 8,
                  borderRadius: 25,
                },
              ]}
              onPress={() => colorHandler("#00157F")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.greenColor,
                selectedColor === "#003297" && {
                  borderWidth: 2,
                  borderColor: "white", // White border
                  shadowColor: "black", // Black shadow
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 1.0,
                  shadowRadius: 8,
                  borderRadius: 25,
                },
              ]}
              onPress={() => colorHandler("#003297")}
            ></TouchableOpacity>
          </View>
          {/* Button to navigate to the chat screen */}
          <TouchableOpacity
            style={styles.chattingButton}
            onPress={() =>
              navigation.navigate("Chat", {
                name: name,
                backgroundColor: backgroundColor,
              })
            }
          >
            <Text style={styles.chattingText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 100,
  },
  inputBox: {
    flexDirection: "row",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 4,
  },
  chooseBackground: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
    marginTop: 50,
  },
  chattingButton: {
    backgroundColor: "#757083",
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 65,
    alignItems: "center",
    borderRadius: 4,
  },
  chattingText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#FFFFFF",
  },
  whiteBox: {
    width: "88%",
    height: "44%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    marginTop: 250,
    borderRadius: 4,
  },
  inputText: {
    paddingLeft: 10,
    paddingRight: 200,
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  blackColor: {
    backgroundColor: "#090C08",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 40,
  },
  grayColor: {
    backgroundColor: "#00094B",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 40,
  },
  blueColor: {
    backgroundColor: "#00157F",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 40,
  },
  greenColor: {
    backgroundColor: "#003297",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default Start;
