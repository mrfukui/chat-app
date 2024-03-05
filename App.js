import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import the screens
import Chat from "./components/Chat";
import Start from "./components/Start";
// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create stack navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // NavigationContainer manages navigation state
    <NavigationContainer>
      {/* The navigator for managing the screens */}
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
