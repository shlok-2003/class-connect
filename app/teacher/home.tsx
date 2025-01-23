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
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
                paddingTop: 6,
                position: "relative",
            }}
        >
            <DigitalClock />

            <View>
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

            <View className="mt-3 flex w-full flex-row gap-4 px-4">
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
        </ScrollView>
    );
}
