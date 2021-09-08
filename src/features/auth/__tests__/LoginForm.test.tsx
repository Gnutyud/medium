import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import { createStore } from 'redux';
import { rootReducer } from 'app/store';
describe('Auth testing', () => {
  // const initialState = { auth: { isRegister: false } };
  const mockStore = configureStore();
  let store = createStore(rootReducer);
  test('check switch button sign in and sign up', () => {
    // store = mockStore(initialState);
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    // action
    const buttonElement = screen.getByRole('button', { name: "Don't have an acount? Sign up" });
    userEvent.click(buttonElement);
    // assert
    const outputElement = screen.queryByText('Sign up');
    expect(outputElement).toBeNull();
  });
});
