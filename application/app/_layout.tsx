import { useState, useEffect, useCallback } from "react";
import { Alert, Text, Linking } from "react-native";

import * as Location from "expo-location";
import { Stack, usePathname } from "expo-router";

import "@/styles/globals.css";

export default function RootLayout() {
    const pathname = usePathname();
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [isRequesting, setIsRequesting] = useState(false);

    const fetchLocationPermission = useCallback(async () => {
        if (isRequesting) return;
        setIsRequesting(true);

        try {
            const { status, canAskAgain } =
                await Location.requestForegroundPermissionsAsync();

            if (status === "granted") {
                setHasPermission(true);
                await Location.enableNetworkProviderAsync();
            } else {
                setHasPermission(false);

                if (canAskAgain) {
                    Alert.alert(
                        "Permission Required",
                        "This app needs location access to function properly.",
                        [
                            { text: "Cancel", style: "cancel" },
                            { text: "Retry", onPress: fetchLocationPermission },
                        ],
                    );
                } else {
                    Alert.alert(
                        "Permission Denied",
                        "You have permanently denied location access. Please enable it in settings.",
                        [
                            { text: "Cancel", style: "cancel" },
                            {
                                text: "Open Settings",
                                onPress: () => Linking.openSettings(),
                            },
                        ],
                    );
                }
            }
        } catch (error) {
            console.error("Error fetching location:", error);
            Alert.alert("Error", "Failed to get location. Please try again.", [
                { text: "OK", onPress: fetchLocationPermission },
            ]);
        } finally {
            setIsRequesting(false);
        }
    }, [isRequesting]);

    useEffect(() => {
        fetchLocationPermission();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    if (hasPermission === false) {
        return <Text>No permission granted. Enable location to continue.</Text>;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}
