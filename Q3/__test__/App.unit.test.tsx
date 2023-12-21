import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../src/App';

describe('App unit test', () => {
  it('Add User button으로 유저 Form 추가', async () => {
    render(<App />);

    const beforeUserFormCnt = screen.getAllByText(/User - \d+/i).length;
    expect(beforeUserFormCnt).toEqual(1);

    const AddUserButton = screen.getByText(/Add User/i).closest('button');
    if (!AddUserButton) fail('not exist "Add User" button');
    await userEvent.click(AddUserButton);

    const UserForms = screen.getAllByText(/User - \d+/i);
    expect(UserForms.length).toEqual(2);
  });

  it('X icon 버튼으로 유저 Form 제거', async () => {
    render(<App />);

    const AddUserButton = screen.getByText(/Add User/i).closest('button');
    if (!AddUserButton) fail('not exist "Add User" button');
    await userEvent.click(AddUserButton);

    const beforeRemoveUserForms = screen.getAllByText(/User - \d+/i);
    expect(beforeRemoveUserForms.length).toEqual(2);

    const removeButtons = screen.getAllByRole('remove');
    if (!removeButtons.length) fail('not exist "Remove" button');
    await userEvent.click(removeButtons[0]);

    const afterRemoveUserForms = screen.getAllByText(/User - \d+/i);
    expect(afterRemoveUserForms.length).toEqual(1);
  });

  it('Name 항목 2자 이하 에러발생', async () => {
    render(<App />);

    const nameInput = screen.getByLabelText(/Name/i);
    await userEvent.type(nameInput, 'fo');

    const errorText = screen.getByText(/The name must be at least 3 characters long./i);
    expect(errorText).toBeInTheDocument();
  });

  it('Password 항목 2자 이하 에러발생', async () => {
    render(<App />);

    const pwdInput = screen.getByLabelText(/Password/i);
    await userEvent.type(pwdInput, 'q1w2');

    const errorText = screen.getByText(/The password must be at least 6 characters long./i);
    expect(errorText).toBeInTheDocument();
  });

  it('Name 항목 중복 에러발생', async () => {
    render(<App />);

    const AddUserButton = screen.getByText(/Add User/i).closest('button');
    if (!AddUserButton) fail('not exist "Add User" button');
    await userEvent.click(AddUserButton);

    const nameInputs = screen.getAllByLabelText(/Name/i);
    await userEvent.type(nameInputs[0], 'foo');
    await userEvent.type(nameInputs[1], 'foo');

    const errorTexts = screen.getAllByText(/The name 'foo' is duplicated./i);
    expect(errorTexts.length).toEqual(2);
  });

  it('모든 항목을 입력해야 Confirm 버튼 활성화', async () => {
    render(<App />);

    const ConfirmButton = screen.getByText(/Confirm/i).closest('button');
    if (!ConfirmButton) fail('not exist "Confirm" button');
    expect(ConfirmButton.disabled).toBeTruthy();

    const nameInput = screen.getByLabelText(/Name/i);
    const pwdInput = screen.getByLabelText(/Password/i);
    await userEvent.type(nameInput, 'foo');
    await userEvent.type(pwdInput, 'q1w2e3');

    expect(ConfirmButton.disabled).toBeFalsy();
  });

  it('Confirm 버튼으로 제출시 결과 출력', async () => {
    render(<App />);

    const nameInput = screen.getByLabelText(/Name/i);
    const pwdInput = screen.getByLabelText(/Password/i);
    await userEvent.type(nameInput, 'foo');
    await userEvent.type(pwdInput, 'q1w2e3');

    const ConfirmButton = screen.getByText(/Confirm/i).closest('button');
    if (!ConfirmButton) fail('not exist "Confirm" button');
    await userEvent.click(ConfirmButton);

    const confirmedName = screen.getByText(/foo/i);
    const confirmedMaskPwd = screen.getByText(/q1w\*{3,}/i);

    expect(confirmedName).toBeInTheDocument();
    expect(confirmedMaskPwd).toBeInTheDocument();
  });
});
