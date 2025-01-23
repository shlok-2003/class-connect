import React, { useState } from "react";
import { router } from "expo-router";
import {
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

import data, { College, Class } from "@/data/college-data";

import { paths } from "@/lib/paths";

export default function SignUp() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        studentId: "",
        class: "",
        section: "",
        rollNumber: "",
        password: "",
        confirmPassword: "",
    });

    const [sections, setSections] = useState<string[]>([]);
    const [rollNumbers, setRollNumbers] = useState<string[]>([]);

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "class") {
            setSections(Object.keys(data[value as keyof College]));
            setFormData((prev) => ({ ...prev, section: "", rollNumber: "" }));
        } else if (name === "section") {
            const selectedClass = data[formData.class as keyof College];
            if (selectedClass) {
                const selectedSection = selectedClass[value as keyof Class];
                if (selectedSection) {
                    setRollNumbers(Object.keys(selectedSection));
                }
            }
            setFormData((prev) => ({ ...prev, rollNumber: "" }));
        }
    };

    const handleSubmit = () => {
        console.log("Form submitted:", formData);
    };

    return (
        <SafeAreaView className="flex-1">
            <ScrollView>
                <View className="flex min-h-screen flex-1 items-center justify-center bg-[#5B4B8A] py-6">
                    <View className="w-11/12 max-w-md rounded-3xl bg-white p-6 shadow-lg">
                        <Text className="mb-6 text-center text-2xl font-bold text-[#5B4B8A]">
                            Student Registration
                        </Text>

                        <View className="mb-4">
                            <Text className="mb-2 text-lg font-semibold text-[#5B4B8A]">
                                Basic Information
                            </Text>

                            <TextInput
                                className="mb-3 rounded-lg border border-gray-300 bg-white px-4 py-3"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChangeText={(value) =>
                                    handleChange("firstName", value)
                                }
                            />

                            <TextInput
                                className="mb-3 rounded-lg border border-gray-300 bg-white px-4 py-3"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChangeText={(value) =>
                                    handleChange("lastName", value)
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
                                placeholder="Student ID"
                                value={formData.studentId}
                                onChangeText={(value) =>
                                    handleChange("studentId", value)
                                }
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="mb-2 text-lg font-semibold text-[#5B4B8A]">
                                Academic Information
                            </Text>

                            <View className="mb-3 rounded-lg border border-gray-300 bg-white">
                                <Picker
                                    selectedValue={formData.class}
                                    onValueChange={(value) =>
                                        handleChange("class", value)
                                    }
                                >
                                    <Picker.Item
                                        label="Select Class"
                                        value=""
                                    />
                                    {Object.keys(data).map((className) => (
                                        <Picker.Item
                                            key={className}
                                            label={className}
                                            value={className}
                                        />
                                    ))}
                                </Picker>
                            </View>

                            <View className="mb-3 rounded-lg border border-gray-300 bg-white">
                                <Picker
                                    selectedValue={formData.section}
                                    onValueChange={(value) =>
                                        handleChange("section", value)
                                    }
                                    enabled={!!formData.class}
                                >
                                    <Picker.Item
                                        label="Select Section"
                                        value=""
                                    />
                                    {sections.map((section) => (
                                        <Picker.Item
                                            key={section}
                                            label={section}
                                            value={section}
                                        />
                                    ))}
                                </Picker>
                            </View>

                            <View className="mb-3 rounded-lg border border-gray-300 bg-white">
                                <Picker
                                    selectedValue={formData.rollNumber}
                                    onValueChange={(value) =>
                                        handleChange("rollNumber", value)
                                    }
                                    enabled={!!formData.section}
                                >
                                    <Picker.Item
                                        label="Select Roll Number"
                                        value=""
                                    />
                                    {rollNumbers.map((rollNumber) => (
                                        <Picker.Item
                                            key={rollNumber}
                                            label={rollNumber}
                                            value={rollNumber}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                        <View className="mb-6">
                            <Text className="mb-2 text-lg font-semibold text-[#5B4B8A]">
                                Create Password
                            </Text>

                            <TextInput
                                className="mb-3 rounded-lg border border-gray-300 bg-white px-4 py-3"
                                placeholder="Password"
                                value={formData.password}
                                onChangeText={(value) =>
                                    handleChange("password", value)
                                }
                                secureTextEntry
                            />

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
                        >
                            <Text className="text-center font-semibold text-white">
                                Create Account
                            </Text>
                        </TouchableOpacity>

                        <View className="flex-row justify-center">
                            <Text className="text-gray-600">
                                Already have an account?{" "}
                            </Text>
                            <TouchableOpacity
                                onPress={() => router.push(paths.SIGN_IN)}
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
