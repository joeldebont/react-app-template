import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import useAuth from './src/hooks/auth';
import Navigation from './src/navigation';


const App = () => {
  const { firebaseInit } = useAuth();

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
