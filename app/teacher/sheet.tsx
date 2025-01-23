import { useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
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

                <View className="h-10 w-full flex-row items-center justify-between gap-2 bg-c-light-purple px-4">
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
    }, [activeMonth]);

    return (
        <FlatList
            data={attendance}
            keyExtractor={(item) => item.rollNo.toString()}
            renderItem={({ item }) => (
                <View className="flex-row items-center justify-between border-b border-gray-300 px-4 py-2">
                    <Text className="text-left text-base" style={{ width: 45 }}>
                        {item.rollNo}
                    </Text>
                    <Text className="flex-1 text-center text-base">
                        {item.name}
                    </Text>
                    <Text
                        className="text-center text-base"
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
