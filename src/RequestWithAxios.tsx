import React from 'react';
import {
  Text,
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import {useAxios} from './hook/useAxios';

type PhotoType = {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

type AlbumsType = {
  userId: number;
  id: number;
  title: string;
};

export const RequestWithAxios = () => {
  const photos = useAxios<PhotoType>('photos');

  const albums = useAxios<AlbumsType>('albums');

  if (photos.isLoading || albums.isLoading) {
    return (
      <View style={styles.spinnerContaner}>
        <ActivityIndicator color="green" size={50} />
      </View>
    );
  }

  return (
    <FlatList
      data={photos.data}
      renderItem={({item}) => <Text>{item.title}</Text>}
    />
  );
};

const styles = StyleSheet.create({
  spinnerContaner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
