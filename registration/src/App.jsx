import "./App.css";
import { useState } from "react";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

const useStore = () => {
  const [state, setState] = useState(initialState);

  return {
    getState: () => state,
    updateState: (fieldName, newValue) => {
      setState({ ...state, [fieldName]: newValue });
    },
    resetState() {
      setState(initialState);
    },
  };
};

const sendFormData = (formData) => {
  console.log(formData);
};

export const App = () => {
  const [loginError, setLoginError] = useState(null);
  const { getState, updateState } = useStore();
  const { email, password, confirmPassword } = getState();

  const onChange = ({ target }) => {
    updateState(target.name, target.value);
    let newError = null;
    if (target.name === "email") {
      if (!/^[\w_.@]*$/.test(target.value)) {
        newError =
          "Неверный email. Допустимые символы: буквы, цифры и нижнее подчёркивание";
      }
    } else if (target.name === "password") {
      if (!/^[\w_]*$/.test(target.value)) {
        newError =
          "Неверный пароль. Допустимые символы: буквы, цифры и нижнее подчёркивание";
      }
    }
    setLoginError(newError);
  };

  const onConfirmPasswordBlur = ({ target }) => {
    if (target.name === "confirmPassword") {
      if (getState().password !== target.value) {
        setLoginError("Неправильный повтор пароля");
      }
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    sendFormData(getState());
  };

  return (
    <div className="App">
      {loginError && <div className="error">{loginError}</div>}
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Почта"
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={onChange}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Повтор пароля"
          value={confirmPassword}
          onChange={onChange}
          onBlur={onConfirmPasswordBlur}
        />
        <button type="submit" disabled={!!loginError}>
          Зарегестрироваться
        </button>
      </form>
    </div>
  );
};
