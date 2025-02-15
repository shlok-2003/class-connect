import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { Href, Link, Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { paths } from "@/lib/paths";

import { User } from "@/types";

export default function Index() {
    const [path, setPath] = useState<Href | null>(null);

    useEffect(() => {
        (async () => {
            const user = await AsyncStorage.getItem("user");
            console.log(user);

            if (user === null) {
                setPath(paths.SIGN_IN);
                return;
            }

            try {
                const value = JSON.parse(user) as User;

                if (value.type === "student") {
                    setPath(paths.STUDENT.HOME);
                } else if (value.type === "teacher") {
                    setPath(paths.TEACHER.HOME);
                } else {
                    console.error("Invalid user type");
                    setPath(paths.SIGN_IN);
                }
            } catch (error) {
                console.error(error);
                setPath(paths.SIGN_IN);
            }
        })();
    }, []);

    if (path) {
        return <Redirect href={path} />;
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text className="text-red-500">
                Edit app/index.tsx to edit this screen.
            </Text>
            <Link href="/sign-in">Sign In</Link>
        </View>
    );
}
