import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { OverlayProvider, Chat }  from 'stream-chat-expo';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const API_KEY = "scyh67pb6f4y";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
      const connectUser = async () => {

        await client.connectUser(
          {
            id: 'badal',
            name: 'Badal Agarwal',
            image: 'https://i.imgur.com/fR9Jz14.png'
          },
          client.devToken('badal'),
        );

        // Create a Channel

        const channel =  client.channel("messaging", "thescrambler", {name: "theScrambler"} );
        await channel.watch();
      
      };

      connectUser();

      return () => { client.disconnectUser(); }

  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>

        <OverlayProvider>
          <Chat client = {client}>
            { /* <Navigation colorScheme={colorScheme} /> */ }
            
            
          </Chat>
        </OverlayProvider>

        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
