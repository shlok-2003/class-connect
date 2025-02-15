import { useState, useEffect } from "react";
import { View, Text, ViewProps } from "react-native";

import dayjs from "dayjs";

import { cn } from "@/lib/utils";

export default function DigitalClock({ className, ...props }: ViewProps) {
    const [date, setDate] = useState(dayjs());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(dayjs());
        }, 1000); //  1 second

        return () => clearInterval(timer);
    }, []);

    return (
        <View
            className={cn("flex items-center justify-center", className)}
            {...props}
        >
            <Text className="text-[70px] font-semibold text-black">
                {date.format("hh:mm")}
            </Text>
            <Text className="text-xl text-black">
                {date.format("dddd, MMMM DD")}
            </Text>
        </View>
    );
}
