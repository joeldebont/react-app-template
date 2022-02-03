import React, { FC } from 'react';
import * as Keychain from 'react-native-keychain';
import messaging from '@react-native-firebase/messaging';

export interface Session {
    token: string | null;
    firebaseToken: string | null;
}

export interface SessionContextValue {
    session: Session | null;
    setSession: (sessionModel: SetSessionModel) => Promise<Session>;
    clearSession: () => void;
    initializeSession: () => Promise<void>;
}

export interface SessionModel {
    token: string | null;
    firebaseToken: string | null;
}

export interface SetSessionModel {
    token: string | null;
    firebaseToken: string | null;
}

export const initialSession: SessionModel = {
    token: null,
    firebaseToken: null
}

function convertToSession(setSessionModel: SetSessionModel) {
    const newSession: Session = {
        token: setSessionModel.token,
        firebaseToken: setSessionModel.firebaseToken
    };

    return newSession;
}

const SessionContext = React.createContext<SessionContextValue>({
    session: null,
    setSession: async (sessionModel: SetSessionModel) => {
        const session = convertToSession(sessionModel);

        return session;
    },
    /* eslint-disable @typescript-eslint/no-empty-function */
    clearSession: () => { },
    initializeSession: async () => { },
});

interface SessionProviderProps {

}

export const SessionProvider: FC<SessionProviderProps> = (props) => {
    const [session, setSession] = React.useState<Session | null>(null);

    const updateSession = React.useCallback(async (sessionModel: SetSessionModel) => {
        const newSession = convertToSession(sessionModel);
        setSession(newSession);

        await Keychain.setGenericPassword('session', JSON.stringify(newSession));

        return newSession;
    }, [setSession]);

    const clearSession = React.useCallback(async () => {
        setSession(null);
        await Keychain.resetGenericPassword();
    }, [setSession]);

    const initializeSession = React.useCallback(async () => {
        const sessionJson = await Keychain.getGenericPassword();

        if (!sessionJson) {
            return;
        }

        const session = JSON.parse(sessionJson.password) as SessionModel;

        await updateSession({
            token: session.token,
            firebaseToken: session.firebaseToken
        });
    }, []);

    messaging().onTokenRefresh(token => {
        (async () => {
            var newSession: SessionModel = session ?? { token: null, firebaseToken: null }
            newSession.firebaseToken = token;

            updateSession(newSession);
        })();
    });

    const context: SessionContextValue = React.useMemo(() => ({
        session,
        setSession: updateSession,
        clearSession,
        initializeSession
    }), [session, updateSession, clearSession, initializeSession]);

    // if (appleAuth.isSignUpButtonSupported) {
    //     appleAuth.onCredentialRevoked(async () => {
    //         // If this function executes, User Credentials have been Revoked
    //         await clearSession();
    //     });
    // }

    return (
        <SessionContext.Provider value={context} {...props} />
    );
};

export const useSession = () => {
    const context = React.useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }

    return context;
};
