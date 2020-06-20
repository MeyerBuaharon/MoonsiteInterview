import React, {useState, useContext, useEffect, useCallback} from 'react';
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
import {AuthContext} from '../../shared/Providers/AuthProvider';
import {useForm} from 'react-hook-form';
import {addPost} from '../../shared/api';
import {ActivityIndicator} from 'react-native';

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
  const {loginUser, setLoading, loading} = useContext(AuthContext);
  const [photo, setPhoto] = useState();
  const {register, handleSubmit, setValue, errors} = useForm();

  useEffect(() => {
    register('title');
    register('image_url');
  }, [register]);

  const uploadPost = useCallback(
    async (data) => {
      setLoading(true);
      console.log('result', loginUser.token, data);
      const result = await addPost(loginUser.token, data).then(
        setLoading(false),
      );
    },
    [setLoading, loginUser],
  );

  const choosePhoto = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      setPhoto(response);
      setValue('image_url', `data:image/png;base64,${response.data}`);
    });
  };
  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }
  return (
    <ScrolledContainer>
      <TabHeader>Add New Post</TabHeader>
      <Container>
        <TextField
          placeholder="Title"
          underlineColorAndroid={'transparent'}
          placeholderTextColor="#FFF"
          onChangeText={(text) => setValue('title', text)}
        />
        <StyledPostImage source={{uri: photo && photo.uri}} />
        <ChoosePhoto onPress={choosePhoto}>
          <ChoosePhotoText>Choose Photo</ChoosePhotoText>
        </ChoosePhoto>

        <StyledButton title="Upload Post" onPress={handleSubmit(uploadPost)} />
      </Container>
    </ScrolledContainer>
  );
};

export default AddPostScreen;
