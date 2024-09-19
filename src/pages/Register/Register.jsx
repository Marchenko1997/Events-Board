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

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const eventDetails = useSelector(selectEventDetails);
  const user = useSelector(selectUser);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

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
            <label>
              <input
                className={css.input}
                defaultValue={user && user.name}
                type="text"
                {...register("name", { required: true })}
                placeholder="Adam"
              />
            </label>
            <label>
              <input
                className={css.input}
                defaultValue={user && user.email}
                type="email"
                {...register("email", { required: true })}
                placeholder="email@gmail.com"
              />
              {errors.email && <span> {errors.email.message}</span>}
            </label>
            <label>
              <input
                className={css.input}
                defaultValue={user && user.birthDate}
                type="date"
                placeholder="08.08.1988"
                min="1920-01-01"
                max="2018-12-31"
                {...register("birthDate", { required: true })}
              />
            </label>
          </div>
          <p className={css.registerQuestion}>How did you know about us?</p>
          <label className={css.radioBtnLabel}>
            <input
              type="radio"
              value="Social media"
              {...register("answer", { required: true })}
            />
            Social media
          </label>
          <label className={css.radioBtnLabel}>
            <input
              type="radio"
              value="Friends"
              {...register("answer", { required: true })}
            />
            Friends
          </label>
          <label className={css.radioBtnLabel}>
            <input
              type="radio"
              value="Found myself"
              {...register("answer", { required: true })}
            />
            Found myself
          </label>
        </div>
        <button className={css.submitBtn} type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
