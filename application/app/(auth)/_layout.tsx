import { Fragment, useEffect } from "react";

import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types";
import { paths } from "@/lib/paths";

export default function Layout() {
    useEffect(() => {
        (async () => {
            const user = await AsyncStorage.getItem("user");

            if (user === null) {
                return;
            }

            const value = JSON.parse(user) as User;
            if (value.type === "student") {
                router.replace(paths.STUDENT.HOME);
            } else if (value.type === "teacher") {
                router.replace(paths.TEACHER.HOME);
            }
        })();
    }, []);

    return (
        <Fragment>
            <StatusBar style="dark" />

            <Stack screenOptions={{}}>
                <Stack.Screen name="sign-in" options={{ headerShown: false }} />
                <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            </Stack>
        </Fragment>
    );
}
