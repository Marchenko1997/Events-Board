import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

import togglePassword from "../../services/togglePassword";
import { fetchUser, loginThunk } from "../../redux/auth/operations";
import css from "./Login.module.css"; // Импорт CSS модуля
import { failedNotification } from "../../services/notifications.js";

const Login = () => {
  const [toggleInput, setToggleInput] = useState("password");
  const [toggleIcon, setToggleIcon] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm();

  const logIn = async (data) => {
    try {
      dispatch(loginThunk(data))
        .unwrap()
        .then((info) => {
          dispatch(fetchUser(info.uid));
          reset();
          navigate("/");
        })
        .catch(() => {
          failedNotification("Sorry, write your login or password correctly");
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={css.authForm}>
      <form onSubmit={handleSubmit(logIn)} className={css.form}>
        <h2 className={css.authHeader}>Log In</h2>
        <label className={css.authLabel}>
          Enter your email
          <input
            className={css.input}
            type="email"
            {...register("email", { required: true })}
            placeholder="email@gmail.com"
          />
          {errors.email && <span> {errors.email.message}</span>}
        </label>
        <label className={css.authLabel}>
          Enter your password
          <input
            className={css.input}
            type={toggleInput}
            {...register("password", { required: true })}
            placeholder="Password"
          />
          <div className={css.svgWrap}>
            <span className={css.svgSpan}>
              <svg
                className={css.svgEye}
                onClick={() =>
                  togglePassword(toggleInput, setToggleInput, setToggleIcon)
                }
              >
                {toggleIcon ? <RiEyeOffLine /> : <RiEyeLine />}
              </svg>
            </span>
          </div>
          {errors.password && <span>{errors.password.message}</span>}
        </label>
        <button className={css.submitBtn} type="submit" disabled={!isValid}>
          Login
        </button>
      </form>
      <p className={css.authText}>Haven&apos;t signed up yet?</p>
      <NavLink className={css.authLink} to="/signup">
        Sign up
      </NavLink>
    </div>
  );
};

export default Login;
