import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AlarmProvider } from "@/contexts/AlarmContext";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AlarmProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="add-alarm"
            options={{ headerShown: false, presentation: "modal" }}
          />
          <Stack.Screen
            name="edit-alarm"
            options={{ headerShown: false, presentation: "modal" }}
          />
          <Stack.Screen
            name="alarm-ringing"
            options={{
              headerShown: false,
              gestureEnabled: true, // Permitir gestos para voltar
              presentation: "fullScreenModal",
            }}
          />
          <Stack.Screen
            name="camera-challenge"
            options={{
              headerShown: false,
              gestureEnabled: false, // Manter bloqueado na câmera
              presentation: "fullScreenModal",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AlarmProvider>
  );
}
