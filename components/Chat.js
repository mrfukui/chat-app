import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";
import { Audio } from "expo-av";

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  // Extracts the props set in the Start screen
  const { name, backgroundColor, id } = route.params;
  const [messages, setMessages] = useState([]);
  let soundObject = null;

  // Adds new messages to chat
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  let unsubMessages;

  // Adds new message to message database
  useEffect(() => {
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
      if (soundObject) soundObject.unloadAsync();
    };
  }, [isConnected]);

  // Caches messages if online
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem(
        "chat_messages",
        JSON.stringify(messagesToCache)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // Loads cached messages if offline
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("chat_messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  // Set the navigation header to the name prop and the empty dependency array makes sure the effect runs only once
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Does not render the InputToolbar when offline
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  // Adds style to the conversation bubbles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#007BB8",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  // Passing props from Gifted Chat such as onSend
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  // Creates bubble for mapview
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  // Retrieves audio from storage and creates audio bubble
  const renderAudioBubble = (props) => {
    return (
      <View {...props}>
        <TouchableOpacity
          style={{ backgroundColor: "#FF0", borderRadius: 10, margin: 5 }}
          onPress={async () => {
            try {
              if (soundObject) soundObject.unloadAsync();
              const { sound } = await Audio.Sound.createAsync({
                uri: props.currentMessage.audio,
              });
              soundObject = sound;
              await sound.playAsync();
            } catch (error) {
              console.error("Error playing audio:", error);
            }
          }}
        >
          <Text style={{ textAlign: "center", color: "black", padding: 5 }}>
            Play Audio
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        renderMessageAudio={renderAudioBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: id,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
