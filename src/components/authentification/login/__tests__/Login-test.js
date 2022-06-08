import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { expect, it, jest } from '@jest/globals';
import Login from '../Login';

it('renders correctly', () => {
  let { app } = render(<Login />);
  expect(app).toMatchSnapshot();
});

it('should not login', () => {
  const { getByTestId } = render(<Login navigation={{}} />);
  fireEvent.press(getByTestId('LoginButton'));
  expect(getByTestId).toMatchSnapshot();
});

// test('should change input value', () => {
//   const { getByLabelText, getByText, getByDisplayValue } = render(<Login navigation={{}} />);
//   const element = getByLabelText('email');
//   fireEvent.changeText(element, 'chris@test.com');
//   const bananaElements = getByDisplayValue('chris@test.com');
//   expect(bananaElements).toEqual('hahaha');
// });

// const setup = () => {
//   const utils = render(<Login />);
//   const input = utils.getByPlaceholderText('Email address or phone number');
//   return {
//     input,
//     ...utils
//   };
// };

// test('test TextInput onTextChange', () => {
//   const { input } = setup();
//   fireEvent.changeText(input, { target: { value: 'chris@test.com' } });
//   expect(input.value).toBe('$chris@test.com');
// });
