import React, {useEffect, useContext, useState} from 'react';
import {Text, ActivityIndicator} from 'react-native';
import styled from 'styled-components';

import {TabHeader, ScrolledContainer} from '../../shared/styles/styles';
import {getFollowing, getFollowers} from '../../shared/api';
import {AuthContext} from '../../shared/Providers/AuthProvider';

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 100px;
`;

const FollowCard = styled.View`
  background: #fff;
  padding: 20px;
  border: 1px solid #030303;
  margin: 15px;
`;

const FollowText = styled.Text`
  text-align: center;
  font-size: 20px;
`;

const FollowersScreen = () => {
  const {loginUser, setLoading, loading} = useContext(AuthContext);
  const [myFollowers, setMyFollowers] = useState();
  const [myFollowing, setMyFollowing] = useState();

  useEffect(() => {
    setLoading(true);
    getFollowing(loginUser.token).then((followings) => {
      setMyFollowing(followings.data);
      getFollowers(loginUser.token).then((followers) => {
        setMyFollowers(followers.data);
      });
    });
    console.log(myFollowing);

    setLoading(false);
  }, [loginUser, setLoading, myFollowing]);

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }
  return (
    <ScrolledContainer>
      <TabHeader>Followers</TabHeader>
      <Container>
        <FollowCard>
          <FollowText>
            Followers {'\n'} {myFollowers && myFollowers.length}
          </FollowText>
        </FollowCard>
        <FollowCard>
          <FollowText>
            Following {'\n'} {myFollowing && myFollowing.length}
          </FollowText>
        </FollowCard>
      </Container>
    </ScrolledContainer>
  );
};

export default FollowersScreen;
