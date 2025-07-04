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
      "Неверный email. Допустимые символы: буквы, цифры,@, и нижнее подчёркивание"
    ),
  password: yup
    .string()
    .matches(
      /^[\w_]*$/,
      "Неверный пароль. Допустимые символы: буквы, цифры и нижнее подчёркивание"
    )
    .min(3, "Пароль меньше 3 символов"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
});

export const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(fieldsSchema),
  });

  const loginError = Object.keys(errors).reduce(
    (acc, key) => acc + errors[key]?.message,
    ""
  );

  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit(sendFormData)}>
        {loginError && <div className={styles.errorLabel}>{loginError}</div>}
        <input name="email" type="text" {...register("email")} />
        <input name="password" type="password" {...register("password")} />
        <input
          name="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />

        <button type="submit" disabled={!!loginError}>
          Отправить
        </button>
      </form>
    </div>
  );
};
