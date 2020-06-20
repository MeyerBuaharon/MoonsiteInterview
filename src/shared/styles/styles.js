import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #36485f;
  padding-left: 60px;
  padding-right: 60px;
`;

export const TabHeader = styled.Text`
  text-align: center;
  background: #fff;
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
`;

export const ScrolledContainer = styled.ScrollView`
  flex: 1;
  background-color: #36485f;
`;

export const Header = styled.Text`
  font-size: 24px;
  color: #fff;
  padding-bottom: 10px;
  margin-bottom: 40px;
  border-bottom-color: #199187;
  border-bottom-width: 1px;
`;

export const TextField = styled.TextInput`
  align-self: stretch;
  height: 40px;
  margin-bottom: 30px;
  color: #fff;
  border-bottom-color: #f8f8f8;
  border-bottom-width: 1px;
`;
export const StyledButton = styled.Button`
  font-weight: bold;
  color: #fff;
`;

export const CenteredStyledText = styled.Text`
  color: #fff;
  text-align: center;
`;

export const PostImage = styled.Image`
  height: 300px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const Card = styled.View`
  width: 95%;
  background-color: #fff;
  margin: 10px;
  align-self: center;
  flex: 1;
`;

export const PostDetailsContainer = styled.View`
  padding: 10px;
  flex-direction: row;
`;

export const PostDetails = styled.Text`
  text-align: center;
  flex: 1;
`;
