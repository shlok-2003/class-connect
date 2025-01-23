import { Stack } from "expo-router";
import "@/styles/globals.css";

// import * as SplashScreen from "expo-splash-screen";
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}
