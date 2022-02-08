import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import useFirebase from './src/hooks/firebase';
import Navigation from './src/navigation';


const App = () => {
  const { firebaseInit } = useFirebase();

  useEffect(() => {
    firebaseInit();
  }, []);

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
