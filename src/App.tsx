import React from 'react';
import {RequestWithAxios} from './RequestWithAxios';
import {Provider as PaperProvider} from 'react-native-paper';

export const App = () => {
  return (
    <PaperProvider>
      <RequestWithAxios />
    </PaperProvider>
  );
};
