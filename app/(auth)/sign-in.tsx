import { useState } from "react";
import {
    Text,
    View,
    ScrollView,
    Pressable,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionicons from "@expo/vector-icons/Ionicons";
import { paths } from "@/lib/paths";

export default function SignIn() {
    const [userType, setUserType] = useState<"student" | "teacher">("student");
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = () => {
        if (userType === "student") {
            router.push(paths.STUDENT.HOME);
        } else {
            router.push(paths.TEACHER.HOME);
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
                                value={studentId}
                                onChangeText={(text) => setStudentId(text)}
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
                        >
                            <Text className="text-center font-semibold text-white">
                                Login
                            </Text>
                        </TouchableOpacity>

                        {/* Forgot Password */}
                        <View className="flex-row justify-center">
                            <Text className="text-gray-600">
                                Don't have an account?{" "}
                            </Text>
                            <TouchableOpacity
                                onPress={() => router.push(paths.SIGN_UP)}
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
