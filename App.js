import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import the screens
import Chat from "./components/Chat";
import Start from "./components/Start";
// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Create stack navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAp6KkUZU5A3AS4xqNSGDhvpsmvVoyimrU",
    authDomain: "chatapp-a5f1f.firebaseapp.com",
    projectId: "chatapp-a5f1f",
    storageBucket: "chatapp-a5f1f.appspot.com",
    messagingSenderId: "351014322633",
    appId: "1:351014322633:web:2a44dfbb4eb1df26ce2818",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    // NavigationContainer manages navigation state
    <NavigationContainer>
      {/* The navigator for managing the screens */}
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
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
