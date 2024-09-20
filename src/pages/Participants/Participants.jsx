import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchAllParticipantsByEventId } from "../../redux/participants/operations";
import { selectEventTitle } from "../../redux/events/selectors";
import { selectFilteredParticipants } from "../../redux/participants/selectors"; 
import css from "./Participants.module.css";
import defaultImg from "../../assets/default-img.png";

const Participants = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const title = useSelector(selectEventTitle);
  const participants = useSelector(selectFilteredParticipants); 
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    dispatch(fetchAllParticipantsByEventId(id));
  }, [dispatch, id]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <button className={css.returnBackBtn} onClick={() => navigate(-1)}>
        Return back
      </button>
      <h1 className={css.particHeader}>Participants</h1>

      <div className={css.inputContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name or email"
          className={css.searchInput}
        />
      </div>

      {participants.length > 0 ? (
        <div className={css.particWrap}>
          <h2 className={css.eventHeader}>{title}</h2>
          <ul className={css.particList}>
            {participants
              .filter(
                (participant) =>
                  participant.user.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  participant.user.email
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              )
              .map(({ user: { name, email } }) => (
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
