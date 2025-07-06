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
  const [Error, setError] = useState(null);
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
    } else {
      if (!/^[\w_]*$/.test(target.value)) {
        newError =
          "Неверный пароль. Допустимые символы: буквы, цифры и нижнее подчёркивание";
      } else if (
        target.value === password &&
        confirmPassword !== "" &&
        target.value.length > 2
      ) {
        submitButtonRef.current.focus();
      }
    }
    setError(newError);
  };

  const onPasswordBlur = ({ target }) => {
    if (target.value !== confirmPassword || target.value !== password) {
      setError("Пароли не совпадают");
    } else if (target.value.length < 3) {
      setError("Пароль меньше 3 символов");
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    sendFormData(getState());
  };

  const inputsState = {
    email: {
      name: "email",
      type: "text",
      placeholder: "Почта",
      value: email,
    },
    password: {
      name: "password",
      type: "password",
      placeholder: "Повтор пароля",
      value: password,
      onBlur: onPasswordBlur,
    },
    confirmPassword: {
      name: "confirmPassword",
      type: "password",
      placeholder: "Повтор пароля",
      value: confirmPassword,
      onBlur: onPasswordBlur,
    },
  };

  return (
    <div className="App">
      {Error && <div className="error">{Error}</div>}
      <form onSubmit={onSubmit}>
        {Object.keys(inputsState).map((key, index) => {
          return (
            <input
              key={index}
              name={inputsState[key].name}
              type={inputsState[key].type}
              placeholder={inputsState[key].placeholder}
              value={inputsState[key].value}
              onBlur={inputsState[key]?.onBlur}
              onChange={(target, inputsState) => onChange(target, inputsState)}
            />
          );
        })}
        <button ref={submitButtonRef} type="submit" disabled={!!Error}>
          Зарегестрироваться
        </button>
      </form>
    </div>
  );
};
