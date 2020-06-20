import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  AuthenticationScreen,
  FollowersScreen,
  AllPostsScreen,
  AddPostScreen,
} from '../Screens/';
import {AuthContext} from '../shared/Providers/AuthProvider';

const Tabs = createBottomTabNavigator();

const AppTabs = () => {
  const {loginUser} = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!loginUser ? (
        <AuthenticationScreen />
      ) : (
        <Tabs.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              switch (route.name) {
                case 'Home':
                  iconName = focused
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline';
                  break;
                case 'Settings':
                  iconName = focused ? 'ios-list-box' : 'ios-list';
                  break;
                case 'Posts':
                  iconName = focused ? 'ios-book' : 'ios-book';
                  break;
                case 'Add Post':
                  iconName = focused
                    ? 'ios-add-circle'
                    : 'ios-add-circle-outline';
                  break;
                case 'Followers':
                  iconName = 'ios-people';
                  break;

                default:
                  break;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#36485f',
            inactiveTintColor: 'gray',
          }}>
          <Tabs.Screen name="Home" component={AuthenticationScreen} />
          <Tabs.Screen name="Posts" component={AllPostsScreen} />
          <Tabs.Screen name="Add Post" component={AddPostScreen} />
          <Tabs.Screen name="Followers" component={FollowersScreen} />
        </Tabs.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppTabs;
