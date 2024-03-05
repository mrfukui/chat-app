import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const Chat = ({ route, navigation }) => {
  // Extracts the props set in the Start screen
  const { name, backgroundColor } = route.params;

  // Set the navigation header to the name prop and the empty dependency array makes sure the effect runs only once
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: backgroundColor }]}
    ></View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chat;
