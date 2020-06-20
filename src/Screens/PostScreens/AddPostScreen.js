import React, {useState} from 'react';
import ImagePicker from 'react-native-image-picker';
import styled from 'styled-components';

import {
  TabHeader,
  ScrolledContainer,
  TextField,
  StyledButton,
  Container,
  PostImage,
} from '../../shared/styles/styles';

const StyledPostImage = styled(PostImage)`
  border-radius: 15px;
  margin-bottom: 10px;
`;
const ChoosePhoto = styled.TouchableOpacity`
  margin: 20px;
  justify-content: center;
`;
const ChoosePhotoText = styled.Text`
  color: #000;
  font-size: 20px;
  text-align: center;
`;

const AddPostScreen = () => {
  const [photo, setPhoto] = useState();

  const uploadPost = () => console.log('upload');

  const choosePhoto = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      setPhoto(response);
      console.log('response.data', response.data);
    });
  };

  return (
    <ScrolledContainer>
      <TabHeader>Add New Post</TabHeader>
      <Container>
        <TextField
          placeholder="Title"
          underlineColorAndroid={'transparent'}
          placeholderTextColor="#FFF"
          onChangeText={() => console.log('')}
        />
        <StyledPostImage source={{uri: photo && photo.uri}} />
        <ChoosePhoto onPress={choosePhoto}>
          <ChoosePhotoText>Choose Photo</ChoosePhotoText>
        </ChoosePhoto>

        <StyledButton title="Upload Post" onPress={uploadPost} />
      </Container>
    </ScrolledContainer>
  );
};

export default AddPostScreen;
