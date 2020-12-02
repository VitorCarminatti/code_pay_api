import styled from 'styled-components';

const Input = styled.TextInput`
  paddingHorizontal: 20px;
  paddingVertical: 15px;
  borderRadius: 5px;
  backgroundColor: #F5F5F5;
  alignSelf: stretch;
  marginBottom: 5px;
  marginHorizontal: 20px;
  fontSize: 16px;
`;

const Button = styled.TouchableHighlight`
  padding: 20px;
  borderRadius: 5px;
  backgroundColor: #168fc7;
  alignSelf: stretch;
  margin: 15px;
  marginHorizontal: 20px;
`;

export {Input, Button};