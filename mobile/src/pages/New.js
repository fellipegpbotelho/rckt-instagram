import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  View, StyleSheet, TouchableOpacity, Text, TextInput, Image,
} from 'react-native';

import api from '../services/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    height: 42,

    justifyContent: 'center',
    alignItems: 'center',
  },

  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },

  shareButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});


export default class New extends Component {
  state = {
    preview: null,
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: '',
  };

  handleSelectImage = () => {
    ImagePicker.showImagePicker({
      title: 'Selecione imagem',
    }, (upload) => {
      if (upload.error) {
        // Erro
      } else if (upload.didCancel) {
        // Cancel
      } else {
        const preview = {
          uri: `data:image/jpeg;base64,${upload.data}`,
        };

        let prefix;
        let ext;

        if (upload.fileName) {
          [prefix, ext] = upload.fileName.split('.');
          ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
        } else {
          prefix = new Date().getTime();
          ext = 'jpg';
        }

        const { uri, type } = upload;
        const image = {
          uri,
          type,
          name: `${prefix}.${ext}`,
        };

        this.setState({ preview, image });
      }
    });
  };

  handleSubmit = async () => {
    const data = new FormData();

    const {
      image, author, place, description, hashtags,
    } = this.state;

    data.append('image', image);
    data.append('author', author);
    data.append('place', place);
    data.append('description', description);
    data.append('hashtags', hashtags);

    await api.post('posts', data);

    this.props.navigation.navigate('Feed');
  };

  render() {
    const {
      author, place, description, hashtags, preview,
    } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.selectButton} onPress={this.handleSelectImage}>
          <Text style={styles.selectButtonText}>Selecionar imagem</Text>
        </TouchableOpacity>
        {preview && (
          <Image style={styles.preview} source={preview} />
        )}
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome do autor"
          placeholderTextColor="#999"
          value={author}
          onChangeText={text => this.setState({ author: text })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Local da foto"
          placeholderTextColor="#999"
          value={place}
          onChangeText={text => this.setState({ place: text })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Descrição"
          placeholderTextColor="#999"
          value={description}
          onChangeText={text => this.setState({ description: text })}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Hashtags"
          placeholderTextColor="#999"
          value={hashtags}
          onChangeText={text => this.setState({ hashtags: text })}
        />
        <TouchableOpacity style={styles.shareButton} onPress={this.handleSubmit}>
          <Text style={styles.shareButtonText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

New.navigationOptions = {
  headerTitle: 'Nova publicação',
};
