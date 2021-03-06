import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  // it('should render highlight on input', async () => {
  //   const { getByPlaceholderText, getByTestId } = render(
  //     <Input name="email" placeholder="E-mail" />,
  //   );
  //
  //   const containerElement = getByTestId('input-container');
  //   const inputElement = getByPlaceholderText('E-mail');
  //
  //   fireEvent.focus(inputElement);
  //
  //   await wait(() => {
  //     expect(containerElement).not.toHaveStyle('border-color: #ff9000');
  //     expect(containerElement).not.toHaveStyle('color: #ff9000');
  //   });
  // }, 6000);

  it('should keep input border highlighted when input is filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const containerElement = getByTestId('input-container');
    const inputElement = getByPlaceholderText('E-mail');

    fireEvent.change(inputElement, {
      target: { value: 'test@email.com' },
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('color: #ff9000');
    });
  });
});
