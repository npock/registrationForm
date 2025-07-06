import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./App.module.css";

const sendFormData = (formData) => {
  console.log(formData);
};

const fieldsSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[\w_.@]*$/,
      "Неверный email. Допустимые символы: буквы, цифры,@, и нижнее подчёркивание."
    ),
  password: yup
    .string()
    .matches(
      /^[\w_]*$/,
      "Неверный пароль. Допустимые символы: буквы, цифры и нижнее подчёркивание."
    )
    .min(3, "Пароль меньше 3 символов."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают."),
});

const InputForm = ({ ...register }) => {
  return <input name="email" type="text" {...register("email")} />;
};

export const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(fieldsSchema),
  });

  const Error = Object.keys(errors).reduce(
    (acc, key) => acc + errors[key]?.message,
    ""
  );
  const inputsState = {
    email: { name: "email", type: "text" },
    password: { name: "password", type: "password" },
    confirmPassword: { name: "confirmPassword", type: "password" },
  };

  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit(sendFormData)}>
        {Error && <div className={styles.errorLabel}>{Error}</div>}
        {Object.keys(inputsState).map((key, index) => {
          return (
            <input
              key={index}
              name={inputsState[key].name}
              type={inputsState[key].type}
              {...register(inputsState[key].name)}
            />
          );
        })}
        <button type="submit" disabled={!isValid}>
          Отправить
        </button>
      </form>
    </div>
  );
};
