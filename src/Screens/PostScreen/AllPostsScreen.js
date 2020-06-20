import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, ActivityIndicator, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  getAllPosts,
  deletePost,
  followUser,
  getFollowing,
} from '../../shared/api';
import {AuthContext} from '../../shared/Providers/AuthProvider';
import {
  ScrolledContainer,
  TabHeader,
  Card,
  PostDetailsContainer,
  PostDetails,
  PostImage,
  Container,
} from '../../shared/styles/styles';

const AllPostsScreen = () => {
  const {loginUser, setLoading, loading} = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [following, setFollowing] = useState(null);
  const [rerender, setRerender] = useState();

  const unFollowUser = () => Alert.alert('unfollowing isnt in the api yet');

  const onFollowUser = async (data) => {
    setLoading(true);
    const result = await followUser(loginUser.token, {f_user_id: data});
    if (result === undefined) {
      Alert.alert(
        'something went wrong with following, please try again later...',
      );
    }
    setRerender('rerender');
  };
  const deleteAlert = (data) =>
    Alert.alert(
      'Remove Post',
      'Are you sure you want to remove this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            const result = await deletePost(loginUser.token, data.post_id);
            setLoading(true);
            if (result.res) {
              let newPosts = [...posts];
              newPosts.splice(
                posts.findIndex((post) => post.post_id === data.post_id),
                1,
              );
              setPosts(newPosts);
            } else {
              Alert.alert(
                'Something went wrong with deleting your post, please try again later.',
              );
            }
            setLoading(false);
          },
        },
      ],
      {cancelable: false},
    );

  useEffect(() => {
    setLoading(true);
    getAllPosts(loginUser.token).then((items) => {
      setPosts(items.data);
      getFollowing(loginUser.token).then((item) => {
        setFollowing(item.data);
      });
      setLoading(false);
    });
  }, [setPosts, loginUser, setLoading, rerender]);

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  return (
    <ScrolledContainer>
      <TabHeader>POSTS</TabHeader>
      {posts &&
        posts.map((data) => (
          <Card key={data.post_id} style={styles.card}>
            <PostDetailsContainer>
              <Ionicons name="ios-person" size={40} color="#000" />
              <PostDetails>{data.title}</PostDetails>
              {loginUser.user_id === data.user_id ? (
                <Ionicons
                  name="ios-close-circle"
                  size={40}
                  color="red"
                  onPress={() => deleteAlert(data)}
                />
              ) : following &&
                following.find(
                  (follower) => follower.f_user_id === data.user_id,
                ) ? (
                <Ionicons
                  name="ios-checkmark-circle"
                  size={40}
                  color="blue"
                  onPress={() => unFollowUser(data.user_id)}
                />
              ) : (
                <Ionicons
                  name="ios-checkmark-circle-outline"
                  size={40}
                  color="blue"
                  onPress={() => onFollowUser(data.user_id)}
                />
              )}
            </PostDetailsContainer>
            <PostImage source={{uri: data.image_url}} />
          </Card>
        ))}
    </ScrolledContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 3,
  },
});

export default AllPostsScreen;
