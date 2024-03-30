import { useEffect } from "react";
import { StyleSheet, Text, View, LogBox, Alert } from "react-native";
// import the screens
import Chat from "./components/Chat";
import Start from "./components/Start";
// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { getStorage } from "firebase/storage";

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
  // Initialize storage handler for images
  const storage = getStorage(app);

  const connectionStatus = useNetInfo();

  // Checks whether the user is online or offline and connects or disconnects network accordingly
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    // NavigationContainer manages navigation state
    <NavigationContainer>
      {/* The navigator for managing the screens */}
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
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
