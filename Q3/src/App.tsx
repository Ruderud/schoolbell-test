import { useEffect, useMemo, useState } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';

const CloseIcon = () => (
  <svg
    className="w-4 text-gray-800"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 14"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
    />
  </svg>
);

const initialUserData: UserData = { name: '', password: '' };

const buttonStyle =
  'border-2 border-slate-500 px-4 py-1 text-lg disabled:bg-gray-300 disabled:opacity-30 disabled:cursor-not-allowed';
const inputStyle = 'border-2 rounded border-slate-300 px-2 py-3';
const invalidInputStyle =
  'border-2 rounded border-red-500 focus:border-red-500 focus:outline-none bg-red-200 px-2 py-3';

type UserData = {
  name: string;
  password: string;
};

type FormValues = {
  userData: UserData[];
};

type RapidError = {
  name: `${'userData'}.${number}.${Extract<keyof UserData, string>}`;
  errorOption: { type: 'duplicate' | 'minLength'; message: string };
};

const checkNameDuplicated = (userData: UserData[]): RapidError[] => {
  const nameIndexMap: Record<string, number[]> = {};

  userData.forEach((data, index) => {
    const { name } = data;
    if (name && name.length >= 3) {
      if (nameIndexMap[name]) {
        nameIndexMap[name].push(index);
      } else {
        nameIndexMap[name] = [index];
      }
    }
  });

  const duplicateErrors: RapidError[] = [];

  Object.entries(nameIndexMap).forEach(([name, indexArray]) => {
    if (indexArray.length > 1) {
      const errors = indexArray.map((index) => ({
        name: `userData.${index}.name` as const,
        errorOption: { type: 'duplicate', message: `The name '${name}' is duplicated.` },
      })) satisfies RapidError[];
      duplicateErrors.push(...errors);
    }
  });

  return duplicateErrors;
};

const checkNameLength = (userData: UserData[]): RapidError[] => {
  const minLengthErrors: RapidError[] = [];

  userData.forEach((data, index) => {
    const { name } = data;
    if (name && name.length < 3) {
      minLengthErrors.push({
        name: `userData.${index}.name` as const,
        errorOption: { type: 'minLength', message: 'The name must be at least 3 characters long.' },
      });
    }
  });

  return minLengthErrors;
};

const checkPasswordLength = (userData: UserData[]): RapidError[] => {
  const minLengthErrors: RapidError[] = [];

  userData.forEach((data, index) => {
    const { password } = data;
    if (password && password.length < 6) {
      minLengthErrors.push({
        name: `userData.${index}.password` as const,
        errorOption: { type: 'minLength', message: 'The password must be at least 6 characters long.' },
      });
    }
  });

  return minLengthErrors;
};

const maskPassword = (password: string): string => {
  const maskedPart = '*'.repeat(password.length - 3);
  const visiblePart = password.substring(0, 3);
  return visiblePart + maskedPart;
};

function App() {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      userData: [initialUserData],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'userData' });

  const [rapidError, setRapidError] = useState<RapidError[]>([]);
  const [confirmedUserData, setConfirmedUserData] = useState<UserData[]>([]);

  const onSubmit: SubmitHandler<FormValues> = (data) => setConfirmedUserData(data.userData);

  const submitBtnDisabled = useMemo(() => {
    const userData = getValues('userData');
    const existEmpty = userData.some((data) => !data.name || !data.password);
    if (!existEmpty && rapidError.length <= 0) return false;
    return true;
  }, [getValues, rapidError]);

  useEffect(() => {
    const subscription = watch(() => {
      const currentValues = getValues('userData');
      const nameDupErrors = checkNameDuplicated(currentValues);
      const nameMinLenErrors = checkNameLength(currentValues);
      const pwdMinLenErrors = checkPasswordLength(currentValues);
      setRapidError([...nameDupErrors, ...nameMinLenErrors, ...pwdMinLenErrors]);
    });
    return () => subscription.unsubscribe();
  }, [watch, setRapidError, getValues]);

  useEffect(() => {
    clearErrors();
    rapidError.forEach((error) => setError(error.name, error.errorOption));
  }, [rapidError, setError, clearErrors]);

  return (
    <section className="p-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <li key={field.id} className="flex flex-col gap-2 p-4 border-4 border-slate-500">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold">{`User - ${index}`}</h2>
                <button
                  className="p-2 border-2 border-black"
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <CloseIcon />
                </button>
              </div>
              <label htmlFor="name">Name</label>
              <input
                className={errors.userData?.[index]?.name ? invalidInputStyle : inputStyle}
                type="text"
                {...register(`userData.${index}.name`, { required: true })}
              />
              {errors.userData && errors.userData[index]?.name?.type === 'duplicate' && (
                <p className="text-red-500">{errors.userData[index]?.name?.message}</p>
              )}
              {errors.userData && errors.userData[index]?.name?.type === 'minLength' && (
                <p className="text-red-500">{errors.userData[index]?.name?.message}</p>
              )}

              <label htmlFor="password">Password</label>
              <input
                className={errors.userData?.[index]?.password ? invalidInputStyle : inputStyle}
                type="password"
                {...register(`userData.${index}.password`, { required: true })}
              />
              {errors.userData && errors.userData[index]?.password?.type === 'minLength' && (
                <p className="text-red-500">{errors.userData[index]?.password?.message}</p>
              )}
            </li>
          ))}
        </ul>

        <div className="flex gap-2 py-4">
          <button
            className={buttonStyle}
            type="button"
            onClick={() => {
              append(initialUserData);
            }}
          >
            Add User
          </button>
          <button className={buttonStyle} type="submit" disabled={submitBtnDisabled}>
            Confirm
          </button>
        </div>
      </form>

      {confirmedUserData.length > 0 && (
        <ul className="flex flex-col gap-2 p-4 bg-slate-200">
          {confirmedUserData.map((user) => (
            <li key={user.name} className="[&>p]:leading-tight">
              <p>
                <strong>Name: </strong>
                {user.name}
              </p>
              <p>
                <strong>Password: </strong>
                {maskPassword(user.password)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default App;
