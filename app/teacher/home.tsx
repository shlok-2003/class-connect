import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as LocalAuthentication from "expo-local-authentication";

import DigitalClock from "@/components/digital-clock";
import { FontAwesome } from "@/lib/icons";
import { subjects } from "@/data/subjects";
import { classes } from "@/data/class";

export default function Home() {
    const [subject, setSubject] = useState("HCI");
    const [lectureClass, setLectureClass] = useState("TE COMP A");

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
                    onPress={() => {
                        LocalAuthentication.authenticateAsync({
                            biometricsSecurityLevel: "strong",
                            disableDeviceFallback: true,
                        });
                        console.log("pressed");
                    }}
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
                <View className="flex-1 overflow-hidden rounded-lg border border-black bg-c-purple">
                    <Picker
                        style={{ color: "white", fontWeight: "700" }}
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
                            setLectureClass(value);
                        }}
                        selectedValue={lectureClass}
                    >
                        {classes.map((clas) => (
                            <Picker.Item
                                style={{
                                    fontWeight: "700",
                                    backgroundColor:
                                        lectureClass === clas
                                            ? "#5B4B8A"
                                            : "transparent",
                                }}
                                key={clas}
                                label={clas}
                                value={clas}
                            />
                        ))}
                    </Picker>
                </View>
            </View>
        </ScrollView>
    );
}
