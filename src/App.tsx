import React from 'react';
import {SimpleForm} from './SimpleForm';
import {Provider as PaperProvider} from 'react-native-paper';

export const App = () => {
  return (
    <PaperProvider>
      <SimpleForm />
    </PaperProvider>
  );
};
