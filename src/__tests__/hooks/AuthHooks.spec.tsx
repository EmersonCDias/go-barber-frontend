import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/AuthHook';

import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  const apiResponse = {
    user: {
      id: 'test-123',
      name: 'Test',
      email: 'test@email.com',
      avatar_url: 'test.jpg',
    },
    token: 'token-123',
  };

  it('should be able to sing in', async () => {
    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'test@email.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user.email).toEqual('test@email.com');
  });

  it('should restore saved data from storage when auth initializes', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify(apiResponse.user);
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('test@email.com');
  });

  it('should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify(apiResponse.user);
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => result.current.signOut());

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.updateUser(apiResponse.user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user).toEqual(apiResponse.user);
  });
});
