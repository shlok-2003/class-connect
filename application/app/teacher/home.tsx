import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";

import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DigitalClock from "@/components/digital-clock";

import { cn } from "@/lib/utils";
import { FontAwesome } from "@/lib/icons";
import { fetchSocketURL, disconnectSocket } from "@/lib/function";

import { classes } from "@/data/class";
import { subjects } from "@/data/subjects";
import { User } from "@/types";

export default function Home() {
    const [subject, setSubject] = useState("HCI");
    const [lectureClass, setLectureClass] = useState("TE COMP A");
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isJoining, setIsJoining] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [connected, setConnected] = useState(false);

    const getLocation = async () => {
        try {
            const hasServices = await Location.hasServicesEnabledAsync();
            if (!hasServices) {
                await Location.enableNetworkProviderAsync();
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
            });

            return {
                latitude: location.coords.latitude.toString(),
                longitude: location.coords.longitude.toString(),
            };
        } catch (error) {
            console.error("Location fetch error:", error);
            return { latitude: "", longitude: "" };
        }
    };

    const handleConnect = async () => {
        if (isConnecting) return;
        setIsConnecting(true);

        const user = (await AsyncStorage.getItem("user").then((res) => {
            if (res) return JSON.parse(res);
        })) as User;

        try {
            const regex = /([A-Z]+) ([A-Z]+) ([A-Z])/; // TE COMP A
            const match = lectureClass.match(regex);

            console.log("Match", match);

            const teacherData = {
                user: user.type,
                name: user.name,
                branch: match?.[2],
                division: match?.[3],
                t_id: user.college_id,
                lec_name: subject,
                pass_year: "2025",
            };

            console.log("Teacher data", teacherData);

            let dataToSend = {
                user: teacherData.user,
                t_id: teacherData.t_id.toUpperCase(),
                branch: teacherData.branch,
                division: teacherData.division,
                lec_name: teacherData.lec_name.toUpperCase(),
                location: await getLocation(),
                action: "",
            };

            console.log("Data to send", dataToSend);

            const socket_serverURL = await fetchSocketURL();
            const newSocket = new WebSocket(socket_serverURL);
            setSocket(newSocket);

            if (!newSocket) {
                return Alert.alert("Error", "Failed to connect to server");
            }

            newSocket.onopen = () => {
                dataToSend.action = "connect";
                newSocket.send(JSON.stringify(dataToSend));
                console.log("Data sent to server", dataToSend);
                setConnected(true);
            };

            newSocket.onmessage = (event) => {
                const serverMessage = JSON.parse(event.data);
                if (serverMessage.status === "success") {
                    Alert.alert("Data Received by the server");
                    console.log("Data received by the server", serverMessage);
                }
            };

            newSocket.onerror = (event) => {
                console.log("Socket error", event);
            };

            newSocket.onclose = (event) => {
                console.log("Socket closed", event.code, event.reason);
                setConnected(false);
                disconnectSocket(newSocket, setSocket);
            };
        } catch (error) {
            console.error(error);
        } finally {
            setIsConnecting(false);
        }
    };

    const handleStartSession = async () => {
        if (isJoining) return;
        setIsJoining(true);

        if (!socket || socket.readyState !== WebSocket.OPEN) {
            Alert.alert("Error", "Socket not connected");
            return;
        }

        const user = (await AsyncStorage.getItem("user").then((res) => {
            if (res) return JSON.parse(res);
        })) as User;

        try {
            const regex = /([A-Z]+) ([A-Z]+) ([A-Z])/; // TE COMP A
            const match = lectureClass.match(regex);

            console.log("Match", match);

            const teacherData = {
                user: user.type,
                name: user.name,
                branch: match?.[2],
                division: match?.[3],
                t_id: user.college_id,
                lec_name: subject,
                pass_year: match?.[5],
            };

            console.log("Teacher data", teacherData);

            let dataToSend = {
                user: teacherData.user,
                t_id: teacherData.t_id.toUpperCase(),
                branch: teacherData.branch,
                division: teacherData.division,
                lec_name: teacherData.lec_name.toUpperCase(),
                location: await getLocation(),
                action: "",
            };

            dataToSend.action = "start";
            console.log("Data to send", dataToSend);
            socket.send(JSON.stringify(dataToSend));
        } catch (error) {
            console.error("Error: ", error);
        } finally {
            setIsJoining(false);
        }
    };

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

            <View className="flex flex-row gap-4">
                {connected === false ? (
                    <TouchableOpacity
                        className={cn(
                            "h-48 w-48 items-center justify-center gap-4 rounded-full bg-c-purple pt-5 shadow-xl shadow-black",
                            isConnecting && "opacity-50",
                        )}
                        style={{ elevation: 10 }}
                        onPress={handleConnect}
                        disabled={isConnecting}
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
                                Connect
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        className={cn(
                            "h-48 w-48 items-center justify-center gap-4 rounded-full bg-c-purple pt-5 shadow-xl shadow-black",
                            isJoining && "opacity-50",
                        )}
                        style={{ elevation: 10 }}
                        onPress={() => socket && disconnectSocket(socket, setSocket)}
                        disabled={isJoining}
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
                                Close
                            </Text>
                            <Text className="text-xl font-bold leading-none text-white">
                                Session
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}

                {socket && (
                    <TouchableOpacity
                        className={cn(
                            "h-48 w-48 items-center justify-center gap-4 rounded-full bg-c-purple pt-5 shadow-xl shadow-black",
                            isJoining && "opacity-50",
                        )}
                        style={{ elevation: 10 }}
                        onPress={handleStartSession}
                        disabled={isJoining}
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
                )}
            </View>

            <View className="mt-3 flex w-full flex-row gap-4 px-4">
                <View className="flex-1 overflow-hidden rounded-lg border border-black bg-c-purple">
                    <Picker
                        style={{ color: "white", fontWeight: "700" }}
                        dropdownIconColor="white"
                        onValueChange={(value: string) => setSubject(value)}
                        selectedValue={subject}
                    >
                        {subjects.map((subj) => (
                            <Picker.Item
                                key={subj}
                                label={subj}
                                value={subj}
                                style={{
                                    fontWeight: "700",
                                    backgroundColor:
                                        subject === subj
                                            ? "#5B4B8A"
                                            : "transparent",
                                }}
                            />
                        ))}
                    </Picker>
                </View>
                <View className="flex-1 overflow-hidden rounded-lg border border-black bg-c-purple">
                    <Picker
                        style={{ color: "white", fontWeight: "700" }}
                        dropdownIconColor="white"
                        onValueChange={(value: string) =>
                            setLectureClass(value)
                        }
                        selectedValue={lectureClass}
                    >
                        {classes.map((clas) => (
                            <Picker.Item
                                key={clas}
                                label={clas}
                                value={clas}
                                style={{
                                    fontWeight: "700",
                                    backgroundColor:
                                        lectureClass === clas
                                            ? "#5B4B8A"
                                            : "transparent",
                                }}
                            />
                        ))}
                    </Picker>
                </View>
            </View>
        </ScrollView>
    );
}
