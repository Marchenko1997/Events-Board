import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addParticipant } from "../../redux/participants/operations";
import { failedNotification } from "../../services/notifications";
import { selectEventDetails } from "../../redux/events/selectors";
import { selectUser } from "../../redux/auth/selectors";
import { fetchEventById } from "../../redux/events/operations";
import css from "./Register.module.css";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const eventDetails = useSelector(selectEventDetails);
  const user = useSelector(selectUser);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

 
  const birthDate = watch("birthDate");

  const registerParticipant = async (data) => {
    const { name, email, birthDate, answer } = data;
    try {
      dispatch(
        addParticipant({
          id,
          user: {
            name,
            email,
            birthDate,
            answer,
            eventTitle: eventDetails.title,
            eventImg: eventDetails.imageUrl,
          },
        })
      )
        .unwrap()
        .then(() => {
          reset();
          navigate("/");
        })
        .catch(() => {
          failedNotification("You have already registered");
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={css.registerWrap}>
      <button className={css.returnBackBtn} onClick={() => navigate(-1)}>
        Return back
      </button>
      <form onSubmit={handleSubmit(registerParticipant)} className={css.form}>
        <h2 className={css.registerText}>Event registration</h2>
        <div>
          <div className={css.inputWrap}>
            <label className={css.label}>
              <input
                className={css.input}
                defaultValue={user && user.name}
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                placeholder="Name"
              />
              {errors.name && (
                <span className={css.error}>{errors.name.message}</span>
              )}
            </label>
            <label className={css.label}>
              <input
                className={css.input}
                defaultValue={user && user.email}
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                placeholder="email@gmail.com"
              />
              {errors.email && (
                <span className={css.error}>{errors.email.message}</span>
              )}
            </label>
            <label className={css.label}>
              <DatePicker
                selected={birthDate}
                onChange={(date) => setValue("birthDate", date)}
                dateFormat="dd.MM.yyyy"
                placeholderText="Select your birth date"
                className={css.input}
                {...register("birthDate", {
                  required: "Birth date is required",
                  validate: {
                    range: (value) =>
                      (new Date(value) >= new Date("1920-01-01") &&
                        new Date(value) <= new Date("2018-12-31")) ||
                      "Date of birth must be between 1920 and 2018",
                  },
                })}
              />
              {errors.birthDate && (
                <span className={css.error}>{errors.birthDate.message}</span>
              )}
            </label>
          </div>
          <p className={css.registerQuestion}>How did you know about us?</p>
          <label className={css.radioBtnLabel}>
            <input
              type="radio"
              value="Social media"
              {...register("answer", { required: "Please select an option" })}
            />
            Social media
          </label>
          <label className={css.radioBtnLabel}>
            <input
              type="radio"
              value="Friends"
              {...register("answer", { required: "Please select an option" })}
            />
            Friends
          </label>
          <label className={css.radioBtnLabel}>
            <input
              type="radio"
              value="Found myself"
              {...register("answer", { required: "Please select an option" })}
            />
            Found myself
          </label>
          {errors.answer && (
            <span className={css.error}>{errors.answer.message}</span>
          )}
        </div>
        <button className={css.submitBtn} type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
