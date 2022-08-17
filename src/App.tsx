import React from 'react';
import {CadastroPessoa} from './CadastroPessoa';
import {Provider as PaperProvider} from 'react-native-paper';

export const App = () => {
  return (
    <PaperProvider>
      <CadastroPessoa />
    </PaperProvider>
  );
};
