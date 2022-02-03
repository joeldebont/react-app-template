import messaging from '@react-native-firebase/messaging';
import { initialSession, useSession } from '../../contexts/sessioncontext';

const useAuth = () => {
    const { session, setSession } = useSession();

    const firebaseInit = async () => {
        const hasPermission = await messaging().hasPermission();

        if (
            hasPermission !== messaging.AuthorizationStatus.AUTHORIZED &&
            hasPermission !== messaging.AuthorizationStatus.PROVISIONAL
        ) {
            const permissionGranten = await messaging().requestPermission();

            if (
                permissionGranten !==
                messaging.AuthorizationStatus.AUTHORIZED &&
                permissionGranten !== messaging.AuthorizationStatus.PROVISIONAL
            ) {
                return undefined;
            }
        }

        const token = await messaging().getToken();
        console.log('firebasetoken', token);
        var newSession = session ?? initialSession;
        newSession.firebaseToken = token;
        await setSession(newSession);
    };

    return {
        firebaseInit
    };
};

export default useAuth;