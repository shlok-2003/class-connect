import { Text, View, TouchableOpacity } from "react-native";

import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { paths } from "@/lib/paths";

export default function Setting() {
    const handleLogout = () => {
        AsyncStorage.multiRemove(["user", "token"]);
        router.replace(paths.SIGN_IN);
    };

    return (
        <View className="flex-1 bg-gray-100">
            <TouchableOpacity
                className="border-b px-4 py-3"
                activeOpacity={0.8}
            >
                <Text className="text-center font-semibold text-black">
                    Account Settings
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="border-b px-4 py-3"
                activeOpacity={0.8}
            >
                <Text className="text-center font-semibold text-black">
                    Privacy Center
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="border-b bg-red-500 px-4 py-3"
                activeOpacity={0.9}
                onPress={handleLogout}
            >
                <Text className="text-center font-semibold text-white">
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    );
}
