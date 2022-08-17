import React, {useState} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

export const CadastroPessoa = () => {
  const [initialValues, setInitialValues] = useState<{
    nome: string;
    email: string;
  }>({
    nome: '',
    email: '',
  });

  const onSubmit = () => {
    if (initialValues.nome === '') {
      Alert.alert('Nome inválido');
    }
    if (initialValues.email === '') {
      Alert.alert('Email inválido');
    }
    // Próximo passo adicionar esses valores no localStorage
    console.log('valores digitados', initialValues);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label="Nome"
        mode="outlined"
        error
        onChangeText={nome =>
          setInitialValues({
            email: initialValues.email,
            nome,
          })
        }
      />
      <TextInput
        label="Email"
        mode="outlined"
        onChangeText={email =>
          setInitialValues({
            email,
            nome: initialValues.nome,
          })
        }
      />
      <Button icon="content-save-outline" mode="contained" onPress={onSubmit}>
        Salvar
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
