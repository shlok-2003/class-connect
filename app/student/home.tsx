import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@/lib/icons";
import DigitalClock from "@/components/digital-clock";

export default function Home() {
    const [lectureName, setLectureName] = useState("");
    const [lectureClass, setLectureClass] = useState("");
    const [lectureTime, setLectureTime] = useState("");

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
                <TextInput
                    placeholder="Lecture Name"
                    className="flex-1 rounded-lg border border-black bg-c-purple font-bold text-white"
                    placeholderTextColor="white"
                    value={lectureName}
                    keyboardType="default"
                    selectionColor="white"
                    cursorColor="white"
                    onChangeText={(text) => setLectureName(text)}
                />
                <TextInput
                    placeholder="Lecture Class"
                    className="flex-1 rounded-lg border border-black bg-c-purple font-bold text-white"
                    placeholderTextColor="white"
                    value={lectureClass}
                    keyboardType="default"
                    selectionColor="white"
                    cursorColor="white"
                    onChangeText={(text) => setLectureClass(text)}
                />
                <TextInput
                    placeholder="Lecture Time"
                    className="flex-1 rounded-lg border border-black bg-c-purple font-bold text-white"
                    value={lectureTime}
                    onChangeText={(text) => setLectureTime(text)}
                    placeholderTextColor="white"
                    keyboardType="default"
                    selectionColor="white"
                    cursorColor="white"
                />
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
                            Start
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
