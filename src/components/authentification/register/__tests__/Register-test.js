import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { expect, it, jest, findElement } from '@jest/globals';
import Register from '../Register';

it('renders correctly', () => {
  let { app } = render(<Register />);
  expect(app).toMatchSnapshot();
});

it('should not save', () => {
  const { getByTestId } = render(<Register navigation={{}} />);
  fireEvent.press(getByTestId('submitButton'));
  expect(getByTestId).toMatchSnapshot();
});
