import React, { useState } from 'react';
import { Button, Headline, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {

    const [hidePass, setHidePass] = useState(true);

    return (
        <SafeAreaView style={{ padding: 20 }}>
            <Headline>Login</Headline>
            <TextInput label="Username" />
            <TextInput
                label="Password"
                secureTextEntry={hidePass}
                right={<TextInput.Icon onPress={() => setHidePass(!hidePass)} name={hidePass ? 'eye' : 'eye-off'} />}
            />
            <Button mode="contained">Log in</Button>
        </SafeAreaView>
    );
};

export default Login;