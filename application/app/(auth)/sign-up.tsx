import React, { useState } from "react";
import {
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    Pressable,
} from "react-native";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { paths } from "@/lib/paths";
import { Ionicons } from "@/lib/icons";

interface FormData {
    fullName: string;
    email: string;
    id: string;
    password: string;
    confirmPassword: string;
}

export default function SignUp() {
    const [userType, setUserType] = useState<"student" | "teacher">("student");
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        id: "",
        password: "",
        confirmPassword: "",
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (name: keyof FormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (formData.password !== formData.confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }

        console.log(
            "Form submitted:",
            formData,
            userType,
            process.env.EXPO_PUBLIC_API_URL,
        );
        setIsSubmitting(true);
        try {
            const res = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        type: userType,
                        name: formData.fullName,
                        email: formData.email,
                        college_id: formData.id,
                        password: formData.password,
                    }),
                },
            );

            const data = await res.json();

            if (res.ok) {
                Alert.alert(
                    "Account created successfully",
                    "You can now sign in to your account",
                    [
                        {
                            text: "Sign In",
                            onPress: () => router.push(paths.SIGN_IN),
                        },
                    ],
                );

                setFormData({
                    fullName: "",
                    email: "",
                    id: "",
                    password: "",
                    confirmPassword: "",
                });
            } else {
                Alert.alert("Error", data.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <ScrollView>
                <View className="flex min-h-screen flex-1 items-center justify-center bg-[#5B4B8A] py-6">
                    <View className="w-11/12 max-w-md rounded-3xl bg-white p-6 shadow-lg">
                        <View className="mb-4">
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

                            <Text className="mb-2 text-lg font-semibold text-[#5B4B8A]">
                                Basic Information
                            </Text>

                            <TextInput
                                className="mb-3 rounded-lg border border-gray-300 bg-white px-4 py-3"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChangeText={(value) =>
                                    handleChange("fullName", value)
                                }
                            />

                            <TextInput
                                className="mb-3 rounded-lg border border-gray-300 bg-white px-4 py-3"
                                placeholder="Email"
                                value={formData.email}
                                onChangeText={(value) =>
                                    handleChange("email", value)
                                }
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <TextInput
                                className="mb-3 rounded-lg border border-gray-300 bg-white px-4 py-3"
                                placeholder={`${userType === "student" ? "Student ID" : "Teacher ID"}`}
                                value={formData.id}
                                onChangeText={(value) =>
                                    handleChange("id", value)
                                }
                            />
                        </View>

                        <View className="mb-6">
                            <Text className="mb-2 text-lg font-semibold text-[#5B4B8A]">
                                Create Password
                            </Text>

                            <View className="item-center mb-6 flex flex-row overflow-hidden rounded-lg border border-gray-300">
                                <TextInput
                                    className="flex-1 rounded-lg px-4 py-3"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChangeText={(value) =>
                                        handleChange("password", value)
                                    }
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

                            <TextInput
                                className="rounded-lg border border-gray-300 bg-white px-4 py-3"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChangeText={(value) =>
                                    handleChange("confirmPassword", value)
                                }
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity
                            className="mb-4 rounded-lg bg-[#5B4B8A] py-3"
                            onPress={handleSubmit}
                            disabled={isSubmitting}
                        >
                            <Text className="text-center font-semibold text-white">
                                {isSubmitting ? "Loading..." : "Create Account"}
                            </Text>
                        </TouchableOpacity>

                        <View className="flex-row justify-center">
                            <Text className="text-gray-600">
                                Already have an account?{" "}
                            </Text>
                            <TouchableOpacity
                                onPress={() => router.push(paths.SIGN_IN)}
                                disabled={isSubmitting}
                            >
                                <Text className="font-semibold text-[#5B4B8A]">
                                    Sign in here
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
