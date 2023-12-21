import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../src/App';

describe('App e2e test', () => {
  it('Add 2 User.\n  name: "foo", password: "FooOfsecret"\n  name: "bar", password: "BarOfsecret"', async () => {
    render(<App />);

    const AddUserButton = screen.getByText(/Add User/i).closest('button');
    if (!AddUserButton) fail('not exist "Add User" button');
    await userEvent.click(AddUserButton);

    const nameInputs = screen.getAllByLabelText(/Name/i);
    await userEvent.type(nameInputs[0], 'foo');
    await userEvent.type(nameInputs[1], 'bar');

    const pwdInputs = screen.getAllByLabelText(/Password/i);
    await userEvent.type(pwdInputs[0], 'FooOfsecret');
    await userEvent.type(pwdInputs[1], 'BarOfsecret');

    const ConfirmButton = screen.getByText(/Confirm/i).closest('button');
    if (!ConfirmButton) fail('not exist "Confirm" button');
    await userEvent.click(ConfirmButton);

    const confirmedFooPwd = screen.getByText(/Foo\*{3,}/i);
    const confirmedBarPwd = screen.getByText(/Bar\*{3,}/i);

    expect(confirmedFooPwd).toBeInTheDocument();
    expect(confirmedBarPwd).toBeInTheDocument();
  });
});
