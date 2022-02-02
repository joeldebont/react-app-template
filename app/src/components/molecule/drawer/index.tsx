import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Drawer: FC<DrawerContentComponentProps> = ({ navigation }) => {

    return (
        <SafeAreaView>
            <View>
                <Button onPress={() => navigation.navigate('Landing')}>Landing</Button>
                <Button onPress={() => navigation.navigate('Login')}>Login</Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    drawer: {
        flex: 1
    },
    drawerContent: {
        flex: 1,
        padding: 12
    }
})

export default Drawer;