import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Landing from "../screens/app/landing";
import Login from "../screens/auth/login";
import { useSession } from '../contexts/sessioncontext';
import Header from '../components/molecule/header';
import Drawer from '../components/molecule/drawer';

const Stack = createNativeStackNavigator();
const DrawerStack = createDrawerNavigator();

const AppStack = () => (
    <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{ header: () => <Header /> }}
    >
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
);

const DrawerStackScreens = () => (
    <DrawerStack.Navigator
        initialRouteName="App"
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <Drawer {...props} />}
    >
        <DrawerStack.Screen name="App" component={AppStack} />
    </DrawerStack.Navigator>
);

const Navigation = () => {
    const { initializeSession } = useSession();

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        (async () => {
            await initializeSession();
            setIsReady(true);
        })();

    }, []);

    return isReady
        ? <DrawerStackScreens />
        : <></>;
};

export default Navigation;