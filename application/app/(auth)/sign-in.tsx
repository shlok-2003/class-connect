import { useState } from "react";
import {
    Text,
    View,
    ScrollView,
    Pressable,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { paths } from "@/lib/paths";
import { Ionicons } from "@/lib/icons";

import { User } from "@/types";

export default function SignIn() {
    const [userType, setUserType] = useState<"student" | "teacher">("student");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async () => {
        if (id === "" || password === "") {
            Alert.alert("Error", "Please enter a valid ID and password");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        college_id: id,
                        password,
                    }),
                },
            );

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }

            const user = data.user as User;
            const token = data.token as string;

            await AsyncStorage.multiSet([
                ["token", token],
                ["user", JSON.stringify(user)],
            ]);

            if (user.type === "student") {
                router.push(paths.STUDENT.HOME);
            } else if (user.type === "teacher") {
                router.push(paths.TEACHER.HOME);
            } else {
                throw new Error("Invalid user type");
            }
        } catch (error) {
            console.error(error);
            Alert.alert((error as Error).message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="flex min-h-screen flex-1 items-center justify-center bg-c-purple">
                    <View className="w-11/12 max-w-md rounded-3xl bg-white p-6 shadow-lg">
                        <Text className="mb-6 text-center text-2xl font-bold text-c-purple">
                            Class Connect
                        </Text>

                        {/* Toggle Buttons */}
                        <View className="mb-6 flex-row rounded-lg bg-gray-100">
                            <Pressable
                                onPress={() => setUserType("student")}
                                className={`flex-1 rounded-lg py-3 ${
                                    userType === "student"
                                        ? "bg-[#5B4B8A]"
                                        : "bg-transparent"
                                }`}
                            >
                                <Text
                                    className={`text-center font-semibold ${
                                        userType === "student"
                                            ? "text-white"
                                            : "text-gray-600"
                                    }`}
                                >
                                    Student
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setUserType("teacher")}
                                className={`flex-1 rounded-lg py-3 ${
                                    userType === "teacher"
                                        ? "bg-[#5B4B8A]"
                                        : "bg-transparent"
                                }`}
                            >
                                <Text
                                    className={`text-center font-semibold ${
                                        userType === "teacher"
                                            ? "text-white"
                                            : "text-gray-600"
                                    }`}
                                >
                                    Teacher
                                </Text>
                            </Pressable>
                        </View>

                        {/* Username Input */}
                        <View
                            className="mb-4 overflow-hidden rounded-lg border border-gray-300"
                            style={{ borderWidth: 1, borderColor: "#5B4B8A" }}
                        >
                            <TextInput
                                className="flex-1 bg-white px-4 py-3"
                                placeholder={`${userType === "student" ? "Student" : "Teacher"} ID`}
                                value={id}
                                onChangeText={(text) => setId(text)}
                            />
                        </View>

                        {/* Password Input */}
                        <View
                            className="item-center mb-6 flex flex-row overflow-hidden rounded-lg border border-gray-300"
                            style={{ borderWidth: 1, borderColor: "#5B4B8A" }}
                        >
                            <TextInput
                                className="flex-1 bg-white px-4 py-3"
                                placeholder="Password"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={!isPasswordVisible}
                            />
                            <TouchableOpacity
                                onPress={() =>
                                    setIsPasswordVisible((prev) => !prev)
                                }
                                className="items-center justify-center pr-2"
                            >
                                {isPasswordVisible ? (
                                    <Ionicons
                                        name="eye"
                                        size={24}
                                        color="black"
                                    />
                                ) : (
                                    <Ionicons
                                        name="eye-off"
                                        size={24}
                                        color="black"
                                    />
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity
                            className="mb-4 rounded-lg bg-[#5B4B8A] py-3"
                            onPress={handleLogin}
                            disabled={isSubmitting}
                        >
                            <Text className="text-center font-semibold text-white">
                                {isSubmitting ? "Logging in..." : "Login"}
                            </Text>
                        </TouchableOpacity>

                        {/* Forgot Password */}
                        <View className="flex-row justify-center">
                            <Text className="text-gray-600">
                                Don't have an account?{" "}
                            </Text>
                            <TouchableOpacity
                                onPress={() => router.push(paths.SIGN_UP)}
                                disabled={isSubmitting}
                            >
                                <Text className="font-semibold text-[#5B4B8A]">
                                    Sign up here
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
