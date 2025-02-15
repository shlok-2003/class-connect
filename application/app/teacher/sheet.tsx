import { useState, useMemo } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
} from "react-native";

import dayjs from "dayjs";

import { cn } from "@/lib/utils";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
] as const;

const attendance = [
    { rollNo: 1, name: "John Doe", attendance: 1 },
    { rollNo: 2, name: "Jane Doe", attendance: 0 },
    { rollNo: 3, name: "John Smith", attendance: 1 },
    { rollNo: 4, name: "Jane Smith", attendance: 0 },
    { rollNo: 5, name: "John Doe", attendance: 1 },
];

export default function Sheet() {
    const [activeMonth, setActiveMonth] = useState<(typeof months)[number]>(
        months[0],
    );

    const [date, setDate] = useState(dayjs());
    const [className, setClassName] = useState("");
    const [lectureName, setLectureName] = useState("");
    const [result, setResult] = useState("10/11");

    //TODO: in the setResult we need to calculate the percentage of attendance in the format 30/40

    const listHeaderComponent = useMemo(() => {
        return (
            <View className="items-center justify-center gap-2 pt-[6px]">
                <Text className="text-2xl">Mark Attendance</Text>

                <FlatList
                    data={months}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 5,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                    }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className={cn(
                                "rounded-lg border border-black px-2 py-1",
                                activeMonth === item && "bg-c-purple",
                            )}
                            onPress={() => setActiveMonth(item)}
                            activeOpacity={0.8}
                        >
                            <Text
                                className={cn(
                                    "text-center text-lg font-bold",
                                    activeMonth === item && "text-white",
                                )}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                />

                <View className="flex-col items-center justify-between gap-2 px-4">
                    <View className="flex-row items-center justify-between gap-2">
                        <TextInput
                            placeholder="Date"
                            className="flex-1 rounded-lg border border-black px-4 py-3 font-bold text-black"
                            placeholderTextColor="black"
                            value={date.format("DD")}
                            keyboardType="default"
                            selectionColor="black"
                            cursorColor="black"
                            onChangeText={(text) => setDate(dayjs(text))}
                        />

                        <TextInput
                            placeholder="Class"
                            className="flex-1 rounded-lg border border-black px-4 py-3 font-bold text-black"
                            placeholderTextColor="black"
                            value={className}
                            keyboardType="default"
                            selectionColor="black"
                            cursorColor="black"
                            onChangeText={(text) => setClassName(text)}
                        />
                    </View>

                    <View className="flex-row items-center justify-between gap-2">
                        <TextInput
                            placeholder="Lecture Name"
                            className="flex-1 rounded-lg border border-black px-4 py-3 font-bold text-black"
                            placeholderTextColor="black"
                            value={lectureName}
                            keyboardType="default"
                            selectionColor="black"
                            cursorColor="black"
                            onChangeText={(text) => setLectureName(text)}
                        />

                        <TextInput
                            placeholder="Result"
                            className="flex-1 rounded-lg border border-black px-4 py-3 font-bold text-black"
                            placeholderTextColor="black"
                            value={`P/A: ${result}`}
                            keyboardType="default"
                            selectionColor="black"
                            cursorColor="black"
                            editable={false}
                        />
                    </View>
                </View>

                <View className="h-10 w-full flex-row items-center justify-between gap-2 bg-c-purple px-4">
                    <Text className="text-left text-lg font-medium">
                        Roll No
                    </Text>
                    <Text className="flex-1 text-center text-lg font-medium">
                        Name
                    </Text>
                    <Text className="pr-5 text-center text-lg font-medium">
                        P/A
                    </Text>
                </View>
            </View>
        );
    }, [activeMonth, className, date, lectureName, result]);

    return (
        <FlatList
            data={attendance}
            keyExtractor={(item) => item.rollNo.toString()}
            ItemSeparatorComponent={() => <View className="h-px bg-black" />}
            renderItem={({ item }) => (
                <View
                    className={cn(
                        "mx-2 my-1 flex-row items-center justify-between rounded-lg px-4 py-2",
                        item.attendance === 1 ? "bg-green-500" : "bg-red-600",
                    )}
                >
                    <Text
                        className="text-left text-base font-bold text-white"
                        style={{ width: 45 }}
                    >
                        {item.rollNo}
                    </Text>
                    <Text className="flex-1 text-center text-base font-bold text-white">
                        {item.name}
                    </Text>
                    <Text
                        className="text-center text-base font-bold text-white"
                        style={{ width: 45 }}
                    >
                        {item.attendance === 1 ? "P" : "A"}
                    </Text>
                </View>
            )}
            ListHeaderComponent={listHeaderComponent}
        />
    );
}
