import "./App.css";
import { useState } from "react";
import { useRef } from "react";

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
  const submitButtonRef = useRef(null);

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
      } else if (target.value === confirmPassword && confirmPassword !== "") {
        submitButtonRef.current.focus();
      }
    } else if (target.name === "confirmPassword") {
      if (target.value === password) {
        submitButtonRef.current.focus();
      }
    }
    setLoginError(newError);
  };

  const onPasswordBlur = () => {
    if (password.length < 3) {
      setLoginError("Пароль меньше 3 символов");
    } else if (password !== confirmPassword) {
      setLoginError("Пароли не совпадают");
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
          onBlur={onPasswordBlur}
          onChange={onChange}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Повтор пароля"
          value={confirmPassword}
          onChange={onChange}
          onBlur={onPasswordBlur}
        />
        <button ref={submitButtonRef} type="submit" disabled={!!loginError}>
          Зарегестрироваться
        </button>
      </form>
    </div>
  );
};
