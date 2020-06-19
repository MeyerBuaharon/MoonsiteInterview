import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #36485f;
  padding-left: 60px;
  padding-right: 60px;
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
