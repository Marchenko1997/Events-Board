import { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import togglePassword from "../../services/togglePassword";
import { writeUserData } from "../../services/authServices";
import { registerThunk } from "../../redux/auth/operations";
import { updateUser } from "../../redux/auth/authSlice";
import css from "./SignUp.module.css"; // Импорт CSS модуля
import { failedNotification } from "../../services/notifications";

const SignUp = () => {
  const [toggleInput, setToggleInput] = useState("password");
  const [toggleIcon, setToggleIcon] = useState(false);
  const [toggleSecondIcon, setToggleSecondIcon] = useState(false);
  const [toggleSecondInput, setToggleSecondInput] = useState("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onTouched",
  });

  const signup = async (data) => {
    const { name, email, birthDate, password } = data;
    try {
      dispatch(registerThunk({ email, password }))
        .unwrap()
        .then((userInfo) => {
          const newUser = {
            uid: userInfo.uid,
            name,
            email,
            birthDate,
          };

          writeUserData(newUser);

          dispatch(updateUser({ birthDate, name }));
          reset();
          navigate("/");
        })
        .catch(() => {
          failedNotification("Sorry, user has already exist");
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const password = watch("password", "");

  return (
    <div className={css.authWrap}>
      <h2 className={css.authHeader}>Sign up</h2>
      <form onSubmit={handleSubmit(signup)} className="auth-form">
        <label className={css.authLabel}>
          Enter your name
          <input
            className={css.input}
            type="text"
            {...register("name", { required: true })}
            placeholder="Adam"
          />
        </label>
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
          Enter your birth date
          <input
            className={css.input}
            type="date"
            {...register("birthDate", { required: true })}
            placeholder="08.08.1988"
            min="1920-01-01"
            max="2018-12-31"
          />
          {errors.number && <span> {errors.number.message}</span>}
        </label>
        <label className={css.authLabel}>
          Enter password
          <div className={css.inputWithIconWrap}>
            <input
              className={css.inputWithIcon}
              type={toggleInput}
              {...register("password", { required: true })}
              placeholder="Password"
            />
            <span
              className={css.svgEye}
              onClick={() =>
                togglePassword(toggleInput, setToggleInput, setToggleIcon)
              }
            >
              {toggleIcon ? <RiEyeOffLine /> : <RiEyeLine />}
            </span>
          </div>
          {errors.password && <span>{errors.password.message}</span>}
        </label>
        <label className={css.authLabel}>
          Repeat password
          <div className={css.inputWithIconWrap}>
            <input
              className={css.inputWithIcon}
              type={toggleSecondInput}
              {...register("repeatPassword", {
                required: true,
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Confirm Password"
            />
            <span
              className={css.svgEye}
              onClick={() =>
                togglePassword(
                  toggleSecondInput,
                  setToggleSecondInput,
                  setToggleSecondIcon
                )
              }
            >
              {toggleSecondIcon ? <RiEyeOffLine /> : <RiEyeLine />}
            </span>
          </div>
          {errors.repeatPassword && (
            <span>{errors.repeatPassword.message}</span>
          )}
        </label>

        <button className={css.submitBtn} type="submit" disabled={!isValid}>
          Sign up
        </button>
      </form>
      <p className={css.authText}>Or</p>
      <NavLink className={css.authLink} to="/login">
        Log in
      </NavLink>
    </div>
  );
};

export default SignUp;
