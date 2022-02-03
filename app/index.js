import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

const Main = () => {
    const theme = {
        ...DefaultTheme,
        dark: false
    };

    return (
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    );
};

AppRegistry.registerComponent(appName, () => Main);
