import { Fragment, useEffect } from "react";
import { Pressable, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { router, Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { paths } from "@/lib/paths";
import { Ionicons, FontAwesome, FontAwesome5 } from "@/lib/icons";

import { User } from "@/types";

export default function RootLayout() {
    useEffect(() => {
        (async () => {
            const user = await AsyncStorage.getItem("user");

            if (user === null) {
                router.replace(paths.SIGN_IN);
                return;
            }

            try {
                const value = JSON.parse(user) as User;

                if (value.type !== "student") {
                    console.error("Invalid user type");
                    router.replace(paths.SIGN_IN);
                    return;
                }
            } catch (error) {
                console.error(error);
                router.replace(paths.SIGN_IN);
            }
        })();
    }, []);

    return (
        <Fragment>
            <StatusBar style="dark" backgroundColor="#5B4B8A" />

            <SafeAreaView>
                <View className="flex max-h-20 flex-row items-center justify-between overflow-hidden border-b border-[#232533] bg-c-purple px-4 py-2 pt-3">
                    {/* Left Container */}
                    <View className="relative flex flex-row items-center">
                        <View>
                            <FontAwesome5 name="bell" size={30} color="white" />
                        </View>

                        <View className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-red-500">
                            <Text className="text-center text-xs font-bold text-white">
                                1
                            </Text>
                        </View>
                    </View>

                    {/* Center Container */}
                    <View className="flex w-60 flex-row items-center">
                        <Text
                            className="w-full text-wrap text-center text-2xl font-light text-white"
                            numberOfLines={2}
                        >
                            Shlok Prajapati
                        </Text>
                    </View>

                    {/* Right Container */}
                    <View className="flex flex-row items-center">
                        <FontAwesome
                            name="user-circle"
                            size={32}
                            color="white"
                        />
                    </View>
                </View>
            </SafeAreaView>

            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "#5E64FF",
                    tabBarInactiveTintColor: "#DADADA",
                    tabBarStyle: {
                        borderTopWidth: 1,
                        borderTopColor: "#232533",
                    },
                    headerShown: false,
                    tabBarButton: (props) => {
                        return <Pressable {...props} android_ripple={null} />;
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color }) => (
                            <FontAwesome
                                key="home"
                                name="wifi"
                                size={28}
                                className="rotate-90"
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="sheet"
                    options={{
                        title: "Attendance Sheet",
                        tabBarIcon: ({ color }) => (
                            <Ionicons
                                key="sheet"
                                name="document-text-outline"
                                size={28}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="setting"
                    options={{
                        title: "Setting",
                        tabBarIcon: ({ color }) => (
                            <Ionicons
                                key="setting"
                                name="settings-outline"
                                size={30}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tabs>
        </Fragment>
    );
}
