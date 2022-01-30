import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../screens/app/landing";
import Login from "../screens/auth/login";
import { useSession } from '../contexts/sessioncontext';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
    <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
    >
        <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
);

const AppStack = () => (
    <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{ headerShown: false }}
    >
        <Stack.Screen name="Landing" component={Landing} />
    </Stack.Navigator>
);

const Navigation = () => {
    const { session, initializeSession } = useSession();

    const [isReady, setIsReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        (async () => {
            await initializeSession();
            setIsReady(true);
        })();

    }, []);

    useEffect(() => {
        setIsLoggedIn(!!session?.token)
    }, [session]);

    return isReady ? isLoggedIn ? <AppStack /> : <AuthStack /> : <></>;
};

export default Navigation;