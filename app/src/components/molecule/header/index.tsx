import { ParamListBase, useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import React from 'react';
import { Keyboard, StyleSheet } from "react-native";
import { Colors, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

    const openDrawer = () => {
        Keyboard.dismiss();
        navigation.openDrawer();
    };

    return (
        <SafeAreaView style={styles.header}>
            <IconButton icon="menu" onPress={openDrawer} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 72,
        backgroundColor: Colors.white,
        paddingHorizontal: 18,
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    }
});



export default Header;