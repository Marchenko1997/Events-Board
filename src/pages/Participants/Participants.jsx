import { useDispatch, useSelector } from "react-redux";
import { selectAllParticipants } from "../../redux/participants/selectors";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { fetchAllParticipantsByEventId } from "../../redux/participants/operations";
import { useNavigate, useParams } from "react-router";
import { selectEventTitle } from "../../redux/events/selectors";
import css from "./Participants.module.css";
import defaultImg from "../../assets/default-img.png";

const Participants = () => {
  const dispatch = useDispatch();
  const participants = useSelector(selectAllParticipants);
  const { id } = useParams();
  const title = useSelector(selectEventTitle);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllParticipantsByEventId(id));
  }, [dispatch, id]);

  return (
    <>
      <button className={css.returnBackBtn} onClick={() => navigate(-1)}>
        Return back
      </button>
      <h1 className={css.particHeader}>Participants</h1>
      {participants.length > 0 ? (
        <div className={css.particWrap}>
          <h2 className={css.eventHeader}>{title}</h2>
          <ul className={css.particList}>
            {participants.map(({ user: { name, email } }) => (
              <li className={css.particItem} key={nanoid()}>
                <img className={css.particImg} src={defaultImg} alt={name} />
                <div className={css.particInfoWrap}>
                  <h3 className={css.particName}>{name}</h3>
                  <p>{email}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={css.noParticText}>No one registered yet.</p>
      )}
    </>
  );
};

export default Participants;
