import React, {useEffect, useContext, useState} from 'react';
import {AuthContext} from '../../shared/Providers/AuthProvider';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {getAllPosts} from '../../shared/api';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

  useEffect(() => {
    console.log('AllPostRERENDER');
    if (loginUser) {
      setLoading(true);
      getAllPosts(loginUser.token).then((items) => {
        setPosts(items.data);
        setLoading(false);
      });
    }
  }, [setPosts, loginUser, setLoading]);

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
