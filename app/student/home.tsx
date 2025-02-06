import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DigitalClock from "@/components/digital-clock";

import { FontAwesome } from "@/lib/icons";
import { subjects } from "@/data/subjects";
import { teachers } from "@/data/teacher";

export default function Home() {
    const [subject, setSubject] = useState("HCI");
    const [teacherInitials, setTeacherInitials] = useState("JJ");

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 6,
                paddingTop: 6,
                position: "relative",
            }}
        >
            <Text className="text-2xl">Mark Attendance</Text>

            <Text className="rounded-lg bg-c-purple/50 px-2 py-1 text-2xl">
                Lecture Details
            </Text>

            <View className="mt-5 flex w-full flex-row gap-4 px-4">
                <View className="flex-1 overflow-hidden rounded-lg border border-black bg-c-purple">
                    <Picker
                        style={{
                            color: "white",
                            fontWeight: "700",
                        }}
                        dropdownIconColor="white"
                        onValueChange={(value: string) => {
                            setSubject(value);
                        }}
                        selectedValue={subject}
                    >
                        {subjects.map((subj) => (
                            <Picker.Item
                                style={{
                                    fontWeight: "700",
                                    backgroundColor:
                                        subject === subj
                                            ? "#5B4B8A"
                                            : "transparent",
                                }}
                                key={subj}
                                label={subj}
                                value={subj}
                            />
                        ))}
                    </Picker>
                </View>

                <View className="flex-1 overflow-hidden rounded-lg border border-black bg-c-purple">
                    <Picker
                        style={{ color: "white", fontWeight: "700" }}
                        dropdownIconColor="white"
                        onValueChange={(value: string) => {
                            setTeacherInitials(value);
                        }}
                        placeholder="Select Teacher Initials"
                        selectedValue={teacherInitials}
                    >
                        {teachers.map((t) => (
                            <Picker.Item
                                style={{
                                    fontWeight: "700",
                                    backgroundColor:
                                        teacherInitials === t
                                            ? "#5B4B8A"
                                            : "transparent",
                                }}
                                key={t}
                                label={t}
                                value={t}
                            />
                        ))}
                    </Picker>
                </View>
            </View>

            <DigitalClock className="mt-10" />

            <View className="mt-16">
                <TouchableOpacity
                    className="h-48 w-48 items-center justify-center gap-4 rounded-full bg-c-purple pt-5 shadow-xl shadow-black"
                    style={{ elevation: 10 }}
                    onPress={() => {}}
                    activeOpacity={0.8}
                >
                    <FontAwesome
                        key="attendance button"
                        name="wifi"
                        size={50}
                        className="rotate-90"
                        color="white"
                    />
                    <View className="flex flex-col items-center justify-center gap-0">
                        <Text className="text-xl font-bold leading-none text-white">
                            Join
                        </Text>
                        <Text className="text-xl font-bold leading-none text-white">
                            Session
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
