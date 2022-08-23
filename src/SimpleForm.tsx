import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {HelperText, TextInput, Button, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const keyPerson = '@person';

const initialValues = {
  nome: '',
  email: '',
};

type PersonType = typeof initialValues;

export const SimpleForm = () => {
  const [values, setValues] = useState<{
    nome: string;
    email: string;
  }>(initialValues);

  const [nomeError, setNomeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitCount, setSubmitCount] = useState(0);
  const [people, setPeople] = useState<PersonType[]>([]);

  const onSubmit = async () => {
    if (values.nome === '') {
      setNomeError('Campo obrigatório.');
      return;
    }
    if (values.email === '') {
      setEmailError('Campo obrigatório.');
      return;
    } else if (values.email !== '') {
      const isValid = emailIsValid(values.email);
      if (!isValid) {
        setEmailError('Email inválido.');
        return;
      }
    }
    // TODO
    // Desafio do dia => verificar se o AsyncStorage já contem item e adicionar
    const array = [];
    array.push(values);

    await AsyncStorage.setItem(keyPerson, JSON.stringify(array));

    setPeople(array);

    setValues(initialValues);

    setSubmitCount(submitCount + 1);
  };

  const emailIsValid = (email: string) => {
    const expression = /\S+@\S+\.\S+/;
    return expression.test(email);
  };

  useEffect(() => {
    if (submitCount > 0) {
      if (values.nome !== '') {
        setNomeError('');
      }
      if (values.email !== '') {
        const isValid = emailIsValid(values.email);
        if (isValid) {
          setEmailError('');
        } else {
          setEmailError('Email inválido.');
        }
      }
    }
  }, [values, submitCount]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label="Nome"
        mode="outlined"
        error={!!nomeError}
        value={values.nome}
        onChangeText={nome =>
          setValues({
            email: values.email,
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
        value={values.email}
        error={!!emailError}
        onChangeText={email =>
          setValues({
            email,
            nome: values.nome,
          })
        }
      />
      <HelperText type="error" visible={!!emailError}>
        {emailError}
      </HelperText>
      <Button icon="content-save-outline" mode="contained" onPress={onSubmit}>
        Salvar
      </Button>
      <FlatList
        keyExtractor={item => String(item.email)}
        data={people}
        renderItem={({item}) => {
          // TODO
          // Desafio do dia => remover item da lista e do AsyncStorage
          return (
            <>
              <Text>{item.nome}</Text>
              <Text>{item.email}</Text>
            </>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
