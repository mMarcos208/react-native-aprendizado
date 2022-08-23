import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {HelperText, TextInput, Button} from 'react-native-paper';

export const SimpleForm = () => {
  const [initialValues, setInitialValues] = useState<{
    nome: string;
    email: string;
  }>({
    nome: '',
    email: '',
  });

  const [nomeError, setNomeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitCount, setSubmitCount] = useState(0);

  const onSubmit = () => {
    if (initialValues.nome === '') {
      setNomeError('Campo obrigatório.');
    }
    if (initialValues.email === '') {
      setEmailError('Campo obrigatório.');
    } else if (initialValues.email !== '') {
      const isValid = emailIsValid(initialValues.email);
      if (!isValid) {
        setEmailError('Email inválido.');
      }
    }
    setSubmitCount(submitCount + 1);
  };

  useEffect(() => {
    if (submitCount > 0) {
      if (initialValues.nome !== '') {
        setNomeError('');
      }
      if (initialValues.email !== '') {
        const isValid = emailIsValid(initialValues.email);
        if (isValid) {
          setEmailError('');
        } else {
          setEmailError('Email inválido.');
        }
      }
    }
  }, [initialValues, submitCount]);

  const emailIsValid = (email: string) => {
    const expression = /\S+@\S+\.\S+/;
    return expression.test(email);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label="Nome"
        mode="outlined"
        error={!!nomeError}
        onChangeText={nome =>
          setInitialValues({
            email: initialValues.email,
            nome,
          })
        }
      />
      <HelperText type="error" visible={!!nomeError}>
        {nomeError}
      </HelperText>
      <TextInput
        label="Email"
        mode="outlined"
        error={!!emailError}
        onChangeText={email =>
          setInitialValues({
            email,
            nome: initialValues.nome,
          })
        }
      />
      <HelperText type="error" visible={!!emailError}>
        {emailError}
      </HelperText>
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
